"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

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

interface Category {
  id: string;
  name: string;
  baseId: string;
}

export function CategoriesTable() {
  const param = useParams();
  const lang = param.locale;
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

  // Edit state
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
  const [editedName, setEditedName] = useState("");

  const { data, isLoading } = useGetAllCategoriesQuery(lang);

  const [deleteCategory, { isLoading: isDeleteLoading }] =
    useDeleteCategoryMutation();
  const [updateCategory, { isLoading: isUpdateLoading }] =
    useUpdateCategoryMutation();

  const handleDeleteClick = (id: string) => {
    setCategoryToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleEditClick = (category: Category) => {
    if (lang == "bn") {
      return alert("Please Switch English Language.");
    }
    setCategoryToEdit(category);
    setEditedName(category.name);
    setEditDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!categoryToDelete) return;

    try {
      await deleteCategory(categoryToDelete).unwrap();

      toast({
        title: "Category deleted",
        description: "The category has been deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete category",
        type: "error",
      });
    } finally {
      setDeleteDialogOpen(false);
      setCategoryToDelete(null);
    }
  };

  const handleEditConfirm = async () => {
    if (!categoryToEdit) return;

    try {
      await updateCategory({
        id: categoryToEdit.id,
        name: editedName,
      }).unwrap();

      toast({
        title: "Category updated",
        description: "The category has been updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update category",
        type: "error",
      });
    } finally {
      setEditDialogOpen(false);
      setCategoryToEdit(null);
    }
  };

  return (
    <>
      <div className="rounded-md border border-gray-200 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="font-semibold text-gray-700">
                Name
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Base ID
              </TableHead>
              <TableHead className="text-right font-semibold text-gray-700">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8">
                  <div className="flex justify-center items-center space-x-2">
                    <div className="h-4 w-4 rounded-full bg-red-500 animate-pulse"></div>
                    <p className="text-gray-500">Loading categories...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : data && data.length > 0 ? (
              data.map((category: Category) => (
                <TableRow
                  key={category.id}
                  className="hover:bg-gray-200 transition-colors group"
                >
                  <TableCell className="font-medium group-hover:text-red-500">
                    {category.name}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {category.baseId}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditClick(category)}
                        className="hover:bg-blue-50 text-blue-500 hover:text-blue-600 transition-colors"
                      >
                        <Pencil className="h-4 w-4 mr-1" />
                        <span className="hidden sm:inline">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(category.baseId)}
                        className="hover:bg-red-50 text-red-500 hover:text-red-600 transition-colors"
                      >
                        <Trash className="h-4 w-4 mr-1" />
                        <span className="hidden sm:inline">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-12">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="rounded-full bg-red-100 p-3">
                      <Trash className="h-6 w-6 text-red-500" />
                    </div>
                    <p className="text-gray-500 font-medium">
                      No categories found
                    </p>
                    <p className="text-gray-400 text-sm">
                      Create a category to get started
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl">
              Delete Category
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              This action cannot be undone. This will permanently delete the
              category and may affect articles using this category.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel className="border-gray-300 hover:bg-gray-50 transition-colors">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleteLoading}
              className="bg-red-500 hover:bg-red-600 transition-colors"
            >
              {isDeleteLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Edit Category</DialogTitle>
            <DialogDescription className="text-gray-600">
              Update the category name below.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="category-name" className="text-sm font-medium">
              Category Name
            </Label>
            <Input
              id="category-name"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="mt-1"
              placeholder="Enter category name"
            />
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setEditDialogOpen(false)}
              className="border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditConfirm}
              disabled={isUpdateLoading || !editedName.trim()}
              className="bg-blue-500 hover:bg-blue-600 transition-colors"
            >
              {isUpdateLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
