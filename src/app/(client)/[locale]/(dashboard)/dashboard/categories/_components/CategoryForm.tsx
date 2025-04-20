"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { toast } from "@/components/ui/toast";
import { categorySchema } from "@/schama";

type FormValues = z.infer<typeof categorySchema>;

export function CategoryForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);

    try {
      // const res = await fetch(
      //   `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(values),
      //   }
      // );

      // if (!res.ok) {
      //   throw new Error("Failed to create category");
      // }

      toast({
        title: "Category created",
        description: "Your category has been created successfully",
      });

      form.reset();
      router.refresh();
    } catch (error) {
      console.error("Error creating category:", error);
      toast({
        title: "Error",
        description: "Failed to create category",
      });
    } finally {
      setIsLoading(false);
    }
  }

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
                <Input placeholder="Technology" {...field} />
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
