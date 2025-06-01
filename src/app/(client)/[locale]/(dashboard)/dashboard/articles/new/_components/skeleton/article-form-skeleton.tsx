import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ArticleFormSkeleton = () => (
  <Card className="border-none shadow-none p-5">
    <CardHeader className="px-0">
      <Skeleton className="h-8 w-64" />
    </CardHeader>
    <CardContent className="px-0">
      <div className="space-y-8">
        <Skeleton className="h-10 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    </CardContent>
  </Card>
);

export default ArticleFormSkeleton;
