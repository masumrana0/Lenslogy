"use client";

import { useCallback, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import status from "http-status";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Trash } from "lucide-react";
import { toast } from "@/components/ui/toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
} from "@/redux/api/category.api";
import {
  useDeleteBandMutation,
  useGetAllBrandQuery,
  useUpdateBandMutation,
} from "@/redux/api/brand.api";
import {
  useDeleteGadgetTypeMutation,
  useGetAllGadgetTypeQuery,
  useUpdateGadgetTypeMutation,
} from "@/redux/api/gadgetType.api";

import { Category, GadgetBrand, GadgetType } from "@prisma/client";

type IMode = "category" | "brand" | "gadgetType";
type IDataItem = Category | GadgetBrand | GadgetType;

const FormDataTable: React.FC<{ mode: IMode }> = ({ mode }) => {
  const { locale: lang } = useParams();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IDataItem | null>(null);
  const [editedName, setEditedName] = useState("");

  // Data queries
  const { data: categories = [], isLoading: isLoadingCategory } =
    useGetAllCategoriesQuery(lang, { skip: mode !== "category" });

  const { data: brands = [], isLoading: isLoadingBrand } = useGetAllBrandQuery(
    lang,
    { skip: mode !== "brand" }
  );

  const { data: gadgetTypes = [], isLoading: isLoadingGadgetType } =
    useGetAllGadgetTypeQuery(lang, { skip: mode !== "gadgetType" });

  // Mutations
  const [deleteCategory, { isLoading: isDeletingCategory }] =
    useDeleteCategoryMutation();
  const [updateCategory, { isLoading: isUpdatingCategory }] =
    useUpdateCategoryMutation();

  const [deleteBrand, { isLoading: isDeletingBrand }] = useDeleteBandMutation();
  const [updateBrand, { isLoading: isUpdatingBrand }] = useUpdateBandMutation();

  const [deleteGadgetType, { isLoading: isDeletingGadgetType }] =
    useDeleteGadgetTypeMutation();
  const [updateGadgetType, { isLoading: isUpdatingGadgetType }] =
    useUpdateGadgetTypeMutation();

  const data = useMemo(() => {
    if (mode === "category") return categories;
    if (mode === "brand") return brands;
    return gadgetTypes;
  }, [mode, categories, brands, gadgetTypes]);

  const isLoading = useMemo(() => {
    return (
      (mode === "category" && isLoadingCategory) ||
      (mode === "brand" && isLoadingBrand) ||
      (mode === "gadgetType" && isLoadingGadgetType)
    );
  }, [mode, isLoadingCategory, isLoadingBrand, isLoadingGadgetType]);

  const isDeleting = useMemo(() => {
    return (
      (mode === "category" && isDeletingCategory) ||
      (mode === "brand" && isDeletingBrand) ||
      (mode === "gadgetType" && isDeletingGadgetType)
    );
  }, [mode, isDeletingCategory, isDeletingBrand, isDeletingGadgetType]);

  const isUpdating = useMemo(() => {
    return (
      (mode === "category" && isUpdatingCategory) ||
      (mode === "brand" && isUpdatingBrand) ||
      (mode === "gadgetType" && isUpdatingGadgetType)
    );
  }, [mode, isUpdatingCategory, isUpdatingBrand, isUpdatingGadgetType]);

  const handleDeleteClick = useCallback((item: IDataItem) => {
    setSelectedItem(item);
    setDeleteDialogOpen(true);
  }, []);

  const handleEditClick = useCallback(
    (item: IDataItem) => {
      if (lang === "bn") {
        toast({
          title: "Switch to English",
          description: "Editing is only allowed in English.",
        });
        return;
      }
      setSelectedItem(item);

      setEditedName(item.name);
      setEditDialogOpen(true);
    },
    [lang]
  );

  const handleDeleteConfirm = async () => {
    if (!selectedItem?.baseId) return;
    try {
      let res;
      switch (mode) {
        case "category":
          res = await deleteCategory(selectedItem.baseId).unwrap();
          break;
        case "brand":
          res = await deleteBrand(selectedItem.baseId).unwrap();
          break;
        case "gadgetType":
          res = await deleteGadgetType(selectedItem.baseId).unwrap();
          break;
      }

      if (res?.statusCode === status.OK) {
        toast({
          title: `${mode} deleted`,
          description: `The ${mode} has been deleted successfully.`,
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.data?.message || `Failed to delete ${mode}`,
      });
    } finally {
      setDeleteDialogOpen(false);
      setSelectedItem(null);
    }
  };

  const handleEditConfirm = async () => {
    if (!selectedItem || !editedName.trim()) return;

    const trimmed = editedName.trim();
    if (trimmed === selectedItem.name) {
      toast({ title: "No Changes", description: "Name is unchanged." });
      return;
    }

    try {
      switch (mode) {
        case "category":
          await updateCategory({ id: selectedItem.id, name: trimmed }).unwrap();
          break;
        case "brand":
          await updateBrand({ id: selectedItem.id, name: trimmed }).unwrap();
          break;
        case "gadgetType":
          await updateGadgetType({
            id: selectedItem.id,
            name: trimmed,
          }).unwrap();
          break;
      }

      toast({
        title: `${mode} updated`,
        description: `The ${mode} has been updated successfully.`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.data?.message || `Failed to update ${mode}`,
      });
    } finally {
      setEditDialogOpen(false);
      setSelectedItem(null);
    }
  };

  return (
    <>
      <div className="rounded-md border overflow-auto max-h-[70vh] scrollbar-hide">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Base ID</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4">
                  Loading...
                </TableCell>
              </TableRow>
            ) : !data?.data?.length ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4">
                  No {mode}s found.
                </TableCell>
              </TableRow>
            ) : (
              data.data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.baseId}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        onClick={() => handleEditClick(item)}
                        variant="ghost"
                        size="sm"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteClick(item)}
                        variant="ghost"
                        size="sm"
                      >
                        <Trash className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {deleteDialogOpen && (
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. It will permanently delete the
                selected {mode}.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {editDialogOpen && (
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit {mode}</DialogTitle>
              <DialogDescription>
                Update the {mode} name below.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                placeholder={`Enter ${mode} name`}
              />
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleEditConfirm}
                disabled={isUpdating || !editedName.trim()}
              >
                {isUpdating ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default FormDataTable;
