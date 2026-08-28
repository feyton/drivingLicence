import { getTranslations } from "next-intl/server";
import { dbConnect } from "@/lib/db";
import { Question } from "@/lib/models/Question";
import { htmlToText, extractImage } from "@/lib/sanitize";
import { QuestionReviewCard } from "@/components/admin/question-review-card";
import { AdminQuestionFilters } from "@/components/admin/question-filters";

const PAGE_SIZE = 25;

export default async function AdminQuestionsPage({ searchParams }: PageProps<"/admin/questions">) {
  const sp = await searchParams;
  const status = typeof sp.status === "string" ? sp.status : "pending";
  const category = typeof sp.category === "string" ? sp.category : "all";
  const q = typeof sp.q === "string" ? sp.q : "";
  const page = Math.max(1, parseInt(typeof sp.page === "string" ? sp.page : "1", 10) || 1);

  const t = await getTranslations("admin");
  await dbConnect();

  const filter: Record<string, unknown> = {};
  if (status === "pending") Object.assign(filter, { approved: false, active: true });
  else if (status === "approved") Object.assign(filter, { approved: true, active: true });
  else if (status === "rejected") Object.assign(filter, { active: false });
  if (category !== "all") filter.category = category;
  if (q) filter.text = { $regex: q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" };

  const [total, questions] = await Promise.all([
    Question.countDocuments(filter),
    Question.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE),
  ]);

  const items = questions.map((doc) => ({
    id: doc._id.toString(),
    text: htmlToText(doc.text),
    image: doc.image ?? extractImage(doc.text),
    options: (doc.options ?? []).map((o: { id: string; text: string }) => ({ id: o.id, text: htmlToText(o.text) })),
    answer: doc.answer,
    explanation: htmlToText(doc.explanation),
    category: doc.category,
    approved: doc.approved,
    active: doc.active,
    source: doc.importSource?.file ?? null,
    aiResolved: Boolean(doc.importSource?.aiResolved),
  }));

  return (
    <div className="space-y-4">
      <AdminQuestionFilters status={status} category={category} q={q} total={total} page={page} pageSize={PAGE_SIZE} />
      {items.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">—</p>}
      {items.map((item) => (
        <QuestionReviewCard key={item.id} item={item} labels={{
          approve: t("approve"),
          reject: t("reject"),
          edit: t("edit"),
          save: t("save"),
          cancel: t("cancel"),
          similar: t("similar"),
          noSimilar: t("noSimilar"),
          answer: t("answer"),
          category: t("category"),
          explanation: t("explanation"),
          source: t("source"),
        }} />
      ))}
    </div>
  );
}
