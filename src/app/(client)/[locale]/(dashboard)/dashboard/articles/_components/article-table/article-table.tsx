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
        // <GadgetForm mode="update" gadget={isEditOpen.gadget as Gadget} />
        <div>
          <h2>Cooking...</h2>
        </div>
      ) : (
        <div className="space-y-4">
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
