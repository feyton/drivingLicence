"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";
import { dbConnect } from "@/lib/db";
import { Question } from "@/lib/models/Question";
import { User } from "@/lib/models/User";
import { questionKey, isNearDuplicate } from "@/lib/similarity";
import { htmlToText } from "@/lib/sanitize";

const REVIEWER_ROLES = ["editor", "admin", "super"];
const ADMIN_ROLES = ["admin", "super"];

async function requireRole(roles: string[]) {
  const session = await auth();
  if (!session?.user?.id || !roles.includes(session.user.role)) {
    throw new Error("forbidden");
  }
  return session;
}

export async function approveQuestion(id: string) {
  const session = await requireRole(REVIEWER_ROLES);
  await dbConnect();
  await Question.updateOne({ _id: id }, { $set: { approved: true, active: true, approvedBy: session.user.id } });
  revalidatePath("/admin/questions");
}

export async function rejectQuestion(id: string) {
  await requireRole(REVIEWER_ROLES);
  await dbConnect();
  await Question.updateOne({ _id: id }, { $set: { approved: false, active: false } });
  revalidatePath("/admin/questions");
}

const updateSchema = z.object({
  id: z.string().regex(/^[0-9a-f]{24}$/),
  text: z.string().min(5),
  options: z.array(z.object({ id: z.string().min(1).max(2), text: z.string().min(1) })).min(2).max(5),
  answer: z.string().min(1).max(2),
  explanation: z.string().default(""),
  category: z.enum(["general", "posts"]),
});

export async function updateQuestion(input: unknown) {
  await requireRole(REVIEWER_ROLES);
  const parsed = updateSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: "invalid" };
  const { id, ...data } = parsed.data;
  if (!data.options.some((o) => o.id === data.answer)) return { ok: false as const, error: "answer_not_in_options" };
  await dbConnect();
  await Question.updateOne({ _id: id }, { $set: data });
  revalidatePath("/admin/questions");
  return { ok: true as const };
}

// Find near-duplicates of a question across the whole bank (the "inflation" guard).
export async function findSimilar(id: string) {
  await requireRole(REVIEWER_ROLES);
  await dbConnect();
  const target = await Question.findById(id);
  if (!target) return { ok: false as const, error: "not_found" };
  const key = questionKey(htmlToText(target.text), target.options);

  const all = await Question.find({ _id: { $ne: target._id }, active: true }).select("text options approved");
  const hits: { id: string; text: string; sim: number; approved: boolean }[] = [];
  for (const q of all) {
    const res = isNearDuplicate(key, questionKey(htmlToText(q.text), q.options), 0.75);
    if (res.sim >= 0.75) {
      hits.push({ id: q._id.toString(), text: htmlToText(q.text).slice(0, 160), sim: +res.sim.toFixed(2), approved: q.approved });
    }
  }
  hits.sort((a, b) => b.sim - a.sim);
  return { ok: true as const, hits: hits.slice(0, 10) };
}

export async function changeUserRole(userId: string, role: "user" | "editor" | "admin") {
  await requireRole(ADMIN_ROLES);
  await dbConnect();
  await User.updateOne({ _id: userId, role: { $ne: "super" } }, { $set: { role } });
  revalidatePath("/admin/users");
}

export async function setUserActive(userId: string, active: boolean) {
  await requireRole(ADMIN_ROLES);
  await dbConnect();
  await User.updateOne({ _id: userId, role: { $ne: "super" } }, { $set: { active } });
  revalidatePath("/admin/users");
}
