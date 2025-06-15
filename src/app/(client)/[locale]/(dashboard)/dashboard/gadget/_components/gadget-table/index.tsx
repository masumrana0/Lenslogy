"use client";
import { toast } from "@/components/ui/toast";
import { useDeleteArticleMutation } from "@/redux/api/article.api";
import type { Gadget, Language } from "@prisma/client";
import status from "http-status";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FilterPanel from "./filter-pannel";
import SearchBar from "./search-bar";

import DeleteDialog from "./delete-dialog";
import PaginationControls from "./pagination-controls";
import { booleanFilterKeys } from "../../../articles/_components/utils";
import ActiveFilters from "./active-filters";
import { useGetAllGadgetsQuery } from "@/redux/api/gadget.api";
import { useGetAllBrandQuery } from "@/redux/api/brand.api";
import { useGetAllGadgetTypeQuery } from "@/redux/api/gadgetType.api";
import { gadgetFilterInitialState } from "../../_utils/gadget.utils";
import { IGadgetFilters } from "../../_interface/gadget.interface";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { objectToQuery } from "@/utils/query";
import GadgetForm from "../../new/components/gadget-form";
import GadgetList from "./gadget-list";

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
  const query = objectToQuery(queryObject);

  // Initialize state from URL params on component mount
  useEffect(() => {
    const params = searchParams;
  }, [searchParams]);

  // set searchParam in the Url
  useEffect(() => {
    const params = new URLSearchParams(queryObject as any);
    router.push(`?${params.toString()}`);
  }, [queryObject, router]);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null);

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
  console.log(gadgets);

  // Build query params for API call

  // Redux RTK queries
  // const { data, isLoading, refetch } = useGetAllGadgetsQuery(
  //   // buildQueryString()
  // );

  // filters
  // const articles = data?.data.result || [];

  // const meta = data?.data?.meta || {
  //   total: 0,
  //   page: 1,
  //   limit: 10,
  //   totalPage: 1,
  // };

  return (
    <>
      {isEditOpen?.state ? (
        <GadgetForm mode="update" gadget={isEditOpen.gadget as Gadget} />
      ) : (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <SearchBar />

            <FilterPanel />
          </div>

          <ActiveFilters />

          <GadgetList
            gadgets={gadgets}
            isLoading={isLoading}
            setIsEditOpen={setIsEditOpen}
            lang={lang}
          />

          {/* {articles.length > 0 && (
        <PaginationControls
          currentPage={page}
          totalPages={meta.totalPage}
          limit={limit}
          total={meta.total}
          onPageChange={handlePageChange}
        />
      )} */}

          {/* <DeleteDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
      /> */}
        </div>
      )}
    </>
  );
};

export default GadgetTable;
