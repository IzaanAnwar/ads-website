import { Skeleton } from '../ui/skeleton';

export function PageLoadingSkeleton() {
  return (
    <div className="h-[50v] w-full">
      <Skeleton className="h-full w-full" />
    </div>
  );
}
