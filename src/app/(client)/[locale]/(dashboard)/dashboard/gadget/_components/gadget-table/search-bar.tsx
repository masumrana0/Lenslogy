"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setGadgetFilterQuery } from "@/redux/features/filter/gadget.filter";

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector(
    (state) => state.gadgetQuerySlice.queryObject.searchTerm
  );
  return (
    <div className="relative w-full  max-w-lg">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search articles..."
        className="pl-8 w-full"
        value={searchTerm}
        onChange={(e) =>
          dispatch(setGadgetFilterQuery({ searchTerm: e.target.value }))
        }
      />
      {searchTerm && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3"
          onClick={() => dispatch(setGadgetFilterQuery({ searchTerm: "" }))}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear search</span>
        </Button>
      )}
    </div>
  );
};

export default SearchBar;
