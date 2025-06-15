"use client";
import React, { useEffect } from "react";
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
import { Filter, X } from "lucide-react";
import { useGetAllBrandQuery } from "@/redux/api/brand.api";
import { useParams } from "next/navigation";
import { useGetAllGadgetTypeQuery } from "@/redux/api/gadgetType.api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { GadgetBrand, GadgetType } from "@prisma/client";
import {
  clearGadgetFilterQuery,
  setGadgetFilterQuery,
} from "@/redux/features/filter/gadget.filter";
import { gadgetBooleanFilterKeys } from "../../_utils/gadget.utils";
import { cn } from "@/lib/utils";
import { IGadgetFilters } from "../../_interface/gadget.interface";
import { setGadgetCashing } from "@/redux/features/cashing/gadget.cash";

const FilterPanel = () => {
  const { locale: lang } = useParams();
  const dispatch = useAppDispatch();
  const queryObject = useAppSelector(
    (state) => state.gadgetQuerySlice.queryObject
  );

  const [localFilters, setLocalFilters] =
    React.useState<IGadgetFilters>(queryObject);

  const { data: brandData, isLoading: isLoadingBrand } =
    useGetAllBrandQuery(lang);
  const { data: typeData, isLoading: isLoadingType } =
    useGetAllGadgetTypeQuery(lang);

  const brands =
    brandData && typeof brandData === "object" && "data" in brandData
      ? (brandData.data as GadgetBrand[])
      : [];

  const types =
    typeData && typeof typeData === "object" && "data" in typeData
      ? (typeData?.data as GadgetType[])
      : [];

  const onResetFilters = () => {
    setLocalFilters({});
    dispatch(clearGadgetFilterQuery());
  };

  const applyLocalFilters = () => {
    dispatch(setGadgetFilterQuery(localFilters));
  };

  // storing brands and types data to showing active filter
  useEffect(() => {
    dispatch(setGadgetCashing({ brandCash: brands, typesCash: types }));
  }, [brands, types]);

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
            <SheetTitle>Filter Gadgets</SheetTitle>
            <SheetDescription>
              Apply filters to narrow down your Gadget list
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-4">
            {/* Brand Filter */}
            <div className="space-y-2">
              <Label htmlFor="brand">Gadget Brand</Label>
              <Select
                value={localFilters.brandBaseId || ""}
                onValueChange={(value) =>
                  setLocalFilters((prev) => ({ ...prev, brandBaseId: value }))
                }
              >
                <SelectTrigger id="brand">
                  <SelectValue placeholder="Select Brand" />
                </SelectTrigger>
                <SelectContent>
                  {isLoadingBrand ? (
                    <SelectItem disabled value="__loading">
                      loading...
                    </SelectItem>
                  ) : brands.length > 0 ? (
                    brands.map((brand) => (
                      <SelectItem key={brand.id} value={brand.baseId}>
                        {brand.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem disabled value="__no_brand">
                      No brand available
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Gadget Type Filter */}
            <div className="space-y-2">
              <Label htmlFor="type">Gadget Type</Label>
              <Select
                value={localFilters.typeBaseId || ""}
                onValueChange={(value) =>
                  setLocalFilters((prev) => ({ ...prev, typeBaseId: value }))
                }
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {isLoadingType ? (
                    <SelectItem disabled value="_loading">
                      loading...
                    </SelectItem>
                  ) : types.length > 0 ? (
                    types.map((type) => (
                      <SelectItem key={type.id} value={type.baseId}>
                        {type.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem disabled value="_available">
                      No types available
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Status Toggles */}
            <div className="space-y-2">
              <Label htmlFor="status">Statuses</Label>
              <div className="flex flex-wrap gap-2">
                {gadgetBooleanFilterKeys.map((statusKey) => {
                  const isActive =
                    !!localFilters[statusKey as keyof IGadgetFilters];

                  return (
                    <Button
                      key={statusKey}
                      type="button"
                      onClick={() =>
                        setLocalFilters((prev) => ({
                          ...prev,
                          [statusKey]: !prev[statusKey as keyof IGadgetFilters],
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
          dispatch(setGadgetFilterQuery({ limit: value }))
        }
      />

      {/* Clear Filters */}
      <Button
        variant="outline"
        size="sm"
        className="h-9"
        onClick={() => dispatch(clearGadgetFilterQuery())}
      >
        <X className="mr-2 h-4 w-4" />
        Clear
      </Button>
    </div>
  );
};

export default FilterPanel;
