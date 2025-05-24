import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";

export default function PageLayoutSkelton() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-8">Featured Stories</h1>

      {/* Filter and Sort Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Filter by</span>
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-8 w-24 rounded-full" />
            <Skeleton className="h-8 w-20 rounded-full" />
            <Skeleton className="h-8 w-16 rounded-full" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-20" />
            <span className="text-sm text-gray-600">per page</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort by</span>
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Story Card 1 */}
        <div className="flex gap-4 p-4 border rounded-lg">
          <Skeleton className="w-24 h-20 rounded flex-shrink-0" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-4 w-20 rounded-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>

        {/* Story Card 2 */}
        <div className="flex gap-4 p-4 border rounded-lg">
          <Skeleton className="w-24 h-20 rounded flex-shrink-0" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-4 w-16 rounded-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>

        {/* Story Card 3 */}
        <div className="flex gap-4 p-4 border rounded-lg">
          <Skeleton className="w-24 h-20 rounded flex-shrink-0" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-4 w-14 rounded-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>

        {/* Story Card 4 */}
        <div className="flex gap-4 p-4 border rounded-lg">
          <Skeleton className="w-24 h-20 rounded flex-shrink-0" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-4 w-16 rounded-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/5" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-32" />
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>
          <Button variant="outline" size="sm" className="w-8 h-8 p-0">
            1
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
