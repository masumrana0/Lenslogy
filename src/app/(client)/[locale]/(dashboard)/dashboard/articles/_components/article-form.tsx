"use client";

import { useState, useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/toast";
import { Editor } from "./editor";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters",
  }),
  excerpt: z.string().min(10, {
    message: "Excerpt must be at least 10 characters",
  }),
  content: z.string().min(50, {
    message: "Content must be at least 50 characters",
  }),
  image: z.string().url({
    message: "Please enter a valid URL for the image",
  }),
  categoryId: z.string({
    required_error: "Please select a category",
  }),
  tags: z.array(z.string()).optional(),
  published: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

interface Category {
  id: string;
  name: string;
  enName: string;
}

interface Tag {
  id: string;
  name: string;
  enName: string;
}

export function ArticleForm({ article }: { article?: any }) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: article?.enTitle || "",
      excerpt: article?.enExcerpt || "",
      content: article?.enContent || "",
      image: article?.enImage || "",
      categoryId: article?.categoryId || "",
      tags: article?.tags?.map((tag: any) => tag.id) || [],
      published: article?.published || false,
    },
  });

  // useEffect(() => {
  //   const fetchCategories = async () => {
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
  //     }
  //   };

  //   const fetchTags = async () => {
  //     try {
  //       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tags`);
  //       if (!res.ok) throw new Error("Failed to fetch tags");
  //       const data = await res.json();
  //       setTags(data);
  //     } catch (error) {
  //       console.error("Error fetching tags:", error);
  //       toast({
  //         title: "Error",
  //         description: "Failed to load tags",
  //         variant: "destructive",
  //       });
  //     }
  //   };

  //   fetchCategories();
  //   fetchTags();
  // }, [toast]);

  async function onSubmit(values: FormValues) {
    setIsLoading(true);

    try {
      // const endpoint = article
      //   ? `${process.env.NEXT_PUBLIC_API_URL}/api/articles/${article.slug}`
      //   : `${process.env.NEXT_PUBLIC_API_URL}/api/articles`;

      // const method = article ? "PUT" : "POST";

      // const res = await fetch(endpoint, {
      //   method,
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(values),
      // });

      // if (!res.ok) {
      //   throw new Error("Failed to save article");
      // }

      // const data = await res.json();

      toast({
        title: article ? "Article updated" : "Article created",
        description: article
          ? "Your article has been updated successfully"
          : "Your article has been created successfully",
      });

      // router.push("/dashboard/articles");
      router.refresh();
    } catch (error) {
      console.error("Error saving article:", error);
      toast({
        title: "Error",
        description: "Failed to save article",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter article title" {...field} />
                </FormControl>
                <FormDescription>
                  The title of your article as it will appear on the blog
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Featured Image URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com/image.jpg"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  URL to the featured image for your article
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Brief summary of your article"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                A short summary that appears on article cards
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Editor
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Write your article content here..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.enName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  The category this article belongs to
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel>Tags</FormLabel>
                  <FormDescription>
                    Select tags relevant to your article
                  </FormDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <FormField
                      key={tag.id}
                      control={form.control}
                      name="tags"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={tag.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(tag.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...(field.value || []),
                                        tag.id,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== tag.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {tag.enName}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="published"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Publish</FormLabel>
                <FormDescription>
                  Check this box to make the article publicly visible
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading
              ? "Saving..."
              : article
              ? "Update Article"
              : "Create Article"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard/articles")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
