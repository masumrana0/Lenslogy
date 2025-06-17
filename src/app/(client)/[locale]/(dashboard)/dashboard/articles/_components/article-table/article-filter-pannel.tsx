"use client";
import Limit from "@/components/shared/pagination/limit";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Category } from "@prisma/client";
import { Filter, X } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

import { cn } from "@/lib/utils";

import { useGetAllCategoriesQuery } from "@/redux/api/category.api";

import { IArticleFilters } from "../../interface/article.interface";
import { setArticleCache } from "@/redux/features/cashing/cashing.slice";
import { articleBooleanFilterKeys } from "../../_utils/utils";
import {
  clearArticleFilterQuery,
  setArticleFilterQuery,
} from "@/redux/features/filter/article.filter";

const FilterPanel = () => {
  const { locale: lang } = useParams();
  const dispatch = useAppDispatch();
  const queryObject = useAppSelector(
    (state) => state.articleQuerySlice.queryObject
  );

  const [localFilters, setLocalFilters] =
    React.useState<IArticleFilters>(queryObject);

  const { data: categoryData, isLoading: isLoadingBrand } =
    useGetAllCategoriesQuery(lang);

  const categories =
    categoryData && typeof categoryData === "object" && "data" in categoryData
      ? (categoryData.data as Category[])
      : [];

  const onResetFilters = () => {
    setLocalFilters({});
    dispatch(clearArticleFilterQuery());
  };

  const applyLocalFilters = () => {
    dispatch(setArticleFilterQuery(localFilters));
  };

  // storing brands and types data to showing active filter
  useEffect(() => {
    dispatch(setArticleCache({ categoryCash: categories }));
  }, [categories]);

  return (
    <div className="flex items-center gap-2 w-full sm:w-auto">
      <Sheet
        onOpenChange={(open) => {
          if (open) setLocalFilters(queryObject);
        }}
      >
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="h-9">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </SheetTrigger>

        <SheetContent className="p-5 space-y-6">
          <SheetHeader>
            <SheetTitle>Filter Article</SheetTitle>
            <SheetDescription>
              Apply filters to narrow down your Article list
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-4">
            {/* Brand Filter */}
            <div className="space-y-2">
              <Label htmlFor="brand">Article Category</Label>
              <Select
                value={queryObject.categoryBaseId || ""}
                onValueChange={(value) =>
                  setLocalFilters((prev) => ({
                    ...prev,
                    categoryBaseId: value,
                  }))
                }
              >
                <SelectTrigger id="brand">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {isLoadingBrand ? (
                    <SelectItem disabled value="__loading">
                      loading...
                    </SelectItem>
                  ) : categories.length > 0 ? (
                    categories.map((category) => (
                      <SelectItem key={category.id} value={category.baseId}>
                        {category.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem disabled value="__no_brand">
                      No Category available
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Status Toggles */}
            <div className="space-y-2">
              <Label htmlFor="status">Statuses</Label>
              <div className="flex flex-wrap gap-2">
                {articleBooleanFilterKeys.map((statusKey, index) => {
                  const isActive =
                    !!localFilters[
                      statusKey as unknown as keyof IArticleFilters
                    ];

                  return (
                    <Button
                      key={index}
                      type="button"
                      onClick={() =>
                        setLocalFilters((prev) => ({
                          ...prev,
                          [statusKey as string]:
                            !prev[statusKey as keyof IArticleFilters],
                        }))
                      }
                      className={cn(
                        "text-xs px-3 py-1 rounded-md border transition-colors duration-200",
                        isActive
                          ? "bg-red-500 text-white border-red-600"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                      )}
                    >
                      {statusKey}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Sort By */}
            <div className="space-y-2">
              <Label htmlFor="sortBy">Sort By</Label>
              <Select
                value={localFilters.sortBy || ""}
                onValueChange={(value: "createdAt" | "updatedAt") =>
                  setLocalFilters((prev) => ({ ...prev, sortBy: value }))
                }
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
                value={localFilters.sortOrder || ""}
                onValueChange={(value: "asc" | "desc") =>
                  setLocalFilters((prev) => ({ ...prev, sortOrder: value }))
                }
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
      <Limit
        limit={Number(queryObject.limit)}
        onLimitChange={(value) =>
          dispatch(setArticleFilterQuery({ limit: value }))
        }
      />

      {/* Clear Filters */}
      <Button
        variant="outline"
        size="sm"
        className="h-9"
        onClick={() => dispatch(clearArticleFilterQuery())}
      >
        <X className="mr-2 h-4 w-4" />
        Clear
      </Button>
    </div>
  );
};

export default FilterPanel;
