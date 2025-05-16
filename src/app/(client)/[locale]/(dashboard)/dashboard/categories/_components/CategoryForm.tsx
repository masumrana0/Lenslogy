"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { categorySchema } from "@/schama";
import { useCreateCategoryMutation } from "@/redux/api/category.api";
import status from "http-status";

type FormValues = z.infer<typeof categorySchema>;
const CategoryForm = () => {
  const [create, { isLoading }] = useCreateCategoryMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await create(data).unwrap();

      if (response?.statusCode === status.CREATED) {
        toast({
          title: "Success",
          description: "Category created successfully.",
        });
      }

      form.reset();
    } catch (error: any) {
      const message =
        error.data.message ||
        "An unexpected error occurred while creating the category";
      toast({
        title: "Error",
        description: message,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name </FormLabel>
              <FormControl>
                <Input placeholder="enter category name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="bg-red-500 hover:bg-red-600 text-white"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Category"}
        </Button>
      </form>
    </Form>
  );
};

export default CategoryForm;
