"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import type { Language } from "@prisma/client";
import {
  useDeleteArticleMutation,
  useGetAllArticlesQuery,
} from "@/redux/api/article.api";
import { useGetAllCategoriesQuery } from "@/redux/api/category.api";
import { toast } from "@/components/ui/toast";
import status from "http-status";
import SearchBar from "./search-bar";
import FilterPanel from "./filter-pannel";

import ArticlesList from "./article-list";
import PaginationControls from "./pagination-controls";
import DeleteDialog from "./delete-dialog";

import ActiveFilters from "../active-filters";
import { IArticlesTableFilters } from "../../interface/article.interface";
import { booleanFilterKeys, filterInitialState } from "../utils";

const ArticlesTable = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const lang = params.locale as Language;

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Filtering and sorting state
  const [filters, setFilters] =
    useState<IArticlesTableFilters>(filterInitialState);

  // Initialize state from URL params on component mount
  useEffect(() => {
    const params = searchParams;
    setFilters({
      searchTerm: params.get("searchTerm") || "",
      categoryBaseId: params.get("categoryBaseId") || "",
      isPublished: params.get("isPublished") || null,
      isEmergingTech: params.get("isEmergingTech") || null,
      isFeatured: params.get("isFeatured") || null,
   
      isHotTech: params.get("isHotTech") || null,
      isPinFeatured: params.get("isPinFeatured") || null,
      isPinHero: params.get("isPinHero") || null,
      isPinLatest: params.get("isPinLatest") || null,
      isUpComing: params.get("isUpComing") || null,
      sortBy: params.get("sortBy") || "createdAt",
      sortOrder: params.get("sortOrder") || "desc",
    });
    setPage(Number.parseInt(params.get("page") || "1"));
    setLimit(Number.parseInt(params.get("limit") || "10"));
  }, [searchParams]);
  // Delete dialog state

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null);

  // Build query params for API call
  const buildQueryString = () => {
    const queryParams = new URLSearchParams();

    // Pagination
    queryParams.set("page", page.toString());
    queryParams.set("limit", limit.toString());

    // Sorting
    queryParams.set("sortBy", filters.sortBy);
    queryParams.set("sortOrder", filters.sortOrder);

    // Filtering
    if (filters.searchTerm) queryParams.set("searchTerm", filters.searchTerm);
    if (filters.categoryBaseId)
      queryParams.set("categoryBaseId", filters.categoryBaseId);

    booleanFilterKeys.forEach((key) => {
      if (filters[key] !== null) {
        queryParams.set(key, filters[key]);
      } else {
        queryParams.delete(key);
      }
    });

    // Language
    queryParams.set("lang", lang);

    return queryParams.toString();
  };

  // Redux RTK queries
  const { data, isLoading, refetch } = useGetAllArticlesQuery(
    buildQueryString()
  );
  const { data: categoriesData } = useGetAllCategoriesQuery(lang);
  const categories = categoriesData?.data || [];
  const [deleteArticle] = useDeleteArticleMutation();

  // filters
  const articles = data?.data.result || [];

  const meta = data?.data?.meta || {
    total: 0,
    page: 1,
    limit: 10,
    totalPage: 1,
  };

  // Apply filters and update URL
  const applyFilters = (newFilters?: Partial<IArticlesTableFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);

    const params = new URLSearchParams(window.location.search);

    if (updatedFilters.searchTerm)
      params.set("searchTerm", updatedFilters.searchTerm);
    else params.delete("searchTerm");

    if (updatedFilters.categoryBaseId)
      params.set("categoryBaseId", updatedFilters.categoryBaseId);
    else params.delete("categoryBaseId");

    booleanFilterKeys.forEach((key) => {
      if (updatedFilters[key] !== null) {
        params.set(key, updatedFilters[key]);
      } else {
        params.delete(key);
      }
    });

    params.set("sortBy", updatedFilters.sortBy);
    params.set("sortOrder", updatedFilters.sortOrder);
    params.set("page", "1");

    router.push(`?${params.toString()}`);
    setPage(1);
    refetch();
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters(filterInitialState);
    setPage(1);
    router.push("?");

    refetch();
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
    refetch();
  };

  // Handle limit change
  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
    const params = new URLSearchParams(window.location.search);
    params.set("limit", newLimit.toString());
    params.set("page", "1");
    router.push(`?${params.toString()}`);
    refetch();
  };

  // Handle delete article
  const handleDeleteClick = (id: string) => {
    setArticleToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!articleToDelete) return;

    try {
      const res = await deleteArticle(articleToDelete);
      console.log(res);
      if (res.statusCode === status.OK) {
        toast({
          title: "Deleted",
          description: "Article deleted successfully.",
        });
        refetch();
      }
    } catch (error: any) {
      const message = error.data?.message || "Failed to delete article.";
      toast({
        title: "Error",
        description: message,
      });
    } finally {
      setDeleteDialogOpen(false);
      setArticleToDelete(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <SearchBar
          searchTerm={filters.searchTerm}
          onSearch={(term) => applyFilters({ searchTerm: term })}
        />

        <FilterPanel
          filters={filters}
          categories={categories}
          limit={limit}
          onApplyFilters={applyFilters}
          onResetFilters={resetFilters}
          onLimitChange={handleLimitChange}
        />
      </div>

      <ActiveFilters
        filters={filters}
        categories={categories}
        onRemoveFilter={(key) => {
          const newFilters = {
            ...filters,
            [key]: key === "isPublished" ? null : "",
          };
          applyFilters(newFilters);
        }}
      />

      <ArticlesList
        articles={articles}
        isLoading={isLoading}
        lang={lang}
        onDeleteClick={handleDeleteClick}
      />

      {articles.length > 0 && (
        <PaginationControls
          currentPage={page}
          totalPages={meta.totalPage}
          limit={limit}
          total={meta.total}
          onPageChange={handlePageChange}
        />
      )}

      <DeleteDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default ArticlesTable;
