"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { status } from "http-status";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

// UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/toast";
import { Loader2, Save } from "lucide-react";

// API Hooks
import {
  useCreateArticleMutation,
  useUpdateArticleMutation,
} from "@/redux/api/article.api";

// Schema & Types
import { articleSchema } from "@/schama/validation-schema";

import ArticleTextInputs from "./article-content-form";
import ArticleMediaCategoryInputs from "./article-media-form";
import ArticleSettings from "./article-settings";
import { articleResetState } from "../../../_components/utils";
import { IArticle } from "@/app/(client)/[locale]/(public)/article/_interface/interface";
import { Article } from "@prisma/client";
import TextEditorWithPreview from "./text-editor";
import ArticleFormSkeleton from "../skeleton/article-form-skeleton";
import { Schema } from "zod";
import { useRouter } from "next/navigation";

interface ArticleFormProps {
  article?: Article;
  setIsEditOpen?: Dispatch<
    SetStateAction<{ state: boolean; article: any | null }>
  >;
}

const ArticleForm = ({ article, setIsEditOpen }: ArticleFormProps) => {
  const isEditMode = !!article?.id;
  const [imagePreview, setImagePreview] = useState<string | null>(
    article?.image || null
  );

  const [isMounted, setIsMounted] = useState(false);
  // API mutations
  const [createArticle, { isLoading: isCreating }] = useCreateArticleMutation();
  const [updateArticle, { isLoading: isUpdating }] = useUpdateArticleMutation();
  const isLoading = isCreating || isUpdating;

  const initialValues = useMemo(
    () => ({
      title: article?.title || "",
      excerpt: article?.excerpt || "",
      content: article?.content || "",
      image: "",
      categoryBaseId: article?.categoryBaseId || "",
      categoryId: article?.categoryId || "",
      isPublished: article?.isPublished || false,
      isFeatured: article?.isFeatured || false,
      isPinFeatured: article?.isPinFeatured || false,
      isPinLatest: article?.isPinLatest || false,
      isPinHero: article?.isPinHero || false,
      isUpComing: article?.isUpComing || false,
      isEmergingTech: article?.isEmergingTech || false,
      isHotTech: article?.isHotTech || false,
    }),
    [article]
  );

  // Initialize form with explicit default values for all boolean fields
  const form = useForm<Article>({
    resolver: zodResolver(articleSchema as Schema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <ArticleFormSkeleton />;
  }
  // Submit handler
  const onSubmit = async (values: Article) => {
    try {
      let response;

      if (isEditMode && article?.id) {
        // Compare current form values to initial values
        const getChangedFields = (
          current: Article,
          initial: typeof initialValues
        ): Partial<Article> => {
          const changed: Partial<Article> = {};
          for (const key in current) {
            const value = current[key as keyof Article];
            const initialValue = initial[key as keyof typeof initialValues];
            if (
              key === "image" ||
              JSON.stringify(value) !== JSON.stringify(initialValue)
            ) {
              (changed as any)[key] = value;
            }
          }
          return changed;
        };

        const changedFields = getChangedFields(values, initialValues);

        if (Object.keys(changedFields).length === 0) {
          toast({ title: "No changes", description: "Nothing to update." });
          return;
        }

        // Now build formData from only changed fields
        const formData = new FormData();
        const { image, ...payloadData } = changedFields;

        formData.append("payload", JSON.stringify(payloadData));

        if ((image as any) instanceof File) {
          formData.append("imgFile", image as any);
        }

        response = await updateArticle({ formData, id: article.id }).unwrap();
      } else {
        // For create, send all values
        const formData = new FormData();
        const { image, ...payloadData } = values;

        formData.append("payload", JSON.stringify(payloadData));
        if ((image as any) instanceof File) {
          formData.append("imgFile", image);
        }

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

        if (!isEditMode) {
          form.reset(articleResetState);
          setImagePreview(null);
        } else if (isEditMode && setIsEditOpen) {
          setIsEditOpen({ state: false, article: null });
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
                  <ArticleTextInputs form={form} />
                  <ArticleMediaCategoryInputs
                    form={form}
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview}
                  />
                </div>
                {/* Content */}
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <TextEditorWithPreview
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
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-8">
                <ArticleSettings form={form} />
              </TabsContent>
            </Tabs>

            {/* Submit Button */}
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset(articleResetState);
                  setImagePreview(null);
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
                  <span className="flex items-center gap-2">
                    {/* <Loader2 className="h-4 w-4 animate-spin" /> */}
                    {isEditMode ? "Updating..." : "Saving..."}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    {/* <Save className="h-4 w-4" /> */}
                    {isEditMode ? "Update Article" : "Save Article"}
                  </span>
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
