"use client";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Article } from "@prisma/client";

// Dynamic import with no SSR to prevent hydration issues
const ArticleFormClient = dynamic(() => import("./article-form-client"), {
  ssr: false,
  loading: () => (
    <Card className="border-none shadow-none p-5">
      <CardHeader className="px-0">
        <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
      </CardHeader>
      <CardContent className="px-0">
        <div className="space-y-8">
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
            <div className="space-y-4">
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-4">
              <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
          <div className="flex justify-end gap-2">
            <div className="h-10 w-20 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
});

interface ArticleFormProps {
  article?: Partial<Article>;
  onSuccess?: (article: Article) => void;
}

const ArticleForm = ({ article, onSuccess }: ArticleFormProps) => {
  return <ArticleFormClient article={article} onSuccess={onSuccess} />;
};

export default ArticleForm;
