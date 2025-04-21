"use client";
import { useRouter } from "next/navigation";
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

type FormValues = z.infer<typeof categorySchema>;

export function CategoryForm() {
  const router = useRouter();
  const [create, { isLoading }] = useCreateCategoryMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const response = await create(values);

      if (!response) {
        throw new Error("No response from create function");
      }

      toast({
        title: "Success",
        description: "Category created successfully.",
      });

      form.reset();
      router.refresh();
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error?.message ||
          "An unexpected error occurred while creating the category.",
      });
    } finally {
      return;
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
}
