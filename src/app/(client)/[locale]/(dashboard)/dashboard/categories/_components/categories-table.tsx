"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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

import { Trash } from "lucide-react";
import { toast } from "@/components/ui/toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Category {
  id: string;
  name: string;
  enName: string;
  bnName: string | null;
}

export function CategoriesTable() {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     setIsLoading(true);
  //     try {
  //       const res = await fetch(
  //         `${process.env.NEXT_PUBLIC_API_URL}/api/categories`
  //       );
  //       if (!res.ok) throw new Error("Failed to fetch categories");
  //       const data = await res.json();
  //       setCategories(data);
  //     } catch (error) {
  //       console.error("Error fetching categories:", error);
  //       toast({
  //         title: "Error",
  //         description: "Failed to load categories",
  //         type: "error",
  //       });
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchCategories();
  // }, [toast]);

  const handleDeleteClick = (id: string) => {
    setCategoryToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    // if (!categoryToDelete) return;
    // try {
    //   const res = await fetch(
    //     `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${categoryToDelete}`,
    //     {
    //       method: "DELETE",
    //     }
    //   );
    //   if (!res.ok) {
    //     throw new Error("Failed to delete category");
    //   }
    //   // Remove category from state
    //   setCategories(
    //     categories.filter((category) => category.id !== categoryToDelete)
    //   );
    //   toast({
    //     title: "Category deleted",
    //     description: "The category has been deleted successfully",
    //   });
    //   router.refresh();
    // } catch (error) {
    //   console.error("Error deleting category:", error);
    //   toast({
    //     title: "Error",
    //     description: "Failed to delete category",
    //     type: "error",
    //   });
    // } finally {
    //   setDeleteDialogOpen(false);
    //   setCategoryToDelete(null);
    // }
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>English Name</TableHead>
              <TableHead>Bengali Name</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Loading categories...
                </TableCell>
              </TableRow>
            ) : categories.length > 0 ? (
              categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>{category.enName}</TableCell>
                  <TableCell>{category.bnName || "-"}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteClick(category.id)}
                    >
                      <Trash className="h-4 w-4 text-red-500" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No categories found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              category and may affect articles using this category.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
