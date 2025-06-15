import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { Calendar, Package, Tag } from "lucide-react";

interface GadgetListSkeletonProps {
  count?: number;
}

const DesktopSkeleton = ({ count = 5 }: { count?: number }) => (
  <>
    {Array.from({ length: count }).map((_, index) => (
      <TableRow key={`desktop-skeleton-${index}`} className="animate-pulse">
        <TableCell className="py-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-3 w-[180px]" />
          </div>
        </TableCell>
        <TableCell>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-[80px]" />
          </div>
        </TableCell>
        <TableCell>
          <div className="flex flex-wrap gap-1">
            <Skeleton className="h-5 w-[60px] rounded-full" />
            <Skeleton className="h-5 w-[45px] rounded-full" />
            <Skeleton className="h-5 w-[70px] rounded-full" />
          </div>
        </TableCell>
        <TableCell>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground/30" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        </TableCell>
        <TableCell className="text-right">
          <Skeleton className="h-8 w-8 rounded-md ml-auto" />
        </TableCell>
      </TableRow>
    ))}
  </>
);

const MobileSkeleton = ({ count = 4 }: { count?: number }) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, index) => (
      <Card
        key={`mobile-skeleton-${index}`}
        className="overflow-hidden animate-pulse"
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <Skeleton className="h-5 w-[80%]" />
              <Skeleton className="h-3 w-[60%]" />
            </div>
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Package className="h-4 w-4 text-muted-foreground/30" />
              <Skeleton className="h-4 w-[60px]" />
            </div>
            <Skeleton className="h-4 w-[80px]" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Tag className="h-4 w-4 text-muted-foreground/30" />
              <span className="text-sm text-muted-foreground">Status:</span>
            </div>
            <div className="flex gap-1">
              <Skeleton className="h-5 w-[50px] rounded-full" />
              <Skeleton className="h-5 w-[40px] rounded-full" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground/30" />
              <span className="text-sm text-muted-foreground">Created:</span>
            </div>
            <Skeleton className="h-4 w-[90px]" />
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

const GadgetListSkeleton = ({ count = 5 }: GadgetListSkeletonProps) => {
  return {
    Desktop: () => <DesktopSkeleton count={count} />,
    Mobile: () => <MobileSkeleton count={count} />,
  };
};

export default GadgetListSkeleton;
