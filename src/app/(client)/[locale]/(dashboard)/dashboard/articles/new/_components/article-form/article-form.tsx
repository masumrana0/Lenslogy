"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  useCreateArticleMutation,
  useUpdateArticleMutation,
} from "@/redux/api/article.api";
import { articleResetState } from "../../../_utils/utils";
import ArticleTextInputs from "./article-content-form";
import ArticleMediaCategoryInputs from "./article-media-form";
import ArticleSettings from "./article-settings";
import TextEditorWithPreview from "./text-editor";
import type { Article } from "@prisma/client";
import { useEffect, useMemo, useState } from "react";
import { status } from "http-status";
import ArticleFormSkeleton from "../skeleton/article-form-skeleton";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IArticleFormProps } from "../../../_interface/article.interface";
import {
  articleCreateSchema,
  articleEditSchema,
} from "@/schama/article-schema";

const ArticleForm = ({
  article,
  setIsEditOpen,
  mode = "create",
}: IArticleFormProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(
    article?.image || null
  );
  const [isMounted, setIsMounted] = useState(false);

  const isUpdate = mode === "update";
  const isCreate = mode === "create";

  // Prepare initial values
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

  const validationSchema = isUpdate ? articleEditSchema : articleCreateSchema;

  const form = useForm<Article>({
    resolver: zodResolver(validationSchema as any),
    defaultValues: initialValues,
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isDirty },
    reset,
    setValue,
  } = form;

  // API mutations
  const [createArticle, { isLoading: isCreating }] = useCreateArticleMutation();
  const [updateArticle, { isLoading: isUpdating }] = useUpdateArticleMutation();
  const isLoading = isCreating || isUpdating;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <ArticleFormSkeleton />;
  }

  const handleResetAndCancel = () => {
    if (isCreate) {
      reset(articleResetState);
      setImagePreview(null);
    } else if (isUpdate && setIsEditOpen) {
      setIsEditOpen({ state: false, article: null });
    }
  };

  const onFormSubmit = async (values: Article) => {
    try {
      let response;

      if (isUpdate && article?.id) {
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
          toast.info("No changes detected");
          return;
        }

        // Build formData from only changed fields
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
        toast.success(
          isUpdate
            ? "Article updated successfully!"
            : "Article created successfully!"
        );

        if (isCreate) {
          reset(articleResetState);
          setImagePreview(null);
        } else if (isUpdate && setIsEditOpen) {
          setIsEditOpen({ state: false, article: null });
        }
      }
    } catch (error: any) {
      const message =
        error.data?.message || `Failed to ${mode} article. Please try again.`;
      toast.error(message);
    }
  };

  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">
                {isUpdate ? "Update Article" : "Create New Article"}
              </CardTitle>
              <CardDescription>
                {isUpdate
                  ? "Update the article details below"
                  : "Fill in the details to create a new article entry"}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge variant={isUpdate ? "secondary" : "default"}>
                {isUpdate ? "Update Mode" : "Create Mode"}
              </Badge>
              {isUpdate && isDirty && (
                <Badge variant="outline" className="text-orange-600">
                  Changes detected
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <FormProvider {...form}>
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger
                    value="content"
                    className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
                  >
                    Content
                  </TabsTrigger>
                  <TabsTrigger
                    value="settings"
                    className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
                  >
                    Settings
                  </TabsTrigger>
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

                  {/* Content Editor */}
                  <FormField
                    control={control}
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
                <TabsContent value="settings">
                  <ArticleSettings form={form} />
                </TabsContent>
              </Tabs>

              <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleResetAndCancel}
                >
                  {isUpdate ? "Cancel" : "Clear"}
                </Button>
                <Button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 text-white"
                  disabled={isSubmitting || isLoading}
                >
                  {isSubmitting || isLoading
                    ? isUpdate
                      ? "Updating..."
                      : "Creating..."
                    : isUpdate
                    ? "Update Article"
                    : "Create Article"}
                </Button>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArticleForm;
