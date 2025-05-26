"use client";
import { IGetEditorConfigProps } from "./interface/editor-interface";

const getEditorConfig = ({
  placeholder,
  isFullscreen,
  viewMode,
  isDark,
  setEditorInitialized,
  editorRef,
}: IGetEditorConfigProps) => {
  const config = {
    readonly: false,
    placeholder: placeholder || "Start typing...",
    height: isFullscreen
      ? "calc(100vh - 250px)"
      : viewMode === "split"
      ? 350
      : 400,
    minHeight: 300,
    maxHeight: isFullscreen ? "calc(100vh - 250px)" : 800,

    // Theme configuration
    theme: isDark ? "dark" : "default",

    // Toolbar configuration
    toolbar: viewMode !== "preview",
    toolbarSticky: false,
    toolbarAdaptive: false,

    // Button configuration
    buttons: [
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "|",
      "ul",
      "ol",
      "|",
      "font",
      "fontsize",
      "brush",
      "|",
      "paragraph",
      "|",
      "link",
      "image",
      "|",
      "align",
      "|",
      "undo",
      "redo",
      "|",
      "hr",
      "table",
      "|",
      "indent",
      "outdent",
      "|",
      "superscript",
      "subscript",
      "|",
      "copyformat",
      "eraser",
    ],

    // Remove problematic buttons
    removeButtons: ["source", "about", "fullsize", "print"],

    // Styling
    style: {
      background: isDark ? "#111827" : "#ffffff",
      color: isDark ? "#f9fafb" : "#111827",
    },

    // Custom CSS
    editorCssClass: isDark ? "jodit-dark-theme" : "jodit-light-theme",

    // Performance optimizations
    observer: false,
    iframe: false,
    recreateFromHTML: false,
    beautifyHTML: false,
    cleanHTML: {
      timeout: 0,
    },

    // Image upload configuration
    uploader: {
      insertImageAsBase64URI: true,
    },

    // Link configuration
    link: {
      followOnDblClick: false,
      openInNewTabCheckbox: true,
    },

    // Table configuration
    table: {
      selectionCellStyle: "border: 1px solid #3b82f6;",
    },

    // Disable problematic paste features
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    defaultActionOnPaste: "insert_clear_html",

    // Event configuration
    events: {
      afterInit: (editor: any) => {
        setEditorInitialized(true);
        editorRef.current = editor;
      },
    },
  };

  return config;
};

export default getEditorConfig;
