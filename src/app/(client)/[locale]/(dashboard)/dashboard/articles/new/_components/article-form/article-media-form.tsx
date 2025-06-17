"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import type { UseFormReturn } from "react-hook-form";
import type { Article, Category } from "@prisma/client";
import { ImageUploader } from "@/components/ui/image-uploader";
import { useGetAllCategoriesQuery } from "@/redux/api/category.api";
import { useParams } from "next/navigation";

type Props = {
  form: UseFormReturn<Article>;
  imagePreview: string | null;
  setImagePreview: (preview: string | null) => void;
};

const ArticleMediaCategoryInputs = ({
  form,
  imagePreview,
  setImagePreview,
}: Props) => {
  const params = useParams();
  const lang = params?.locale as string;

  const { data, isLoading: isCategoryLoading } = useGetAllCategoriesQuery(lang);
  const categories = data?.data || [];

  return (
    <div className="space-y-8">
      {/* Image Upload */}
      <FormField
        control={form.control}
        name="image"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
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
        render={({ field, fieldState: { error } }) => (
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
                } else {
                  form.setValue("categoryId", "");
                }
              }}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger className={error ? "border-red-500" : ""}>
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
  );
};

export default ArticleMediaCategoryInputs;
