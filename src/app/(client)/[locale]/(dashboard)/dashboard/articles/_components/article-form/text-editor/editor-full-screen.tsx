"use client";
import React from "react";
import EditorContent from "./editor-content";
import CustomToolBar from "./editor-custom-toolbar";
import EditorFooter from "./editor-footer";
import { IFullScreenEditorProps } from "./interface/editor-interface";

const EditorFullScreen: React.FC<IFullScreenEditorProps> = ({
  charCount,
  wordCount,
  value,
  setIsFullscreen,
  setViewMode,
  viewMode,
  latestValueRef,
  onChange,
  config,
}) => {
  return (
    <>
      {/* Fullscreen Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-[9998]" />

      {/* Fullscreen Editor */}
      <div className="fixed inset-4 z-[9999] bg-white dark:bg-gray-950 rounded-lg shadow-2xl flex flex-col">
        <style jsx global>{`
          /* Jodit Editor Styles */
          .jodit-container {
            border: 1px solid #e5e7eb !important;
            background: #ffffff !important;
          }

          .dark .jodit-container {
            border-color: #374151 !important;
            background: #111827 !important;
          }

          .jodit-toolbar {
            background: #f9fafb !important;
            border-bottom: 1px solid #e5e7eb !important;
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
          }

          .dark .jodit-status-bar {
            background: #1f2937 !important;
            border-color: #374151 !important;
            color: #f9fafb !important;
          }

          .jodit-toolbar button {
            color: #374151 !important;
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
        `}</style>

        {/* Editor Content */}

        {/* Custom Toolbar */}
        <CustomToolBar
          charCount={charCount}
          wordCount={wordCount}
          isFullscreen
          setIsFullscreen={setIsFullscreen}
          setViewMode={setViewMode}
          viewMode={viewMode}
        />
        {/* Editor Content */}
        <div className="flex-1 overflow-hidden">
          <EditorContent
            latestValueRef={latestValueRef}
            onChange={onChange}
            value={value}
            viewMode={viewMode}
            config={config}
          />
        </div>

        {/* Status Bar */}
        <EditorFooter
          charCount={charCount}
          viewMode={viewMode}
          wordCount={wordCount}
        />
      </div>
    </>
  );
};

export default EditorFullScreen;
