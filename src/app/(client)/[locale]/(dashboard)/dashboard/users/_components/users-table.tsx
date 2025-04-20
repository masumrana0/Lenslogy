"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  designation: string | null;
  avatar: string | null;
}

interface UsersTableProps {
  currentUserRole: string;
}

export function UsersTable({ currentUserRole }: UsersTableProps) {
  const router = useRouter();

  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     setIsLoading(true);
  //     try {
  //       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`);
  //       if (!res.ok) throw new Error("Failed to fetch users");
  //       const data = await res.json();
  //       setUsers(data);
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //       toast({
  //         title: "Error",
  //         description: "Failed to load users",
  //         type: "error",
  //       });
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchUsers();
  // }, [toast]);

  const handleDeleteClick = (id: string) => {
    setUserToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;

    try {
      // const res = await fetch(
      //   `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userToDelete}`,
      //   {
      //     method: "DELETE",
      //   }
      // );

      // if (!res.ok) {
      //   throw new Error("Failed to delete user");
      // }

      // Remove user from state
      setUsers(users.filter((user) => user.id !== userToDelete));

      toast({
        title: "User deleted",
        description: "The user has been deleted successfully",
      });

      router.refresh();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({
        title: "Error",
        description: "Failed to delete user",
      });
    } finally {
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN":
        return "default";
      case "ADMIN":
        return "secondary";
      case "AUTHOR":
        return "outline";
      default:
        return "outline";
    }
  };

  const canDeleteUser = (userRole: string) => {
    if (currentUserRole === "SUPER_ADMIN") return true;
    if (currentUserRole === "ADMIN" && userRole === "AUTHOR") return true;
    return false;
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Loading users...
                </TableCell>
              </TableRow>
            ) : users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar || ""} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getRoleBadgeVariant(user.role)}>
                      {user.role.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.designation || "-"}</TableCell>
                  <TableCell className="text-right">
                    {canDeleteUser(user.role) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(user.id)}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No users found
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
              user and all their associated data.
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
