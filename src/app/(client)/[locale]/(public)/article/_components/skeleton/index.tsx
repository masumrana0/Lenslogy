import { Skeleton } from "@/components/ui/skeleton";

const ArticleSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header skeleton */}
      <div className="mb-8">
        <Skeleton className="h-10 w-3/4 mb-4" />
        <div className="flex items-center gap-4 mb-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div>
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
      </div>

      {/* Featured image skeleton */}
      <Skeleton className="w-full h-[400px] md:h-[500px] mb-8 rounded-lg" />

      {/* Content skeleton */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar skeleton */}
        <div className="md:w-64 order-2 md:order-1">
          <Skeleton className="h-[300px] w-full rounded-lg" />
        </div>

        {/* Main content skeleton */}
        <div className="md:flex-1 order-1 md:order-2 space-y-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-11/12" />
          <Skeleton className="h-6 w-10/12" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-9/12" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-10/12" />
          <Skeleton className="h-6 w-11/12" />
          <Skeleton className="h-6 w-full" />
        </div>
      </div>
    </div>
  );
};

export default ArticleSkeleton;
