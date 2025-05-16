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
import ActiveFilters from "../active-filters";
import ArticlesList from "./article-list";
import PaginationControls from "./pagination-controls";
import DeleteDialog from "./delete-dialog";

export interface ArticlesTableFilters {
  searchTerm: string;
  categoryId: string;
  isPublished: string | null;
  sortBy: string;
  sortOrder: string;
}

const ArticlesTable = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const lang = params.locale as Language;

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Filtering and sorting state
  const [filters, setFilters] = useState<ArticlesTableFilters>({
    searchTerm: searchParams.get("searchTerm") || "",
    categoryId: searchParams.get("categoryId") || "",
    isPublished: searchParams.get("isPublished") || null,
    sortBy: searchParams.get("sortBy") || "createdAt",
    sortOrder: searchParams.get("sortOrder") || "desc",
  });

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
    if (filters.categoryId) queryParams.set("categoryId", filters.categoryId);
    if (filters.isPublished !== null)
      queryParams.set("isPublished", filters.isPublished);

    // Language
    queryParams.set("lang", lang);

    return queryParams.toString();
  };

  // Redux RTK queries
  const { data, isLoading, refetch } = useGetAllArticlesQuery(
    buildQueryString()
  );
  const articles = data?.data || [];
  // console.log( );
  const meta = data?.meta || { total: 0, page: 1, limit: 10, totalPage: 1 };

  const { data: categoriesData } = useGetAllCategoriesQuery(lang);
  const categories = categoriesData?.data || [];

  const [deleteArticle] = useDeleteArticleMutation();

  // Apply filters and update URL
  const applyFilters = (newFilters?: Partial<ArticlesTableFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);

    const params = new URLSearchParams(window.location.search);

    if (updatedFilters.searchTerm)
      params.set("searchTerm", updatedFilters.searchTerm);
    else params.delete("searchTerm");

    if (updatedFilters.categoryId)
      params.set("categoryId", updatedFilters.categoryId);
    else params.delete("categoryId");

    if (updatedFilters.isPublished !== null)
      params.set("isPublished", updatedFilters.isPublished);
    else params.delete("isPublished");

    params.set("sortBy", updatedFilters.sortBy);
    params.set("sortOrder", updatedFilters.sortOrder);
    params.set("page", "1"); // Reset to first page when filters change

    router.push(`?${params.toString()}`);
    setPage(1);
    refetch();
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      searchTerm: "",
      categoryId: "",
      isPublished: null,
      sortBy: "createdAt",
      sortOrder: "desc",
    });
    setPage(1);
    router.push(""); // Clear URL params
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

  // Initialize state from URL params on component mount
  useEffect(() => {
    const params = searchParams;
    setFilters({
      searchTerm: params.get("searchTerm") || "",
      categoryId: params.get("categoryId") || "",
      isPublished: params.get("isPublished") || null,
      sortBy: params.get("sortBy") || "createdAt",
      sortOrder: params.get("sortOrder") || "desc",
    });
    setPage(Number.parseInt(params.get("page") || "1"));
    setLimit(Number.parseInt(params.get("limit") || "10"));
  }, [searchParams]);

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
