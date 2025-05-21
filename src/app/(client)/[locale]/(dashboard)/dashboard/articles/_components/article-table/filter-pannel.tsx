"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { IArticlesTableFilters } from "../../interface/article.interface";
import { booleanFilterKeys } from "../utils";

interface FilterPanelProps {
  filters: IArticlesTableFilters;
  categories: any[];
  limit: number;
  onApplyFilters: (filters: Partial<IArticlesTableFilters>) => void;
  onResetFilters: () => void;
  onLimitChange: (limit: number) => void;
}

const FilterPanel = ({
  filters,
  categories,
  limit,
  onApplyFilters,
  onResetFilters,
  onLimitChange,
}: FilterPanelProps) => {
  const [localFilters, setLocalFilters] = React.useState(filters);

  // Sync props with local state
  React.useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  // Update a single filter
  const updateFilter = (
    key: keyof IArticlesTableFilters,
    value: string | null
  ) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  console.log("Local Filters:", localFilters);
  // Toggle boolean filter
  const toggleBooleanFilter = (key: keyof IArticlesTableFilters) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: prev[key] === "true" ? null : "true",
    }));
  };

  // Apply filters from local state
  const applyLocalFilters = () => {
    onApplyFilters(localFilters);
  };

  return (
    <div className="flex items-center gap-2 w-full sm:w-auto">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="h-9">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </SheetTrigger>

        <SheetContent className="p-5 space-y-6">
          <SheetHeader>
            <SheetTitle>Filter Articles</SheetTitle>
            <SheetDescription>
              Apply filters to narrow down your article list
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-4">
            {/* Category Filter */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={localFilters.categoryBaseId || "all"}
                onValueChange={(value) =>
                  updateFilter("categoryBaseId", value === "all" ? "" : value)
                }
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category: any) => (
                    <SelectItem key={category.baseId} value={category.baseId}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status Toggles */}
            <div className="space-y-2">
              <Label htmlFor="status">Statuses</Label>
              <div className="flex flex-wrap gap-2">
                {booleanFilterKeys.map((statusKey) => (
                  <Button
                    key={statusKey}
                    type="button"
                    variant={
                      localFilters[statusKey] === "true" ? "default" : "outline"
                    }
                    onClick={() => toggleBooleanFilter(statusKey)}
                    className="text-xs"
                  >
                    {statusKey}
                  </Button>
                ))}
              </div>
            </div>

            {/* Sort By */}
            <div className="space-y-2">
              <Label htmlFor="sortBy">Sort By</Label>
              <Select
                value={localFilters.sortBy}
                onValueChange={(value) => updateFilter("sortBy", value)}
              >
                <SelectTrigger id="sortBy">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt">Created Date</SelectItem>
                  <SelectItem value="updatedAt">Updated Date</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort Order */}
            <div className="space-y-2">
              <Label htmlFor="sortOrder">Sort Order</Label>
              <Select
                value={localFilters.sortOrder}
                onValueChange={(value) => updateFilter("sortOrder", value)}
              >
                <SelectTrigger id="sortOrder">
                  <SelectValue placeholder="Sort Order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">Ascending</SelectItem>
                  <SelectItem value="desc">Descending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Footer Buttons */}
          <SheetFooter className="flex justify-between pt-4">
            <SheetClose asChild>
              <Button variant="outline" onClick={onResetFilters}>
                Reset
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button onClick={applyLocalFilters}>Apply Filters</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Pagination Limit */}
      <Select
        value={limit.toString()}
        onValueChange={(value) => onLimitChange(Number(value))}
      >
        <SelectTrigger className="w-[130px] h-9">
          <SelectValue placeholder="10 per page" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="5">5 per page</SelectItem>
          <SelectItem value="10">10 per page</SelectItem>
          <SelectItem value="20">20 per page</SelectItem>
          <SelectItem value="50">50 per page</SelectItem>
        </SelectContent>
      </Select>

      {/* Clear Filters */}
      <Button
        variant="outline"
        size="sm"
        className="h-9"
        onClick={onResetFilters}
      >
        <X className="mr-2 h-4 w-4" />
        Clear
      </Button>
    </div>
  );
};

export default FilterPanel;
