"use client";
import type { Gadget, Language } from "@prisma/client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FilterPanel from "./filter-pannel";
import ActiveFilters from "./gadget-active-filters";
import { useGetAllGadgetsQuery } from "@/redux/api/gadget.api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { queryToObject } from "@/utils/query";
import GadgetForm from "../../new/components/gadget-form";
import GadgetList from "./gadget-list";
import { setGadgetFilterQuery } from "@/redux/features/filter/gadget.filter";
import SearchBar from "../../../_components/filters/search-bar";
import PaginationControls from "../../../_components/shared/pagination-controls";

const GadgetTable = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const lang = params.locale as Language;
  const dispatch = useAppDispatch();

  const [isEditOpen, setIsEditOpen] = useState<{
    state: boolean;
    gadget: Gadget | null;
  }>({ state: false, gadget: null });

  const queryObject = useAppSelector(
    (state) => state.gadgetQuerySlice.queryObject
  );
  const query = useAppSelector((state) => state.gadgetQuerySlice.gadgetQuery);

  // Initialize state from URL params on component mount
  useEffect(() => {
    const params = searchParams;

    const newQueryObject = queryToObject(params.toString());
    dispatch(setGadgetFilterQuery(newQueryObject));
  }, []);

  // set searchParam in the Url
  useEffect(() => {
    const params = new URLSearchParams(queryObject as any);
    router.push(`?${params.toString()}`);
  }, [queryObject, router]);

  const { data: gadgetData, isLoading } = useGetAllGadgetsQuery({
    query,
    lang,
  });

  const gadgets = gadgetData?.data.result || [];

  const meta = gadgetData?.data?.meta || {
    total: 0,
    page: 1,
    limit: 10,
    totalPage: 1,
  };

  return (
    <>
      {isEditOpen?.state ? (
        <GadgetForm
          mode="update"
          setIsEditOpen={setIsEditOpen}
          gadget={isEditOpen.gadget as Gadget}
        />
      ) : (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <SearchBar
              value={queryObject.searchTerm as string}
              onChange={(val) =>
                dispatch(setGadgetFilterQuery({ searchTerm: val }))
              }
              placeholder="Search articles..."
            />
            <FilterPanel />
          </div>

          <ActiveFilters />

          <GadgetList
            gadgets={gadgets}
            isLoading={isLoading}
            setIsEditOpen={setIsEditOpen}
            lang={lang}
          />

          {gadgets.length > 0 && (
            <PaginationControls
              onPageChange={(page) =>
                dispatch(setGadgetFilterQuery({ page: page }))
              }
              currentPage={Number(queryObject.page)}
              totalPages={meta.totalPage}
              limit={Number(queryObject.limit)}
              total={meta.total}
              resourceName="Gadget"
            />
          )}
        </div>
      )}
    </>
  );
};

export default GadgetTable;
