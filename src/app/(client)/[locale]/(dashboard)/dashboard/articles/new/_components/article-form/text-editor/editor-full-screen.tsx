"use client";
import type React from "react";
import EditorContent from "./editor-content";
import CustomToolBar from "./editor-custom-toolbar";
import EditorFooter from "./editor-footer";
import type { IFullScreenEditorProps } from "./interface/editor-interface";

const EditorFullScreen: React.FC<IFullScreenEditorProps> = ({
  charCount,
  wordCount,
  value,
  setIsFullscreen,
  isFullscreen,
  setViewMode,
  viewMode,
  latestValueRef,
  onChange,
  config,
}) => {
  return (
    <>
      {/* Fullscreen Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-[9998] " />

      {/* Fullscreen Editor */}
      <div className="fixed inset-4 z-[9999] bg-white dark:bg-gray-950 rounded-lg shadow-2xl flex flex-col overflow-auto">
        <style jsx global>{`
          /* Jodit Editor Styles - Fixed to prevent conflicts */
          .jodit-container {
            border: 1px solid #e5e7eb !important;
            background: #ffffff !important;
            border-radius: 0 !important;
          }

          .dark .jodit-container {
            border-color: #374151 !important;
            background: #111827 !important;
          }

          .jodit-toolbar {
            background: #f9fafb !important;
            border-bottom: 1px solid #e5e7eb !important;
            padding: 8px !important;
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
            min-height: 300px !important;
          }

          .dark .jodit-wysiwyg {
            background: #111827 !important;
            color: #f9fafb !important;
          }

          .jodit-status-bar {
            background: #f9fafb !important;
            border-top: 1px solid #e5e7eb !important;
            padding: 4px 8px !important;
          }

          .dark .jodit-status-bar {
            background: #1f2937 !important;
            border-color: #374151 !important;
            color: #f9fafb !important;
          }

          /* Fix toolbar button styles */
          .jodit-toolbar button,
          .jodit-toolbar .jodit-toolbar-button {
            color: #374151 !important;
            background: transparent !important;
            border: 1px solid transparent !important;
            border-radius: 4px !important;
            margin: 1px !important;
            padding: 4px 6px !important;
          }

          .dark .jodit-toolbar button,
          .dark .jodit-toolbar .jodit-toolbar-button {
            color: #f9fafb !important;
          }

          .jodit-toolbar button:hover,
          .jodit-toolbar .jodit-toolbar-button:hover {
            background: #e5e7eb !important;
            border-color: #d1d5db !important;
          }

          .dark .jodit-toolbar button:hover,
          .dark .jodit-toolbar .jodit-toolbar-button:hover {
            background: #374151 !important;
            border-color: #4b5563 !important;
          }

          .jodit-toolbar button.jodit-toolbar-button-active,
          .jodit-toolbar .jodit-toolbar-button.jodit-toolbar-button-active {
            background: #3b82f6 !important;
            color: #ffffff !important;
            border-color: #2563eb !important;
          }

          /* Fix dropdown and popup styles */
          .jodit-popup,
          .jodit-dialog {
            z-index: 10000 !important;
          }

          .jodit-popup .jodit-popup-content {
            background: #ffffff !important;
            border: 1px solid #e5e7eb !important;
            border-radius: 6px !important;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
          }

          .dark .jodit-popup .jodit-popup-content {
            background: #1f2937 !important;
            border-color: #374151 !important;
          }

          /* Fix color picker and formatting tools */
          .jodit-color-picker {
            background: #ffffff !important;
            border: 1px solid #e5e7eb !important;
          }

          .dark .jodit-color-picker {
            background: #1f2937 !important;
            border-color: #374151 !important;
          }

          /* Ensure text formatting is preserved */
          .jodit-wysiwyg h1,
          .jodit-wysiwyg h2,
          .jodit-wysiwyg h3,
          .jodit-wysiwyg h4,
          .jodit-wysiwyg h5,
          .jodit-wysiwyg h6 {
            font-weight: bold !important;
            margin: 0.5em 0 !important;
          }

          .jodit-wysiwyg h1 {
            font-size: 2em !important;
          }
          .jodit-wysiwyg h2 {
            font-size: 1.5em !important;
          }
          .jodit-wysiwyg h3 {
            font-size: 1.17em !important;
          }
          .jodit-wysiwyg h4 {
            font-size: 1em !important;
          }
          .jodit-wysiwyg h5 {
            font-size: 0.83em !important;
          }
          .jodit-wysiwyg h6 {
            font-size: 0.67em !important;
          }

          .jodit-wysiwyg strong,
          .jodit-wysiwyg b {
            font-weight: bold !important;
          }

          .jodit-wysiwyg em,
          .jodit-wysiwyg i {
            font-style: italic !important;
          }

          .jodit-wysiwyg u {
            text-decoration: underline !important;
          }

          .jodit-wysiwyg a {
            color: #3b82f6 !important;
            text-decoration: underline !important;
            cursor: pointer !important;
          }

          .jodit-wysiwyg a:hover {
            color: #2563eb !important;
          }

          .dark .jodit-wysiwyg a {
            color: #60a5fa !important;
          }

          .dark .jodit-wysiwyg a:hover {
            color: #93c5fd !important;
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
        <div className="flex-1 overflow-hidden">
          <EditorContent
            latestValueRef={latestValueRef}
            onChange={onChange}
            value={value}
            viewMode={viewMode}
            config={config}
            isFullscreen={isFullscreen}
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
