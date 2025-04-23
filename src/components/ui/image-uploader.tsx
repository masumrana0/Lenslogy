"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  onImageUpload: (data: {
    file: File | null;
    previewUrl: string | null;
  }) => void;
  defaultImage?: string;
  className?: string;
}

export function ImageUploader({
  onImageUpload,
  defaultImage,
  className,
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    defaultImage || null
  );
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewObjectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewObjectUrlRef.current) {
        URL.revokeObjectURL(previewObjectUrlRef.current);
      }
    };
  }, []);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const objectUrl = URL.createObjectURL(file);
      if (previewObjectUrlRef.current) {
        URL.revokeObjectURL(previewObjectUrlRef.current);
      }
      previewObjectUrlRef.current = objectUrl;
      setPreviewUrl(objectUrl);
      onImageUpload({ file, previewUrl: objectUrl });
    } catch (err) {
      console.error("Upload error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to upload image. Please try again."
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    if (previewObjectUrlRef.current) {
      URL.revokeObjectURL(previewObjectUrlRef.current);
      previewObjectUrlRef.current = null;
    }
    setPreviewUrl(null);
    onImageUpload({ file: null, previewUrl: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        id="image-upload"
      />

      {!previewUrl ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center h-[200px] transition-colors",
            isDragging
              ? "border-[#ff005b] bg-red-50"
              : "border-muted-foreground/25 hover:border-[#ff005b]/50",
            "cursor-pointer"
          )}
          onClick={() => fileInputRef.current?.click()}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-10 w-10 text-[#ff005b] animate-spin" />
              <p className="text-sm text-muted-foreground">
                Uploading image...
              </p>
            </div>
          ) : (
            <>
              <div className="rounded-full bg-red-50 p-3 mb-3">
                <Upload className="h-6 w-6 text-[#ff005b]" />
              </div>
              <p className="text-sm font-medium mb-1">
                Drag and drop your image here
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                PNG, JPG, GIF up to 10MB
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="border-[#ff005b] text-[#ff005b] hover:bg-red-50"
              >
                Select Image
              </Button>
            </>
          )}
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden border border-border h-[200px] group">
          <Image
            src={previewUrl || "/placeholder.svg"}
            alt="Preview"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              variant="destructive"
              size="icon"
              className="rounded-full bg-[#ff005b] hover:bg-[#ff3380]"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveImage();
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {error && <p className="text-[#ff005b] text-sm mt-2">{error}</p>}
    </div>
  );
}
