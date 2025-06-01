"use client";
import React from "react";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Edit, Eye, Columns, Minimize2, Maximize2 } from "lucide-react";
import { ICustomToolBarProps } from "./interface/editor-interface";

const CustomToolBar: React.FC<ICustomToolBarProps> = ({
  viewMode,
  setViewMode,
  isFullscreen,
  setIsFullscreen,
  charCount,
  wordCount,
}) => {
  return (
    <div className="flex items-center gap-1 p-3 border border-b-0 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-t-lg">
      {/* View Mode Toggle */}
      <div className="flex items-center gap-1 mr-3">
        <Toggle
          pressed={viewMode === "edit"}
          onPressedChange={() => setViewMode("edit")}
          size="sm"
          className="data-[state=on]:bg-blue-100 dark:data-[state=on]:bg-blue-900 data-[state=on]:text-blue-700 dark:data-[state=on]:text-blue-300"
          type="button"
        >
          <Edit className="w-4 h-4 mr-1" />
          Edit
        </Toggle>
        <Toggle
          pressed={viewMode === "preview"}
          onPressedChange={() => setViewMode("preview")}
          size="sm"
          className="data-[state=on]:bg-blue-100 dark:data-[state=on]:bg-blue-900 data-[state=on]:text-blue-700 dark:data-[state=on]:text-blue-300"
          type="button"
        >
          <Eye className="w-4 h-4 mr-1" />
          Preview
        </Toggle>
        <Toggle
          pressed={viewMode === "split"}
          onPressedChange={() => setViewMode("split")}
          size="sm"
          className="data-[state=on]:bg-blue-100 dark:data-[state=on]:bg-blue-900 data-[state=on]:text-blue-700 dark:data-[state=on]:text-blue-300"
          type="button"
        >
          <Columns className="w-4 h-4 mr-1" />
          Split
        </Toggle>
      </div>

      <Separator orientation="vertical" className="h-6" />

      {/* Fullscreen Toggle */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => setIsFullscreen(!isFullscreen)}
        className="h-8 w-8 p-0 hover:bg-gray-200 dark:hover:bg-gray-700"
        title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
      >
        {isFullscreen ? (
          <Minimize2 className="w-4 h-4" />
        ) : (
          <Maximize2 className="w-4 h-4" />
        )}
      </Button>

      <div className="flex-1" />

      {/* Word Count */}
      <div className="text-xs text-gray-500 dark:text-gray-400">
        {charCount} chars, {wordCount} words
      </div>
    </div>
  );
};

export default CustomToolBar;
