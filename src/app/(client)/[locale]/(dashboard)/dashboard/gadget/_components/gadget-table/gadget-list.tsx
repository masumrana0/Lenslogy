"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableCell } from "@/components/ui/table";
import type { Gadget } from "@prisma/client";
import type React from "react";
import { useState, type SetStateAction } from "react";
import Modal from "@/components/ui/modal";
import { gadgetBooleanFilterKeys } from "../../_utils/gadget.utils";
import { useDeleteGadgetMutation } from "@/redux/api/gadget.api";
import GadgetListSkeleton from "../skeletons/gadget-list-skeleton";
import GadgetCard from "./gadget-card";
import GadgetTableRow from "./gadget-table-row";
import EmptyDataList from "../../../_components/shared/empty-data-list";

const gadgetBooleanFieldsForUI = gadgetBooleanFilterKeys.map((key) => ({
  name: key,
}));

interface GadgetListProps {
  gadgets: Gadget[];
  isLoading: boolean;
  lang: "en" | "bn";
  setIsEditOpen: React.Dispatch<
    SetStateAction<{ state: boolean; gadget: Gadget | null }>
  >;
}

const GadgetList: React.FC<GadgetListProps> = ({
  gadgets,
  isLoading,
  setIsEditOpen,
  lang,
}) => {
  const [showLangAlert, setShowLangAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);
  const [deleteGadget, { isLoading: isDeleting }] = useDeleteGadgetMutation();

  const handleEdit = (gadget: Gadget) => {
    if (lang === "en" && gadget) {
      setIsEditOpen({ state: true, gadget });
    } else {
      setShowLangAlert(true);
    }
  };

  const handleDeleteConfirm = async () => {
    if (idToDelete) {
      await deleteGadget(idToDelete);
      setShowDeleteAlert(false);
      setIdToDelete(null);
    }
  };

  const handleDeleteClick = (id: string) => {
    setIdToDelete(id);
    setShowDeleteAlert(true);
  };

  const skeletonComponents = GadgetListSkeleton({ count: 5 });

  const renderDesktopView = () => (
    <div className="hidden md:block">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-border/50">
            <TableHead className="w-[40%] font-semibold">Title</TableHead>
            <TableHead className="font-semibold">Brand</TableHead>
            <TableHead className="font-semibold">model</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Created At</TableHead>
            <TableHead className="text-right font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <skeletonComponents.Desktop />
          ) : gadgets.length > 0 ? (
            gadgets.map((gadget) => (
              <GadgetTableRow
                key={gadget.id}
                gadget={gadget}
                lang={lang}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
                gadgetBooleanFilterKeys={gadgetBooleanFilterKeys}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="p-0">
                <EmptyDataList name="gadget" />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );

  const renderMobileView = () => (
    <div className="md:hidden p-4">
      {isLoading ? (
        <skeletonComponents.Mobile />
      ) : gadgets.length > 0 ? (
        <div className="space-y-4">
          {gadgets.map((gadget) => (
            <GadgetCard
              key={gadget.id}
              gadget={gadget}
              lang={lang}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              gadgetBooleanFields={gadgetBooleanFieldsForUI}
            />
          ))}
        </div>
      ) : (
        <EmptyDataList name="gadget" />
      )}
    </div>
  );

  return (
    <div className="rounded-lg md:border md:bg-card">
      {renderDesktopView()}
      {renderMobileView()}

      {/* Modals */}
      <Modal
        content="Gadget editing is only supported in English. Please switch the language to English to continue editing."
        setShowModal={setShowLangAlert}
        showModal={showLangAlert}
        title="Language Restriction"
      />
      <Modal
        content="Are you sure you want to delete this gadget? This action cannot be undone."
        setShowModal={setShowDeleteAlert}
        showModal={showDeleteAlert}
        title="Confirm Delete"
        onConfirm={handleDeleteConfirm}
        confirmText={isDeleting ? "Deleting..." : "Yes, Delete"}
        showCancel
      />
    </div>
  );
};

export default GadgetList;
