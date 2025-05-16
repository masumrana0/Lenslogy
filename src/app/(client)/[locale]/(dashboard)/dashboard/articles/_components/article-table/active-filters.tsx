"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { ArticlesTableFilters } from ".";
 

interface ActiveFiltersProps {
  filters: ArticlesTableFilters;
  categories: any[];
  onRemoveFilter: (key: keyof ArticlesTableFilters) => void;
}

const ActiveFilters = ({
  filters,
  categories,
  onRemoveFilter,
}: ActiveFiltersProps) => {
  const hasActiveFilters =
    filters.searchTerm || filters.categoryId || filters.isPublished !== null;

  if (!hasActiveFilters) return null;

  return (
    <div className="flex flex-wrap gap-2 items-center text-sm">
      <span className="text-muted-foreground">Active filters:</span>

      {filters.searchTerm && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Search: {filters.searchTerm}
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 ml-1"
            onClick={() => onRemoveFilter("searchTerm")}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove</span>
          </Button>
        </Badge>
      )}

      {filters.categoryId && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Category:{" "}
          {categories.find((c: any) => c.id === filters.categoryId)?.name ||
            filters.categoryId}
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 ml-1"
            onClick={() => onRemoveFilter("categoryId")}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove</span>
          </Button>
        </Badge>
      )}

      {filters.isPublished !== null && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Status: {filters.isPublished === "true" ? "Published" : "Draft"}
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 ml-1"
            onClick={() => onRemoveFilter("isPublished")}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove</span>
          </Button>
        </Badge>
      )}
    </div>
  );
};

export default ActiveFilters;
