import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

// Mirrors the results page: verdict hero, the two summary cards, then the
// per-question review list.
export default function ResultsLoading() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-5 px-4 py-8">
      <Card className="border-2">
        <CardContent className="flex flex-col items-center gap-3 py-8">
          <Skeleton className="h-28 w-28 rounded-full" />
          <Skeleton className="h-7 w-48" />
          <SkeletonText lines={2} className="w-full max-w-md" />
          <div className="mt-2 flex gap-2">
            <Skeleton className="h-9 w-40 rounded-lg" />
            <Skeleton className="h-9 w-32 rounded-lg" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-[var(--study)]/35">
        <CardContent className="space-y-3 py-5">
          <Skeleton className="h-5 w-32" />
          <SkeletonText lines={2} />
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="space-y-3 py-5">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-2 w-full rounded-full" />
              <Skeleton className="h-2 w-4/5 rounded-full" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Skeleton className="mt-2 h-6 w-40" />
      <div className="flex flex-col gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="border-l-4 border-l-muted">
            <CardContent className="space-y-3 py-4">
              <Skeleton className="h-4 w-11/12" />
              <div className="grid gap-1.5">
                {Array.from({ length: 3 }).map((_, j) => (
                  <Skeleton key={j} className="h-9 w-full rounded-md" />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
