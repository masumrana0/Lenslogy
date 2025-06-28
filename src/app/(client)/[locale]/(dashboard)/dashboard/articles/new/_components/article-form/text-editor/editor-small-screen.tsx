"use client";
import { cn } from "@/lib/utils";
import React from "react";
import EditorContent from "./editor-content";
import CustomToolBar from "./editor-custom-toolbar";
import EditorFooter from "./editor-footer";
import { ISmallScreenEditorProps } from "./interface/editor-interface";

const EditorSmallScreenView: React.FC<ISmallScreenEditorProps> = ({
  charCount,
  wordCount,
  className,
  value,
  viewMode,
  setViewMode,
  latestValueRef,
  onChange,
  config,
  setIsFullscreen,
  isFullscreen,
}) => {
  return (
    <div className={cn("jodit-editor-wrapper  overflow-auto", className)}>
      <style jsx global>{`
        /* Jodit Editor Styles */
        .jodit-container {
          border: 1px solid #e5e7eb !important;
          background: #ffffff !important;
          border-radius: ${viewMode === "split"
            ? "0.5rem 0 0 0"
            : "0.5rem"} !important;
        }

        .dark .jodit-container {
          border-color: #374151 !important;
          background: #111827 !important;
        }

        .jodit-toolbar {
          background: #f9fafb !important;
          border-bottom: 1px solid #e5e7eb !important;
          border-radius: ${viewMode === "split"
            ? "0.5rem 0 0 0"
            : "0.5rem 0.5rem 0 0"} !important;
        }

        .dark .jodit-toolbar {
          background: #1f2937 !important;
          border-color: #374151 !important;
        }

        .jodit-wysiwyg {
          background: #ffffff !important;
          color: #111827 !important;
          padding: 1rem !important;
          font-family: ui-sans-serif, system-ui, -apple-system,
            BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
            "Noto Sans", sans-serif !important;
          line-height: 1.6 !important;
        }

        .dark .jodit-wysiwyg {
          background: #111827 !important;
          color: #f9fafb !important;
        }

        .jodit-status-bar {
          background: #f9fafb !important;
          border-top: 1px solid #e5e7eb !important;
          border-radius: ${viewMode === "split"
            ? "0 0 0 0.5rem"
            : "0 0 0.5rem 0.5rem"} !important;
        }

        .dark .jodit-status-bar {
          background: #1f2937 !important;
          border-color: #374151 !important;
          color: #f9fafb !important;
        }

        .jodit-toolbar button {
          color: #374151 !important;
          type: button !important;
        }

        .dark .jodit-toolbar button {
          color: #f9fafb !important;
        }

        .jodit-toolbar button:hover {
          background: #e5e7eb !important;
        }

        .dark .jodit-toolbar button:hover {
          background: #374151 !important;
        }

        .jodit-toolbar button.jodit-toolbar-button-active {
          background: #3b82f6 !important;
          color: #ffffff !important;
        }

        /* Table styling */
        .jodit-wysiwyg table {
          border-collapse: collapse !important;
          width: 100% !important;
          margin: 1rem 0 !important;
        }

        .jodit-wysiwyg table td,
        .jodit-wysiwyg table th {
          border: 1px solid #d1d5db !important;
          padding: 0.75rem !important;
          text-align: left !important;
        }

        .dark .jodit-wysiwyg table td,
        .dark .jodit-wysiwyg table th {
          border-color: #4b5563 !important;
        }

        .jodit-wysiwyg table th {
          background-color: #f9fafb !important;
          font-weight: 600 !important;
        }

        .dark .jodit-wysiwyg table th {
          background-color: #374151 !important;
        }

        /* Text formatting */
        .jodit-wysiwyg strong {
          font-weight: 600 !important;
        }

        .jodit-wysiwyg em {
          font-style: italic !important;
        }

        .jodit-wysiwyg u {
          text-decoration: underline !important;
        }

        .jodit-wysiwyg s {
          text-decoration: line-through !important;
        }

        /* Lists */
        .jodit-wysiwyg ul {
          list-style-type: disc !important;
          padding-left: 1.5rem !important;
        }

        .jodit-wysiwyg ol {
          list-style-type: decimal !important;
          padding-left: 1.5rem !important;
        }

        .jodit-wysiwyg li {
          margin: 0.25rem 0 !important;
        }
      `}</style>

      {/* Custom Toolbar */}
      <CustomToolBar
        charCount={charCount}
        wordCount={wordCount}
        isFullscreen={isFullscreen}
        setIsFullscreen={setIsFullscreen}
        setViewMode={setViewMode}
        viewMode={viewMode}
      />

      {/* Editor Content */}
      <EditorContent
        latestValueRef={latestValueRef}
        onChange={onChange}
        value={value}
        viewMode={viewMode}
        config={config}
        isFullscreen={isFullscreen}
      />

      {/* Status Bar */}
      <EditorFooter
        charCount={charCount}
        viewMode={viewMode}
        wordCount={wordCount}
      />
    </div>
  );
};

export default EditorSmallScreenView;
