"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value?: FileList | string;
  onChange: (files: FileList | undefined) => void;
  existingImage?: string;
  className?: string;
  disabled?: boolean;
  error?: string;
}

function ImageUpload({
  value,
  onChange,
  existingImage,
  className,
  disabled,
  error,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hasNewFile, setHasNewFile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update preview when value changes
  useEffect(() => {
    if (value) {
      if (typeof value === "string") {
        // Existing image URL
        setPreview(value);
        setHasNewFile(false);
      } else if (value instanceof FileList && value.length > 0) {
        // New file upload
        const file = value[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
          setHasNewFile(true);
        };
        reader.readAsDataURL(file);
      }
    } else if (existingImage) {
      // Show existing image if no new value
      setPreview(existingImage);
      setHasNewFile(false);
    } else {
      setPreview(null);
      setHasNewFile(false);
    }
  }, [value, existingImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onChange(files);
    }
  };

  const handleRemoveImage = () => {
    setPreview(existingImage || null);
    setHasNewFile(false);
    onChange(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleButtonClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (disabled) return;

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const dt = new DataTransfer();
      dt.items.add(files[0]);
      onChange(dt.files);
    }
  };

  return (
    <div className={cn("relative", className)}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        disabled={disabled}
      />

      {!preview ? (
        <div
          onClick={handleButtonClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 transition-colors min-h-[200px]",
            isDragging
              ? "border-red-500 bg-red-50 dark:bg-red-950/20"
              : "border-border hover:border-red-500",
            disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
            error ? "border-destructive" : ""
          )}
        >
          <Upload className="h-10 w-10 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground text-center">
            {isDragging
              ? "Drop image here"
              : "Click to upload or drag and drop"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            PNG, JPG, WEBP up to 5MB
          </p>
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden border">
          <img
            src={preview || "/placeholder.svg"}
            alt="Preview"
            className="w-full h-48 object-cover"
            onError={() => {
              setPreview(null);
              onChange(undefined);
            }}
          />
          {!disabled && (
            <>
              <Button
                type="button"
                size="icon"
                variant="destructive"
                className="absolute top-2 right-2 h-8 w-8 rounded-full"
                onClick={handleRemoveImage}
              >
                <X className="h-4 w-4" />
              </Button>
              {!hasNewFile && (
                <div className="absolute bottom-2 left-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={handleButtonClick}
                    className="text-xs"
                  >
                    Change Image
                  </Button>
                </div>
              )}
              {hasNewFile && (
                <div className="absolute bottom-2 left-2">
                  <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">
                    New Image
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {error && <p className="text-sm text-destructive mt-1">{error}</p>}
    </div>
  );
}

export default ImageUpload;
