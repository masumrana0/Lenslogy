"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import type React from "react";
import { useEffect, useState, useCallback } from "react";
import RenderPreview from "./render-preview";
import type { IEditorContentProps } from "./interface/editor-interface";
import { Skeleton } from "@/components/ui/skeleton";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
  loading: () => <Skeleton className="h-64 w-full" />,
});

const EditorContent: React.FC<IEditorContentProps> = ({
  onChange,
  value,
  viewMode,
  config,
  latestValueRef,
  isFullscreen,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Enhanced change handler to preserve formatting
  const handleEditorChange = useCallback(
    (newValue: string) => {
      latestValueRef.current = newValue;
      onChange(newValue);
    },
    [onChange, latestValueRef]
  );

  if (!isMounted) {
    return <Skeleton className="h-64 w-full" />;
  }

  return (
    <div
      className={cn(
        "relative h-full",
        viewMode === "split" && "grid grid-cols-2"
      )}
    >
      {/* Editor */}
      {(viewMode === "edit" || viewMode === "split") && (
        <div
          className={cn(
            "h-full",
            viewMode === "split" &&
              "border-r border-gray-200 dark:border-gray-700"
          )}
        >
          <JoditEditor
            value={value}
            onChange={handleEditorChange}
            onBlur={handleEditorChange}
            config={config as any}
          />
        </div>
      )}

      {/* Preview */}
      {(viewMode === "preview" || viewMode === "split") && (
        <div
          className={cn(
            "h-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900",
            viewMode === "preview" && "rounded-lg",
            viewMode === "split" && "rounded-r-lg border-l-0",
            "overflow-auto"
          )}
        >
          <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Preview
            </h3>
          </div>
          <RenderPreview
            content={value}
            isFullscreen={isFullscreen}
            viewMode={viewMode}
          />
        </div>
      )}
    </div>
  );
};

export default EditorContent;
