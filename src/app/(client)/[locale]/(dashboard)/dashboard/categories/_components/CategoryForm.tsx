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

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters",
  }),
  enName: z.string().min(2, {
    message: "English name must be at least 2 characters",
  }),
  bnName: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function CategoryForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      enName: "",
      bnName: "",
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
              <FormLabel>Slug Name</FormLabel>
              <FormControl>
                <Input placeholder="technology" {...field} />
              </FormControl>
              <FormDescription>
                The unique identifier for the category (lowercase, no spaces)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="enName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>English Name</FormLabel>
              <FormControl>
                <Input placeholder="Technology" {...field} />
              </FormControl>
              <FormDescription>The display name in English</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bnName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bengali Name (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="প্রযুক্তি" {...field} />
              </FormControl>
              <FormDescription>The display name in Bengali</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Category"}
        </Button>
      </form>
    </Form>
  );
}
