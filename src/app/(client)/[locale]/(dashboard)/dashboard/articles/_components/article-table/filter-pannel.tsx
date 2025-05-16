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
import type { ArticlesTableFilters } from ".";

interface FilterPanelProps {
  filters: ArticlesTableFilters;
  categories: any[];
  limit: number;
  onApplyFilters: (filters: Partial<ArticlesTableFilters>) => void;
  onResetFilters: () => void;
  onLimitChange: (limit: number) => void;
}

const allStatus = [
  "isFeatured",
  "isPinFeatured",
  "isPinLatest",
  "isPinHero",
  "isPublished",
  "isUpComing",
  "isEmergingTech",
  "isHotTech",
  "isGadget",
];

const FilterPanel = ({
  filters,
  categories,
  limit,
  onApplyFilters,
  onResetFilters,
  onLimitChange,
}: FilterPanelProps) => {
  const [localFilters, setLocalFilters] = React.useState(filters);

  // Update local filters when props change
  React.useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  // Update a single filter value
  const updateFilter = (
    key: keyof ArticlesTableFilters,
    value: string | null
  ) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Apply filters from local state
  const applyLocalFilters = () => {
    onApplyFilters(localFilters);
  };

  return (
    <div className="flex items-center gap-2 w-full sm:w-auto     ">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="h-9">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filter Articles</SheetTitle>
            <SheetDescription>
              Apply filters to narrow down your article list
            </SheetDescription>
          </SheetHeader>

          <div className="  space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={localFilters.categoryId || "all"}
                onValueChange={(value) =>
                  updateFilter("categoryId", value === "all" ? "" : value)
                }
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category: any) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">All Statuses</Label>
              <div className="flex flex-wrap gap-2">
                {allStatus.map((status, index) => (
                  <Button variant="outline" key={index}>
                    {status}
                  </Button>
                ))}
              </div>
            </div>

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
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="updatedAt">Updated Date</SelectItem>
                </SelectContent>
              </Select>
            </div>

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

          <SheetFooter>
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

      <Select
        value={limit.toString()}
        onValueChange={(value) => onLimitChange(Number.parseInt(value))}
      >
        <SelectTrigger className="w-[100px] h-9">
          <SelectValue placeholder="10 per page" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="5">5 per page</SelectItem>
          <SelectItem value="10">10 per page</SelectItem>
          <SelectItem value="20">20 per page</SelectItem>
          <SelectItem value="50">50 per page</SelectItem>
        </SelectContent>
      </Select>

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
