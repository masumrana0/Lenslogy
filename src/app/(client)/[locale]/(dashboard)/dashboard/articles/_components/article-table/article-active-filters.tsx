"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { removeSpecificFilterQuery } from "@/redux/features/filter/article.filter";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { X } from "lucide-react";
import { IArticleFilters } from "../../_interface/article.interface";

const ArticleActiveFilters = () => {
  const dispatch = useAppDispatch();
  const objectQuery = useAppSelector(
    (state) => state.articleQuerySlice.queryObject
  );

  const articleCash = useAppSelector(
    (state) => state.gadgetCashingReducer.article
  );

  // Destructure unused items from the rest of the query
  const {
    limit,
    page,
    sortBy,
    sortOrder,
    categoryBaseId,
    lang,
    ...othersQuery
  } = objectQuery;

  const selectedCategory = articleCash.categoryCash?.find(
    (category) => category.baseId === categoryBaseId
  );

  return (
    <div className="flex flex-wrap gap-2 items-center text-sm mt-2">
      <span className="text-muted-foreground">Active filters:</span>

      {selectedCategory && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Type: {selectedCategory.name}
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 ml-1 cursor-pointer "
            onClick={() =>
              dispatch(removeSpecificFilterQuery("categoryBaseId"))
            }
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove type filter</span>
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
              dispatch(removeSpecificFilterQuery(key as keyof IArticleFilters))
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

export default ArticleActiveFilters;
