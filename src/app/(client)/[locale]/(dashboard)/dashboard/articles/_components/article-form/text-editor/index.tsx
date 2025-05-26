"use client";
import type React from "react";
import { useRef, useEffect, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import EditorFullScreen from "./editor-full-screen";
import EditorSmallScreenView from "./editor-small-screen";
import { IEditorProps, IViewMode } from "./interface/editor-interface";
import getEditorConfig from "./editor-config";

const TextEditorWithPreview: React.FC<IEditorProps> = ({
  value,
  onChange,
  placeholder,
  className,
}) => {
  const editorRef = useRef<any>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [viewMode, setViewMode] = useState<IViewMode>("edit");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [editorInitialized, setEditorInitialized] = useState(false);
  const latestValueRef = useRef(value);
  const isInternalUpdateRef = useRef(false);

  const config: Record<string, any> = getEditorConfig({
    editorRef,
    isDark,
    isFullscreen,
    setEditorInitialized,
    viewMode,
    placeholder,
  });

  // Auto-save to localStorage
  useEffect(() => {
    const savedContent = localStorage.getItem("jodit-editor-content");
    if (savedContent && !value) {
      onChange(savedContent);
    }
  }, []);

  useEffect(() => {
    if (value && !isInternalUpdateRef.current) {
      localStorage.setItem("jodit-editor-content", value);
    }
  }, [value]);

  // Handle fullscreen mode
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    if (isFullscreen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isFullscreen]);

  // Update editor content only when value changes externally
  useEffect(() => {
    if (
      editorRef.current &&
      editorInitialized &&
      !isInternalUpdateRef.current
    ) {
      const editor = editorRef.current;
      if (editor.value !== value) {
        const selection = editor.selection?.save();
        editor.value = value;
        if (selection) {
          editor.selection?.restore(selection);
        }
      }
    }
    latestValueRef.current = value;
  }, [value, editorInitialized]);

  // Handle editor changes without causing re-renders
  const handleEditorChange = useCallback(
    (newContent: string) => {
      if (isInternalUpdateRef.current) return;

      isInternalUpdateRef.current = true;
      latestValueRef.current = newContent;

      // Use requestAnimationFrame to ensure this runs after the current render cycle
      requestAnimationFrame(() => {
        onChange(newContent);
        isInternalUpdateRef.current = false;
      });
    },
    [onChange]
  );

  const wordCount = value
    .replace(/<[^>]*>/g, "")
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
  const charCount = value.replace(/<[^>]*>/g, "").length;

  if (isFullscreen) {
    return (
      <EditorFullScreen
        charCount={charCount}
        latestValueRef={latestValueRef}
        onChange={handleEditorChange}
        setIsFullscreen={setIsFullscreen}
        setViewMode={setViewMode}
        value={value}
        viewMode={viewMode}
        wordCount={wordCount}
        config={config}
      />
    );
  } else {
    return (
      <EditorSmallScreenView
        charCount={charCount}
        latestValueRef={latestValueRef}
        onChange={handleEditorChange}
        setIsFullscreen={setIsFullscreen}
        setViewMode={setViewMode}
        value={value}
        viewMode={viewMode}
        wordCount={wordCount}
        config={config}
        className={className}
      />
    );
  }
};

export default TextEditorWithPreview;
