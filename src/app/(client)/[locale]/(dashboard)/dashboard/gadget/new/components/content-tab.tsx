"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Controller,
  type SetFieldValue,
  type Control,
  type FieldErrors,
} from "react-hook-form";
import type { GadgetFormData } from "@/schama/gadget-schema";
import ImageUpload from "./image-uploader";

import TextEditorWithPreview from "../../../articles/new/_components/article-form/text-editor";
import { useParams } from "next/navigation";
import { useGetAllGadgetTypeQuery } from "@/redux/api/gadgetType.api";
import { useGetAllBrandQuery } from "@/redux/api/brand.api";
import type { GadgetBrand, GadgetType } from "@prisma/client";
import DatePicker from "@/components/ui/DatePicker";
import MultiImageUpload from "./multi-uploader";
import { useState } from "react";

interface ContentTabProps {
  control: Control<GadgetFormData | any>;
  errors: FieldErrors<GadgetFormData | any>;
  setValue: SetFieldValue<GadgetFormData | any>;
  onRemoveExistingImage?: (imageUrl: string) => void;
  initialData?: any;
}

const ContentTab = ({
  control,
  errors,
  setValue,
  onRemoveExistingImage,
  initialData,
}: ContentTabProps) => {
  const { locale: lang } = useParams();
  const [removedImages, setRemovedImages] = useState<string[]>([]);

  const { data: typeData, isLoading: isTypeLoading } =
    useGetAllGadgetTypeQuery(lang);
  const { data: brandData, isLoading: isBrandLoading } =
    useGetAllBrandQuery(lang);
  const types =
    (typeData && "data" in typeData ? (typeData as any).data : []) || [];
  const brands =
    (brandData &&
    typeof brandData === "object" &&
    brandData !== null &&
    "data" in brandData
      ? (brandData as any).data
      : []) || [];

  // Get existing images, filtering out removed ones
  const existingImages = initialData?.images
    ? (initialData.images as string[]).filter(
        (img) => !removedImages.includes(img)
      )
    : [];

  const handleRemoveExistingImage = (imageUrl: string) => {
    setRemovedImages((prev) => [...prev, imageUrl]);
    if (onRemoveExistingImage) {
      onRemoveExistingImage(imageUrl);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="typeId">Gadget Type *</Label>
          <Controller
            name="typeId"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(value) => {
                  const selectedType = types.find(
                    (type: GadgetType) => type.id === value
                  );
                  setValue(
                    "typeBaseId",
                    selectedType ? selectedType.baseId : ""
                  );
                  field.onChange(value);
                }}
              >
                <SelectTrigger
                  className={errors.typeId ? "border-destructive" : ""}
                >
                  <SelectValue placeholder="Select gadget type" />
                </SelectTrigger>

                <SelectContent>
                  {isTypeLoading ? (
                    <SelectItem value="loading" disabled>
                      Loading Type...
                    </SelectItem>
                  ) : types.length > 0 ? (
                    types.map((type: GadgetType) => (
                      <SelectItem key={type.baseId} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="empty" disabled>
                      No types available
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            )}
          />

          {errors?.typeId && (
            <p className="text-sm text-destructive">
              {errors.typeId.message as string}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="brandId">Brand *</Label>
          <Controller
            name="brandId"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(value) => {
                  const selectedBrand = brands.find(
                    (brand: GadgetBrand) => brand.id === value
                  );
                  setValue(
                    "brandBaseId",
                    selectedBrand ? selectedBrand.baseId : ""
                  );
                  field.onChange(value);
                }}
              >
                <SelectTrigger
                  className={errors.brandId ? "border-destructive" : ""}
                >
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  {isBrandLoading ? (
                    <SelectItem value="loading" disabled>
                      Loading brands...
                    </SelectItem>
                  ) : brands.length > 0 ? (
                    brands.map((brand: GadgetBrand) => (
                      <SelectItem key={brand.baseId} value={brand.id}>
                        {brand.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="empty" disabled>
                      No brands available
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            )}
          />

          {errors.brandId && (
            <p className="text-sm text-destructive">
              {errors.brandId.message as string}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="model">Model *</Label>
          <Controller
            name="model"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter model name"
                className={errors.model ? "border-destructive" : ""}
              />
            )}
          />
          {errors?.model && (
            <p className="text-sm text-destructive">
              {errors.model.message as string}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Controller
            name="releaseDate"
            control={control}
            render={({ field, fieldState }) => (
              <DatePicker
                label="Release Date"
                value={field.value}
                onChange={field.onChange}
                placeholder="Select release date"
                error={fieldState.error?.message}
              />
            )}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Enter gadget title"
              className={errors.title ? "border-destructive" : ""}
            />
          )}
        />
        {errors.title && (
          <p className="text-sm text-destructive">
            {errors.title.message as string}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt *</Label>
        <Controller
          name="excerpt"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              placeholder="Brief description of the gadget"
              rows={3}
              className={errors.excerpt ? "border-destructive" : ""}
            />
          )}
        />
        {errors.excerpt && (
          <p className="text-sm text-destructive">
            {errors.excerpt.message as string}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Main Image *</Label>
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <ImageUpload
              value={field.value}
              onChange={field.onChange}
              existingImage={initialData?.image}
              error={errors.image?.message as string}
            />
          )}
        />
      </div>

      <div className="space-y-2">
        <Label>Other Images</Label>
        <Controller
          name="images"
          control={control}
          render={({ field }) => (
            <MultiImageUpload
              value={field.value}
              onChange={field.onChange}
              onRemoveExisting={handleRemoveExistingImage}
              existingImages={existingImages}
              error={errors.images?.message as string}
            />
          )}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content *</Label>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <TextEditorWithPreview
              value={field.value}
              onChange={field.onChange}
              placeholder="Write your gadget content..."
              className="min-h-[500px]"
            />
          )}
        />
        {errors.content && (
          <p className="text-sm text-destructive">
            {errors.content.message as string}
          </p>
        )}
      </div>
    </div>
  );
};

export default ContentTab;
