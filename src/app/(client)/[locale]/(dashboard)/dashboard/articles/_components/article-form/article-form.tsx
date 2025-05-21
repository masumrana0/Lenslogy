"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { status } from "http-status";
import { useState } from "react";
import { useForm } from "react-hook-form";

// UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/toast";
import { Loader2, Save } from "lucide-react";

// API Hooks
import {
  useCreateArticleMutation,
  useUpdateArticleMutation,
} from "@/redux/api/article.api";

// Schema & Types
import { articleSchema } from "@/schama";
import type { Article } from "@prisma/client";
import ArticleTextInputs from "./article-content-form";
import ArticleMediaCategoryInputs from "./article-media-form";
import ArticleSettings from "./article-settings";
import { articleResetState } from "../utils";

interface ArticleFormProps {
  article?: Partial<Article>;
  onSuccess?: (article: Article) => void;
}

const ArticleForm = ({ article, onSuccess }: ArticleFormProps) => {
  const isEditMode = !!article?.id;

  const [imagePreview, setImagePreview] = useState<string | null>(
    article?.image || null
  );

  // API mutations
  const [createArticle, { isLoading: isCreating }] = useCreateArticleMutation();
  const [updateArticle, { isLoading: isUpdating }] = useUpdateArticleMutation();
  const isLoading = isCreating || isUpdating;

  // Initialize form with explicit default values for all boolean fields
  const form = useForm<Article>({
    resolver: zodResolver(articleSchema) as any,
    defaultValues: {
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
    },
  });

  // Submit handler
  const onSubmit = async (values: Article) => {
    try {
      const formData = new FormData();
      const { image, ...payloadData } = values;

      formData.append("payload", JSON.stringify(payloadData));

      if ((image as any) instanceof File) {
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
          form.reset(articleResetState);
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
                  <ArticleTextInputs form={form} />
                  <ArticleMediaCategoryInputs
                    form={form}
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview}
                  />
                </div>
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
