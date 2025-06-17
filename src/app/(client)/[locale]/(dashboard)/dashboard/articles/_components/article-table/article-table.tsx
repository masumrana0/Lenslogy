"use client";
import { useGetAllArticlesQuery } from "@/redux/api/article.api";
import type { Article, Language } from "@prisma/client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FilterPanel from "./article-filter-pannel";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { queryToObject } from "@/utils/query";
import { setArticleFilterQuery } from "@/redux/features/filter/article.filter";
import ArticleActiveFilters from "./article-active-filters";
import ArticleList from "./article-list";
import PaginationControls from "../../../_components/shared/pagination-controls";
import SearchBar from "../../../_components/filters/search-bar";
import ArticleForm from "../../new/_components/article-form/article-form";
import { DashboardHeader } from "@/components/(dashboard)/shared/dashboard-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

const ArticlesTable = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const lang = params.locale as Language;
  const dispatch = useAppDispatch();

  const [isEditOpen, setIsEditOpen] = useState<{
    state: boolean;
    article: Article | null;
  }>({ state: false, article: null });

  const queryObject = useAppSelector(
    (state) => state.articleQuerySlice.queryObject
  );
  const query = useAppSelector((state) => state.articleQuerySlice.articleQuery);

  // Initialize state from URL params on component mount
  useEffect(() => {
    const params = searchParams;

    const newQueryObject = queryToObject(params.toString());
    dispatch(setArticleFilterQuery(newQueryObject));
  }, []);

  // set searchParam in the Url
  useEffect(() => {
    const params = new URLSearchParams(queryObject as any);
    router.push(`?${params.toString()}`);
  }, [queryObject, router]);

  const { data: articleData, isLoading } = useGetAllArticlesQuery({
    query,
    lang,
  });

  const articles = articleData?.data.result || [];

  const meta = articleData?.data?.meta || {
    total: 0,
    page: 1,
    limit: 10,
    totalPage: 1,
  };

  return (
    <>
      {isEditOpen?.state ? (
        <ArticleForm
          mode="update"
          setIsEditOpen={setIsEditOpen}
          article={isEditOpen.article as Article}
        />
      ) : (
        <div className="space-y-4">
          <DashboardHeader heading="Articles" text="Manage your articles">
            <Button asChild>
              <Link href="/dashboard/articles/new">
                <Plus className="mr-2 h-4 w-4" /> New Article
              </Link>
            </Button>
          </DashboardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <SearchBar
              value={queryObject.searchTerm as string}
              onChange={(val) =>
                dispatch(setArticleFilterQuery({ searchTerm: val }))
              }
              placeholder="Search articles..."
            />

            <FilterPanel />
          </div>

          <ArticleActiveFilters />

          <ArticleList
            articles={articles}
            isLoading={isLoading}
            setIsEditOpen={setIsEditOpen}
            lang={lang}
          />

          {articles.length > 0 && (
            <PaginationControls
              currentPage={Number(queryObject.page)}
              totalPages={meta.totalPage}
              limit={Number(queryObject.limit)}
              total={meta.total}
              resourceName="Articles"
              onPageChange={(page) =>
                dispatch(setArticleFilterQuery({ page: page }))
              }
            />
          )}
        </div>
      )}
    </>
  );
};

export default ArticlesTable;
