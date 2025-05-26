"use client";
import React from "react";
import { IEditorFooterProps } from "./interface/editor-interface";

const EditorFooter: React.FC<IEditorFooterProps> = ({
  viewMode,
  charCount,
  wordCount,
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-2 text-xs text-gray-500 dark:text-gray-400 border border-t-0 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-b-lg">
      <div className="flex items-center gap-4">
        <span>Mode: {viewMode}</span>
        <span>{charCount} characters</span>
        <span>{wordCount} words</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        <span>Auto-saved</span>
      </div>
    </div>
  );
};

export default EditorFooter;
