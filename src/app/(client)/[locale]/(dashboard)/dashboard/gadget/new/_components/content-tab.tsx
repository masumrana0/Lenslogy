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
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { GadgetFormData } from "@/schama/gadget-schema";
import { ImageUpload } from "./image-uploader";
import { MultiImageUpload } from "./multi-upload";
import TextEditorWithPreview from "../../../articles/new/_components/article-form/text-editor";

interface ContentTabProps {
  control: Control<GadgetFormData | any>;
  errors: FieldErrors<GadgetFormData | any>;
}

const ContentTab = ({ control, errors }: ContentTabProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="typeId">Gadget Type *</Label>
          <Controller
            name="typeId"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  className={errors.typeId ? "border-destructive" : ""}
                >
                  <SelectValue placeholder="Select gadget type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="smartphone">Smartphone</SelectItem>
                  <SelectItem value="laptop">Laptop</SelectItem>
                  <SelectItem value="tablet">Tablet</SelectItem>
                  <SelectItem value="smartwatch">Smartwatch</SelectItem>
                  <SelectItem value="headphones">Headphones</SelectItem>
                  <SelectItem value="camera">Camera</SelectItem>
                  <SelectItem value="gaming">Gaming</SelectItem>
                  <SelectItem value="wearable">Wearable</SelectItem>
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
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  className={errors.brandId ? "border-destructive" : ""}
                >
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="samsung">Samsung</SelectItem>
                  <SelectItem value="google">Google</SelectItem>
                  <SelectItem value="microsoft">Microsoft</SelectItem>
                  <SelectItem value="sony">Sony</SelectItem>
                  <SelectItem value="xiaomi">Xiaomi</SelectItem>
                  <SelectItem value="oneplus">OnePlus</SelectItem>
                  <SelectItem value="huawei">Huawei</SelectItem>
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
          <Label>Release Date</Label>
          <Controller
            name="releaseDate"
            control={control}
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? format(field.value, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value || undefined}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
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

      <div className="space-y-2">
        <Label>Main Image *</Label>
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <ImageUpload
              value={field.value}
              onChange={field.onChange}
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
              error={errors.images?.message as string}
            />
          )}
        />
      </div>
    </div>
  );
};

export default ContentTab;
