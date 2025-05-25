/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { ArticleGridProps } from "@/app/(client)/[locale]/(public)/article/_interface/interface";
import ArticleCard from "../article-card";
import { useEffect, useState } from "react";
import PaginationControls from "@/app/(client)/[locale]/(dashboard)/dashboard/articles/_components/article-table/pagination-controls";
import { useRouter } from "next/navigation";

const ArticleGrid = ({
  articles,
  columns = 3,
  variant = "default",
  showCategory = true,
  showExcerpt = true,
  meta,
  lang,
}: ArticleGridProps) => {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const router = useRouter();

  const params = new URLSearchParams(window.location.search);

  useEffect(() => {
    const newLimit = params.has("limit")
      ? parseInt(params.get("limit")!, 10)
      : 10;
    setLimit(newLimit);
  }, [limit, params]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="w-full">
      <div className={`grid ${gridCols[columns]} gap-6`}>
        {articles.map((article) => (
          <ArticleCard
            lang={lang}
            key={article.id}
            article={article}
            variant={variant}
            showCategory={showCategory}
            showExcerpt={showExcerpt}
          />
        ))}
      </div>

      {articles.length > 0 && meta?.total && (
        <PaginationControls
          currentPage={page}
          totalPages={meta!.totalPage}
          limit={limit}
          total={meta!.total}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ArticleGrid;
