"use client";
// React and Next.js
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

// Validation
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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

// Icons
import { Loader2, Save } from "lucide-react";

// Custom Components
import { RichTextEditor } from "./editor";

// API Hooks
import { useGetAllCategoriesQuery } from "@/redux/api/category.api";
import { useCreateArticleMutation } from "@/redux/api/article.api";

// Schema & Types
import { articleSchema } from "@/schama";
import { Article, Category } from "@prisma/client";
import { articleBooleanFields } from "./utils";
import status from "http-status";

// Form Schema Type
type FormValues = z.infer<typeof articleSchema>;

// Article Form Component
const ArticleForm = ({ article }: { article?: Partial<Article> }) => {
  const params = useParams();
  const lang = params?.locale;

  // Fetch categories
  const { data, isLoading: isCategoryLoading } = useGetAllCategoriesQuery(lang);
  const categories = data?.data || [];

  // Create article mutation
  const [createArticle, { isLoading }] = useCreateArticleMutation();

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(articleSchema as any),
    defaultValues: {
      title: article?.title || "",
      excerpt: article?.excerpt || "",
      content: article?.content || "",
      categoryId: article?.categoryId || "",
      isFeatured: article?.isFeatured || false,
      isPinFeatured: article?.isPinFeatured || false,
      isPinLatest: article?.isPinLatest || false,
      isPublished: article?.isPublished || false,
      isPinHero: article?.isPinHero || false,
      isUpComing: article?.isUpComing || false,
      isEmergingTech: article?.isEmergingTech || false,
      isHotTech: article?.isHotTech || false,
      isGadget: article?.isGadget || false,
    },
  });

  // Submit handler
  const onSubmit = async (values: FormValues) => {
    try {
      const { image, ...payload } = values;

      const formData = new FormData();
      formData.append("payload", JSON.stringify(payload));
      if (image) formData.append("imgFile", image);

      const res = await createArticle(formData).unwrap();
      if (res?.statusCode === status.CREATED) {
        toast({
          title: "Success",
          description: "Article Created successfully",
        });
      }

      form.reset();
    } catch (error: any) {
      const message = error.data.message || "Failed to Create article";

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
          {article ? "Edit Article" : "Create New Article"}
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
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Featured Image</FormLabel>
                          <FormControl>
                            <ImageUploader
                              onImageUpload={({ file }) => field.onChange(file)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Category Dropdown */}
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
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {!isCategoryLoading &&
                                categories.map((cat: Category) => (
                                  <SelectItem key={cat.id} value={cat.id}>
                                    {cat.name}
                                  </SelectItem>
                                ))}
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
                        <FormItem className="flex flex-row items-start p-4 border rounded-md">
                          <FormControl>
                            <Checkbox
                              checked={field.value as boolean}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="ml-3 space-y-1">
                            <FormLabel>{label}</FormLabel>
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
                type="submit"
                disabled={isLoading}
                className="gap-2 bg-red-500 hover:bg-red-600 text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Article
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
