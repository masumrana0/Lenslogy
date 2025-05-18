"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { ArticlesTableFilters } from ".";
import React from "react";

interface ActiveFiltersProps {
  filters: ArticlesTableFilters;
  categories: any[];
  onRemoveFilter: (key: keyof ArticlesTableFilters) => void;
}

const booleanFilterKeys: (keyof ArticlesTableFilters)[] = [
  "isPublished",
  "isFeatured",
  "isPinFeatured",
  "isPinLatest",
  "isPinHero",
  "isUpComing",
  "isEmergingTech",
  "isHotTech",
  "isGadget",
];

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
    <div className="flex flex-wrap gap-2 items-center text-sm mt-2">
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

      {/* Boolean filters */}
      {booleanFilterKeys.map(
        (key) =>
          filters[key] === "true" && (
            <Badge
              key={key}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {key.replace(/^is/, "")}: Enabled
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
          )
      )}

      {/* Sort By */}
      {filters.sortBy && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Sort By: {filters.sortBy}
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 ml-1"
            onClick={() => onRemoveFilter("sortBy")}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove</span>
          </Button>
        </Badge>
      )}

      {/* Sort Order */}
      {filters.sortOrder && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Order: {filters.sortOrder === "asc" ? "Ascending" : "Descending"}
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 ml-1"
            onClick={() => onRemoveFilter("sortOrder")}
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
