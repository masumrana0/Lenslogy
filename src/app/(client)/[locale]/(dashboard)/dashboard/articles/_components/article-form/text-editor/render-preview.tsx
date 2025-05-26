import React from "react";
import { cn } from "@/lib/utils";

interface RenderPreviewProps {
  content: string;
  isFullscreen: boolean;
  viewMode: "edit" | "preview" | "split";
}

const RenderPreview: React.FC<RenderPreviewProps> = ({
  content,
  isFullscreen,
  viewMode,
}) => {
  // If content is empty, show placeholder
  if (!content || content.trim() === "") {
    return (
      <div
        className={cn(
          "flex items-center justify-center text-gray-500 dark:text-gray-400 italic",
          isFullscreen
            ? "min-h-[calc(100vh-250px)]"
            : viewMode === "split"
            ? "min-h-[350px]"
            : "min-h-[400px]"
        )}
      >
        Nothing to preview yet...
      </div>
    );
  }

  return (
    <div
      className={cn(
        "p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-auto",
        "prose prose-sm max-w-none",
        isFullscreen
          ? "min-h-[calc(100vh-250px)]"
          : viewMode === "split"
          ? "min-h-[350px]"
          : "min-h-[400px]"
      )}
    >
      <style jsx>{`
        /* Headings */
        :global(.preview-content h1) {
          font-size: 2rem;
          font-weight: 700;
          margin: 1.5rem 0 1rem 0;
          color: inherit;
          line-height: 1.2;
        }

        :global(.preview-content h1:first-child) {
          margin-top: 0;
        }

        :global(.preview-content h2) {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 1.25rem 0 0.75rem 0;
          color: inherit;
          line-height: 1.3;
        }

        :global(.preview-content h3) {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 1rem 0 0.5rem 0;
          color: inherit;
          line-height: 1.4;
        }

        :global(.preview-content h4) {
          font-size: 1.125rem;
          font-weight: 600;
          margin: 0.875rem 0 0.5rem 0;
          color: inherit;
          line-height: 1.4;
        }

        :global(.preview-content h5) {
          font-size: 1rem;
          font-weight: 600;
          margin: 0.75rem 0 0.5rem 0;
          color: inherit;
          line-height: 1.4;
        }

        :global(.preview-content h6) {
          font-size: 0.875rem;
          font-weight: 600;
          margin: 0.75rem 0 0.5rem 0;
          color: inherit;
          line-height: 1.4;
        }

        /* Paragraphs */
        :global(.preview-content p) {
          margin: 0.75rem 0;
          line-height: 1.6;
          color: inherit;
        }

        :global(.preview-content p:first-child) {
          margin-top: 0;
        }

        :global(.preview-content p:last-child) {
          margin-bottom: 0;
        }

        /* Text formatting */
        :global(.preview-content strong) {
          font-weight: 600;
          color: inherit;
        }

        :global(.preview-content em) {
          font-style: italic;
          color: inherit;
        }

        :global(.preview-content u) {
          text-decoration: underline;
        }

        :global(.preview-content s) {
          text-decoration: line-through;
        }

        /* Lists */
        :global(.preview-content ul) {
          list-style-type: disc;
          margin: 1rem 0;
          padding-left: 1.5rem;
        }

        :global(.preview-content ol) {
          list-style-type: decimal;
          margin: 1rem 0;
          padding-left: 1.5rem;
        }

        :global(.preview-content li) {
          margin: 0.25rem 0;
          line-height: 1.5;
          color: inherit;
        }

        :global(.preview-content ul ul),
        :global(.preview-content ol ol),
        :global(.preview-content ul ol),
        :global(.preview-content ol ul) {
          margin: 0.25rem 0;
        }

        /* Tables */
        :global(.preview-content table) {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
          border: 1px solid #d1d5db;
        }

        :global(.dark .preview-content table) {
          border-color: #4b5563;
        }

        :global(.preview-content th) {
          background-color: #f9fafb;
          border: 1px solid #d1d5db;
          padding: 0.75rem;
          text-align: left;
          font-weight: 600;
          color: #111827;
        }

        :global(.dark .preview-content th) {
          background-color: #374151;
          border-color: #4b5563;
          color: #f9fafb;
        }

        :global(.preview-content td) {
          border: 1px solid #d1d5db;
          padding: 0.75rem;
          color: inherit;
        }

        :global(.dark .preview-content td) {
          border-color: #4b5563;
        }

        :global(.preview-content tbody tr:nth-child(even)) {
          background-color: #f9fafb;
        }

        :global(.dark .preview-content tbody tr:nth-child(even)) {
          background-color: #1f2937;
        }

        /* Blockquotes */
        :global(.preview-content blockquote) {
          border-left: 4px solid #d1d5db;
          padding-left: 1rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: #6b7280;
        }

        :global(.dark .preview-content blockquote) {
          border-color: #4b5563;
          color: #9ca3af;
        }

        /* Links */
        :global(.preview-content a) {
          color: #3b82f6;
          text-decoration: none;
        }

        :global(.preview-content a:hover) {
          text-decoration: underline;
        }

        :global(.dark .preview-content a) {
          color: #60a5fa;
        }

        /* Code */
        :global(.preview-content code) {
          background-color: #f3f4f6;
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas,
            "Liberation Mono", Menlo, monospace;
          font-size: 0.875em;
          color: #1f2937;
        }

        :global(.dark .preview-content code) {
          background-color: #374151;
          color: #f3f4f6;
        }

        :global(.preview-content pre) {
          background-color: #f3f4f6;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1rem 0;
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas,
            "Liberation Mono", Menlo, monospace;
        }

        :global(.dark .preview-content pre) {
          background-color: #1f2937;
        }

        :global(.preview-content pre code) {
          background: none;
          padding: 0;
          border-radius: 0;
          color: inherit;
        }

        /* Horizontal rules */
        :global(.preview-content hr) {
          border: none;
          border-top: 1px solid #d1d5db;
          margin: 2rem 0;
        }

        :global(.dark .preview-content hr) {
          border-color: #4b5563;
        }

        /* Images */
        :global(.preview-content img) {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }

        /* Ensure proper spacing */
        :global(.preview-content > *:first-child) {
          margin-top: 0;
        }

        :global(.preview-content > *:last-child) {
          margin-bottom: 0;
        }
      `}</style>
      <div
        className="preview-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};
export default RenderPreview;
