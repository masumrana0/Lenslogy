"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { IArticlesTableFilters } from "../interface/article.interface";
import { booleanFilterKeys } from "./utils";

interface ActiveFiltersProps {
  filters: IArticlesTableFilters;
  categories: any[];
  onRemoveFilter: (key: keyof IArticlesTableFilters) => void;
}

const ActiveFilters = ({
  filters,
  categories,
  onRemoveFilter,
}: ActiveFiltersProps) => {
  const hasActiveFilters = Boolean(
    filters.searchTerm ||
      filters.categoryId ||
      filters.sortBy ||
      filters.sortOrder ||
      booleanFilterKeys.some((key) => filters[key] === "true")
  );
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

      {filters.categoryBaseId && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Category:{" "}
          {categories.find((c: any) => c.id === filters.categoryBaseId)?.name ||
            filters.categoryBaseId}
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 ml-1"
            onClick={() => onRemoveFilter("categoryBaseId")}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove</span>
          </Button>
        </Badge>
      )}

      {booleanFilterKeys.map((key) => {
        if (filters[key] === "true") {
 
          return (
            <Badge
              variant="secondary"
              className="flex items-center gap-1"
              key={key}
            >
              {key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => onRemoveFilter(key)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove</span>
              </Button>
            </Badge>
          );
        }
        return null;
      })}

      {/* {filters.isPublished !== null && (
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
      )} */}
    </div>
  );
};

export default ActiveFilters;
