"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface MultiImageUploadProps {
  value?: FileList;
  onChange: (files: FileList | undefined) => void;
  maxImages?: number;
  className?: string;
  disabled?: boolean;
  error?: string;
}

export function MultiImageUpload({
  value,
  onChange,
  maxImages = 5,
  className,
  disabled,
  error,
}: MultiImageUploadProps) {
  const [previews, setPreviews] = useState<
    Array<{ file: File; preview: string }>
  >([]);

  // Update previews when value changes
  useEffect(() => {
    if (value && value.length > 0) {
      const newPreviews: Array<{ file: File; preview: string }> = [];
      let loadedCount = 0;

      Array.from(value).forEach((file, index) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews[index] = {
            file,
            preview: reader.result as string,
          };
          loadedCount++;

          if (loadedCount === value.length) {
            setPreviews(newPreviews);
          }
        };
        reader.readAsDataURL(file);
      });
    } else {
      setPreviews([]);
    }
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const dt = new DataTransfer();

      // Add existing files
      if (value) {
        Array.from(value).forEach((file) => dt.items.add(file));
      }

      // Add new files (up to maxImages limit)
      Array.from(files).forEach((file) => {
        if (dt.files.length < maxImages) {
          dt.items.add(file);
        }
      });

      onChange(dt.files);
    }

    // Reset the input value
    e.target.value = "";
  };

  const handleRemoveImage = (indexToRemove: number) => {
    if (!value) return;

    const dt = new DataTransfer();
    Array.from(value).forEach((file, index) => {
      if (index !== indexToRemove) {
        dt.items.add(file);
      }
    });

    onChange(dt.files.length > 0 ? dt.files : undefined);
  };

  const currentCount = value ? value.length : 0;

  return (
    <div className={cn("space-y-4", className)}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Uploaded images */}
        {previews.map((item, index) => (
          <div
            key={index}
            className="relative rounded-lg overflow-hidden border"
          >
            <img
              src={item.preview || "/placeholder.svg"}
              alt={`Preview ${index + 1}`}
              className="w-full h-24 object-cover"
            />
            {!disabled && (
              <Button
                type="button"
                size="icon"
                variant="destructive"
                className="absolute top-1 right-1 h-6 w-6 rounded-full"
                onClick={() => handleRemoveImage(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        ))}

        {/* Add new image button */}
        {currentCount < maxImages && !disabled && (
          <label
            className={cn(
              "flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 cursor-pointer transition-colors h-24",
              "hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
            )}
          >
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
              multiple
              disabled={disabled}
            />
            <Plus className="h-6 w-6 text-muted-foreground mb-1" />
            <p className="text-xs text-muted-foreground text-center">
              Add Image
            </p>
          </label>
        )}
      </div>

      <div className="flex justify-between items-center">
        <p className="text-xs text-muted-foreground">
          {currentCount} of {maxImages} images added
        </p>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    </div>
  );
}
