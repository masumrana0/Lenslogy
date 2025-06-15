"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface MultiImageUploadProps {
  value?: FileList | string[];
  onChange: (files: FileList | undefined) => void;
  onRemoveExisting?: (imageUrl: string) => void;
  existingImages?: string[];
  maxImages?: number;
  className?: string;
  disabled?: boolean;
  error?: string;
}

function MultiImageUpload({
  value,
  onChange,
  onRemoveExisting,
  existingImages = [],
  maxImages = 5,
  className,
  disabled,
  error,
}: MultiImageUploadProps) {
  const [newFilePreviews, setNewFilePreviews] = useState<
    Array<{ file: File; preview: string }>
  >([]);

  // Update new file previews when value changes
  useEffect(() => {
    if (value && value instanceof FileList && value.length > 0) {
      const previews: Array<{ file: File; preview: string }> = [];
      let loadedCount = 0;

      Array.from(value).forEach((file, index) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          previews[index] = {
            file,
            preview: reader.result as string,
          };
          loadedCount++;

          if (loadedCount === value.length) {
            setNewFilePreviews(previews);
          }
        };
        reader.readAsDataURL(file);
      });
    } else {
      setNewFilePreviews([]);
    }
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const dt = new DataTransfer();

      // Add existing new files
      if (value && value instanceof FileList) {
        Array.from(value).forEach((file) => dt.items.add(file));
      }

      // Add new files (up to maxImages limit)
      const totalCount = existingImages.length + dt.files.length;
      Array.from(files).forEach((file) => {
        if (totalCount + dt.files.length < maxImages) {
          dt.items.add(file);
        }
      });

      onChange(dt.files);
    }

    // Reset the input value
    e.target.value = "";
  };

  const handleRemoveNewFile = (indexToRemove: number) => {
    if (!value || !(value instanceof FileList)) return;

    const dt = new DataTransfer();
    Array.from(value).forEach((file, index) => {
      if (index !== indexToRemove) {
        dt.items.add(file);
      }
    });

    onChange(dt.files.length > 0 ? dt.files : undefined);
  };

  const handleRemoveExisting = (imageUrl: string) => {
    if (onRemoveExisting) {
      onRemoveExisting(imageUrl);
    }
  };

  const totalCount = existingImages.length + newFilePreviews.length;

  return (
    <div className={cn("space-y-4", className)}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Existing images */}
        {existingImages.map((imageUrl, index) => (
          <div
            key={`existing-${index}`}
            className="relative rounded-lg overflow-hidden border"
          >
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={`Existing ${index + 1}`}
              className="w-full h-24 object-cover"
            />
            {!disabled && (
              <Button
                type="button"
                size="icon"
                variant="destructive"
                className="absolute top-1 right-1 h-6 w-6 rounded-full"
                onClick={() => handleRemoveExisting(imageUrl)}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
            <div className="absolute bottom-1 left-1">
              <span className="text-xs bg-blue-500 text-white px-1 rounded">
                Existing
              </span>
            </div>
          </div>
        ))}

        {/* New uploaded images */}
        {newFilePreviews.map((item, index) => (
          <div
            key={`new-${index}`}
            className="relative rounded-lg overflow-hidden border"
          >
            <img
              src={item.preview || "/placeholder.svg"}
              alt={`New ${index + 1}`}
              className="w-full h-24 object-cover"
            />
            {!disabled && (
              <Button
                type="button"
                size="icon"
                variant="destructive"
                className="absolute top-1 right-1 h-6 w-6 rounded-full"
                onClick={() => handleRemoveNewFile(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
            <div className="absolute bottom-1 left-1">
              <span className="text-xs bg-green-500 text-white px-1 rounded">
                New
              </span>
            </div>
          </div>
        ))}

        {/* Add new image button */}
        {totalCount < maxImages && !disabled && (
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
          {totalCount} of {maxImages} images added
        </p>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    </div>
  );
}

export default MultiImageUpload;
