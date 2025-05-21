"use client";

import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { status } from "http-status";

// UI Components
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/toast";
import { ImageUploader } from "@/components/ui/image-uploader";
import { Loader2, Save } from "lucide-react";

// Custom Components
import { RichTextEditor } from "./editor";

// API Hooks
import { useGetAllCategoriesQuery } from "@/redux/api/category.api";
import {
  useCreateArticleMutation,
  useUpdateArticleMutation,
} from "@/redux/api/article.api";

// Schema & Types
import { articleSchema } from "@/schama";
import type { Article, Category } from "@prisma/client";
import { articleBooleanFields } from "./utils";
import { log } from "console";

// Form Schema Type - Explicitly define the type to match the schema
type FormValues = {
  title: string;
  excerpt: string;
  content: string;
  image: File | string;
  categoryBaseId: string;
  categoryId: string;
  isPublished: boolean;
  isFeatured: boolean;
  isPinFeatured: boolean;
  isPinLatest: boolean;
  isPinHero: boolean;
  isUpComing: boolean;
  isEmergingTech: boolean;
  isHotTech: boolean;
  isGadget: boolean;
};

interface ArticleFormProps {
  article?: Partial<Article>;
  onSuccess?: (article: Article) => void;
}

const ArticleForm = ({ article, onSuccess }: ArticleFormProps) => {
  const params = useParams();
  const lang = params?.locale as string;
  const isEditMode = !!article?.id;

  const [imagePreview, setImagePreview] = useState<string | null>(
    article?.image || null
  );

  // Fetch categories
  const { data, isLoading: isCategoryLoading } = useGetAllCategoriesQuery(lang);
  const categories = data?.data || [];

  // API mutations
  const [createArticle, { isLoading: isCreating }] = useCreateArticleMutation();
  const [updateArticle, { isLoading: isUpdating }] = useUpdateArticleMutation();
  const isLoading = isCreating || isUpdating;

  // Initialize form with explicit default values for all boolean fields
  const form = useForm<FormValues>({
    resolver: zodResolver(articleSchema) as any,
    defaultValues: {
      title: article?.title || "",
      excerpt: article?.excerpt || "",
      content: article?.content || "",
      image: "",
      categoryBaseId: article?.categoryBaseId || "",
      categoryId: article?.categoryId || "",
      // Ensure all boolean fields have explicit default values
      isPublished: article?.isPublished || false,
      isFeatured: article?.isFeatured || false,
      isPinFeatured: article?.isPinFeatured || false,
      isPinLatest: article?.isPinLatest || false,
      isPinHero: article?.isPinHero || false,
      isUpComing: article?.isUpComing || false,
      isEmergingTech: article?.isEmergingTech || false,
      isHotTech: article?.isHotTech || false,
      isGadget: article?.isGadget || false,
    },
  });

  // Set selected category when form values change
  // useEffect(() => {
  //   if (article?.categoryBaseId && categories.length > 0) {
  //     const category = categories.find(
  //       (cat: Category) => cat.id === article.categoryBaseId
  //     );
  //     if (category) {
  //       form.setValue("categoryId", category.id);
  //     }
  //   }
  // }, [article, categories, form]);

  // Submit handler
  const onSubmit = async (values: FormValues) => {
    console.log("Form Values:", values);
    console.log("Image Preview:", imagePreview);
    try {
      const formData = new FormData();
      const { image, ...payloadData } = values;

      formData.append("payload", JSON.stringify(payloadData));

      if (image instanceof File) {
        formData.append("imgFile", image);
      }

      let response;

      if (isEditMode && article?.id) {
        formData.append("id", article.id.toString());
        response = await updateArticle(formData).unwrap();
      } else {
        response = await createArticle(formData).unwrap();
      }

      if (
        response?.statusCode === status.CREATED ||
        response?.statusCode === status.OK
      ) {
        toast({
          title: "Success",
          description: isEditMode
            ? "Article updated successfully"
            : "Article created successfully",
        });

        if (onSuccess && response.data) {
          onSuccess(response.data);
        }

        if (!isEditMode) {
          // Keep the image preview but reset the form with proper default values
          // const currentImagePreview = imagePreview;
          form.reset({
            title: "",
            excerpt: "",
            content: "",
            image: "",
            categoryBaseId: "",
            categoryId: "",
            isPublished: false,
            isFeatured: false,
            isPinFeatured: false,
            isPinLatest: false,
            isPinHero: false,
            isUpComing: false,
            isEmergingTech: false,
            isHotTech: false,
            isGadget: false,
          });
          setImagePreview(null);
        }
      }
    } catch (error: any) {
      const message = error.data?.message || "Failed to save article";
      toast({
        title: "Error",
        description: message,
      });
    }
  };

  return (
    <Card className="border-none shadow-none p-5">
      <CardHeader className="px-0">
        <CardTitle className="text-2xl font-bold">
          {isEditMode ? "Edit Article" : "Create New Article"}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Tabs defaultValue="content" className="w-full">
              {/* Tab Navigation */}
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Content Tab */}
              <TabsContent value="content" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
                  {/* Left: Text Inputs */}
                  <div className="space-y-8">
                    {/* Title */}
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter article title"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Title as it appears on the blog.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Excerpt */}
                    <FormField
                      control={form.control}
                      name="excerpt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Excerpt</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Brief summary..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Rich Content */}
                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Content</FormLabel>
                          <FormControl>
                            <RichTextEditor
                              value={field.value}
                              onChange={field.onChange}
                              placeholder="Write your article content..."
                              className="min-h-[500px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Right: Image and Category */}
                  <div className="space-y-8">
                    {/* Image Upload */}
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field: { onChange, value } }) => (
                        <FormItem>
                          <FormLabel>Featured Image</FormLabel>
                          <FormControl>
                            <ImageUploader
                              onImageUpload={({ file, previewUrl }) => {
                                onChange(file);
                                setImagePreview(previewUrl);
                              }}
                              initialImage={imagePreview}
                              onRemove={() => {
                                onChange("");
                                setImagePreview(null);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Category Dropdown */}
                    <FormField
                      control={form.control}
                      name="categoryBaseId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                              const category = categories.find(
                                (cat: Category) => cat.baseId === value
                              );
                              if (category) {
                                form.setValue("categoryId", category.id);
                              }
                            }}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {isCategoryLoading ? (
                                <SelectItem value="loading" disabled>
                                  Loading categories...
                                </SelectItem>
                              ) : categories.length === 0 ? (
                                <SelectItem value="empty" disabled>
                                  No categories available
                                </SelectItem>
                              ) : (
                                categories.map((cat: Category) => (
                                  <SelectItem key={cat.id} value={cat.baseId}>
                                    {cat.name}
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Boolean Settings */}
                  {articleBooleanFields.map(({ name, label, desc }) => (
                    <FormField
                      key={name}
                      control={form.control}
                      name={name as keyof FormValues}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start p-4 border rounded-md space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value as any}
                              onCheckedChange={field.onChange}
                              id={name}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel htmlFor={name}>{label}</FormLabel>
                            <FormDescription>{desc}</FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Submit Button */}
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  const currentImagePreview = imagePreview;
                  form.reset({
                    title: "",
                    excerpt: "",
                    content: "",
                    image: "",
                    categoryBaseId: "",
                    categoryId: "",
                    isPublished: false,
                    isFeatured: false,
                    isPinFeatured: false,
                    isPinLatest: false,
                    isPinHero: false,
                    isUpComing: false,
                    isEmergingTech: false,
                    isHotTech: false,
                    isGadget: false,
                  });
                  setImagePreview(currentImagePreview);
                }}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="gap-2 bg-red-500 hover:bg-red-600 text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {isEditMode ? "Updating..." : "Saving..."}
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    {isEditMode ? "Update Article" : "Save Article"}
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ArticleForm;
