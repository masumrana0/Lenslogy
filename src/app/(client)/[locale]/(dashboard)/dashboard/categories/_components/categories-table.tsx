"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import status from "http-status";
import { Category } from "@prisma/client";

// ui components
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

// Component to render categories in a table format with edit/delete functionality
const CategoriesTable = () => {
  const param = useParams();
  const lang = param.locale;

  // State for delete confirmation dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [baseId, setBaseId] = useState<string | null>(null);

  // State for edit dialog
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
  const [editedName, setEditedName] = useState("");

  // Fetch categories based on current language
  const { data, isLoading } = useGetAllCategoriesQuery(lang);
  const categories = data?.data || [];

  // API hooks for delete and update
  const [deleteCategory, { isLoading: isDeleteLoading }] =
    useDeleteCategoryMutation();
  const [updateCategory, { isLoading: isLoadingUpdate }] =
    useUpdateCategoryMutation();

  // Handle delete click and open confirmation dialog
  const handleDeleteClick = (id: string) => {
    setBaseId(id);
    setDeleteDialogOpen(true);
  };

  // Handle edit click and open edit dialog
  const handleEditClick = (category: Category) => {
    if (lang === "bn") {
      return alert("Please Switch English Language.");
    }
    setCategoryToEdit(category);
    setEditedName(category.name);
    setEditDialogOpen(true);
  };

  // Confirm delete action
  const handleDeleteConfirm = async () => {
    if (!baseId) return;
    try {
      const res = await deleteCategory(baseId).unwrap();
      if (res.statusCode === status.OK) {
        toast({
          title: "Category deleted",
          description: "The category has been deleted successfully",
        });
      }
    } catch (error: any) {
      const message = error.data?.message || "Failed to delete category";
      toast({
        title: "Error",
        description: message,
      });
    }
  };

  // Confirm edit action
  const handleEditConfirm = async () => {
    if (!categoryToEdit) return;
    try {
      await updateCategory({
        name: editedName,
        id: categoryToEdit.id,
      }).unwrap();
      toast({
        title: "Category updated",
        description: "The category has been updated successfully",
      });
    } catch (error: any) {
      const message = error.data.message || "Failed to edit category";
      toast({
        title: "Error",
        description: message,
        type: "error",
      });
    } finally {
      setEditDialogOpen(false);
      setCategoryToEdit(null);
    }
  };

  return (
    <>
      {/* Table displaying categories */}
      <div className="rounded-md border overflow-hidden">
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
                  Loading categories...
                </TableCell>
              </TableRow>
            ) : categories.length > 0 ? (
              categories.map((category: Category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.baseId}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        onClick={() => handleEditClick(category)}
                        variant="ghost"
                        size="sm"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteClick(category.baseId)}
                        variant="ghost"
                        size="sm"
                      >
                        <Trash className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4">
                  No categories found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              <span className="font-semibold text-yellow-500">Warning:</span>{" "}
              This action is irreversible. Deleting this category will
              permanently remove it and may impact articles that reference or
              use it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleteLoading}
            >
              {isDeleteLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Category Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Update the category name below
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              placeholder="Enter new category name"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleEditConfirm}
              disabled={isLoadingUpdate || !editedName.trim()}
            >
              {isLoadingUpdate ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CategoriesTable;
