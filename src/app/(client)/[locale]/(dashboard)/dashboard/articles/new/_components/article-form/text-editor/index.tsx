"use client";
import type React from "react";
import { useRef, useEffect, useState, useCallback, useMemo } from "react";
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
  const hasExternalValueChanged = useRef(false);

  const config = useMemo(
    () =>
      getEditorConfig({
        editorRef,
        isDark,
        isFullscreen,
        setEditorInitialized,
        viewMode,
        placeholder,
      }),
    [isDark, isFullscreen, viewMode, placeholder]
  );

  // Update localStorage only on true external change
  useEffect(() => {
    if (latestValueRef.current !== value) {
      hasExternalValueChanged.current = true;
      latestValueRef.current = value;
    }
  }, [value]);

  // Sync external value only if it’s different and editor is initialized
  useEffect(() => {
    if (
      editorRef.current &&
      editorInitialized &&
      hasExternalValueChanged.current
    ) {
      const editor = editorRef.current;
      if (editor.value !== value) {
        const selection = editor.selection?.save();
        editor.value = value;
        if (selection) editor.selection?.restore(selection);
      }
      hasExternalValueChanged.current = false;
    }
  }, [value, editorInitialized]);

  // Save to localStorage on user change

  const handleEditorChange = useCallback(
    (newContent: string) => {
      latestValueRef.current = newContent;
      onChange(newContent);
    },
    [onChange]
  );

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

  const plainText = latestValueRef.current.replace(/<[^>]*>/g, "");
  const wordCount = plainText.trim().split(/\s+/).filter(Boolean).length;
  const charCount = plainText.length;

  const editorProps = {
    charCount,
    latestValueRef,
    onChange: handleEditorChange,
    setIsFullscreen,
    isFullscreen,
    setViewMode,
    value,
    viewMode,
    wordCount,
    config,
  };

  return isFullscreen ? (
    <EditorFullScreen {...editorProps} />
  ) : (
    <EditorSmallScreenView
      {...editorProps}
      isFullscreen={isFullscreen}
      className={className}
    />
  );
};

export default TextEditorWithPreview;
