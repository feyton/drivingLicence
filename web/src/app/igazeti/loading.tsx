import { Skeleton } from "@/components/ui/skeleton";

export default function IgazetiLoading() {
  return (
    <div className="mx-auto flex h-[calc(100vh-3.5rem)] max-w-4xl flex-col px-4 py-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="space-y-2">
          <Skeleton className="h-6 w-64" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-8 w-32 rounded-md" />
      </div>
      <Skeleton className="min-h-0 flex-1 rounded-lg" />
    </div>
  );
}
