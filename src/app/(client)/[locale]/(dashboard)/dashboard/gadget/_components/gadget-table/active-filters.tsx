"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { removeSpecificFilterQuery } from "@/redux/features/filter/gadget.filter";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { X } from "lucide-react";
import { IGadgetFilters } from "../../_interface/gadget.interface";

const ActiveFilters = () => {
  const dispatch = useAppDispatch();
  const objectQuery = useAppSelector(
    (state) => state.gadgetQuerySlice.queryObject
  );

  const gadgetCash = useAppSelector((state) => state.gadgetCashingReducer);

  // Destructure unused items from the rest of the query
  const {
    limit,
    page,
    sortBy,
    sortOrder,
    brandBaseId,
    typeBaseId,
    lang,
    ...othersQuery
  } = objectQuery;

  const selectedBrand = gadgetCash.brandCash?.find(
    (brand) => brand.baseId === brandBaseId
  );

  const selectedType = gadgetCash.typesCash?.find(
    (type) => type.baseId === typeBaseId
  );

  return (
    <div className="flex flex-wrap gap-2 items-center text-sm mt-2">
      <span className="text-muted-foreground">Active filters:</span>

      {selectedType && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Type: {selectedType.name}
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 ml-1 cursor-pointer "
            onClick={() => dispatch(removeSpecificFilterQuery("typeBaseId"))}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove type filter</span>
          </Button>
        </Badge>
      )}

      {selectedBrand && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Brand: {selectedBrand.name}
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 ml-1 cursor-pointer"
            onClick={() => dispatch(removeSpecificFilterQuery("brandBaseId"))}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove brand filter</span>
          </Button>
        </Badge>
      )}

      {Object.entries(othersQuery).map(([key, value]) => (
        <Badge
          key={key}
          variant="secondary"
          className="flex items-center gap-1"
        >
          {key}: {String(value)}
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 ml-1 cursor-pointer"
            onClick={() =>
              dispatch(removeSpecificFilterQuery(key as keyof IGadgetFilters))
            }
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove {key} filter</span>
          </Button>
        </Badge>
      ))}
    </div>
  );
};

export default ActiveFilters;
