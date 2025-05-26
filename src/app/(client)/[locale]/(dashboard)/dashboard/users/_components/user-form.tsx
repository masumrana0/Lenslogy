"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import status from "http-status";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Utils & Redux
import { toast } from "@/components/ui/toast";
import { useCreateUserMutation } from "@/redux/api/user.api";
import { userSchema } from "@/schama/validation-schema";
import { IRole } from "../_interface/user.interface";
import { availableRoles } from "../_utils";

type FormValues = z.infer<typeof userSchema>;

interface UserFormProps {
  currentUserRole: IRole;
}

const UserForm: React.FC<UserFormProps> = ({ currentUserRole }) => {
  const router = useRouter();
  const roles = availableRoles(currentUserRole);

  const form = useForm<FormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "AUTHOR",
      designation: "",
    },
  });

  const [createUser, { isLoading }] = useCreateUserMutation();

  const onSubmit = async (values: FormValues) => {
    try {
      const res: any = await createUser(values).unwrap();
      if (res?.statusCode === status.CREATED) {
        toast({
          title: "User created",
          description: res?.message,
          type: "success",
          position: "top-center",
        });
      }

      form.reset();
      router.refresh();
    } catch (error: any) {
      const message = error?.data?.message || "An unexpected error occurred";
      toast({
        title: "Error",
        description: message,
        type: "error",
        position: "top-center",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormDescription>Must be at least 8 characters</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Role */}
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role.replace("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Determines what the user can do in the system.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Designation */}
        <FormField
          control={form.control}
          name="designation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Designation (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Senior Editor" {...field} />
              </FormControl>
              <FormDescription>
                The user&apos;s job title or role description.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-red-500 hover:bg-red-600"
        >
          {isLoading ? "Creating..." : "Create User"}
        </Button>
      </form>
    </Form>
  );
};

export default UserForm;
