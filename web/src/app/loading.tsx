import { Skeleton } from "@/components/ui/skeleton";

export default function LandingLoading() {
  return (
    <div className="mx-auto max-w-5xl px-4">
      <section className="py-14 md:py-20">
        <Skeleton className="mb-4 h-6 w-64 rounded-full" />
        <div className="space-y-3">
          <Skeleton className="h-12 w-11/12 md:h-16" />
          <Skeleton className="h-12 w-8/12 md:h-16" />
        </div>
        <Skeleton className="mt-5 h-5 w-full max-w-xl" />
        <div className="mt-8 flex gap-3">
          <Skeleton className="h-11 w-40 rounded-lg" />
          <Skeleton className="h-11 w-44 rounded-lg" />
        </div>
      </section>

      <section className="grid grid-cols-3 gap-3 pb-14">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-2xl border bg-card p-4 md:p-5">
            <Skeleton className="h-9 w-16" />
            <Skeleton className="mt-2 h-3 w-20" />
          </div>
        ))}
      </section>

      <section className="grid gap-4 pb-24 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-2xl border bg-card p-5">
            <Skeleton className="mb-3 h-1.5 w-10 rounded-full" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="mt-2 h-3.5 w-full" />
            <Skeleton className="mt-1.5 h-3.5 w-5/6" />
          </div>
        ))}
      </section>
    </div>
  );
}
