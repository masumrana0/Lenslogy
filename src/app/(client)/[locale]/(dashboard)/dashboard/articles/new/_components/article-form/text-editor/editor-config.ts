"use client";
import type { IGetEditorConfigProps } from "./interface/editor-interface";

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
    toolbarAdaptive: true,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,

    // Enhanced button configuration with proper text formatting tools
    buttons: [
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "|",
      "superscript",
      "subscript",
      "|",
      "ul",
      "ol",
      "|",
      "outdent",
      "indent",
      "|",
      "font",
      "fontsize",
      "brush", // This is the text color tool
      "paragraph", // This includes heading options
      "|",
      "left",
      "center",
      "right",
      "justify",
      "|",
      "link",
      "unlink",
      "|",
      "image",
      "table",
      "|",
      "hr",
      "|",
      "copyformat", // Paint format tool
      "eraser",
      "|",
      "undo",
      "redo",
    ],

    // Remove problematic buttons
    removeButtons: ["source", "about", "fullsize", "print", "preview"],

    // Enhanced controls configuration
    controls: {
      brush: {
        popup: (editor: any, current: any, self: any, close: any) => {
          const colorPicker = editor.create.div("jodit-color-picker");
          const colors = [
            "#000000",
            "#333333",
            "#666666",
            "#999999",
            "#cccccc",
            "#ffffff",
            "#ff0000",
            "#ff6600",
            "#ffcc00",
            "#33cc00",
            "#0066cc",
            "#6600cc",
            "#cc0066",
            "#ff3366",
            "#ff9933",
            "#ffff33",
            "#66ff33",
            "#33ccff",
            "#9933ff",
            "#ff33cc",
          ];

          colors.forEach((color) => {
            const colorButton = editor.create.div("jodit-color-item");
            colorButton.style.backgroundColor = color;
            colorButton.style.width = "20px";
            colorButton.style.height = "20px";
            colorButton.style.display = "inline-block";
            colorButton.style.margin = "2px";
            colorButton.style.cursor = "pointer";
            colorButton.style.border = "1px solid #ccc";

            colorButton.addEventListener("click", () => {
              editor.execCommand("foreColor", false, color);
              close();
            });

            colorPicker.appendChild(colorButton);
          });

          return colorPicker;
        },
      },
      paragraph: {
        list: {
          p: "Normal",
          h1: "Heading 1",
          h2: "Heading 2",
          h3: "Heading 3",
          h4: "Heading 4",
          h5: "Heading 5",
          h6: "Heading 6",
        },
      },
      font: {
        list: {
          "Arial,sans-serif": "Arial",
          "Georgia,serif": "Georgia",
          "Times New Roman,serif": "Times New Roman",
          "Courier New,monospace": "Courier New",
          "Verdana,sans-serif": "Verdana",
          "Helvetica,sans-serif": "Helvetica",
        },
      },
    },

    // Styling
    style: {
      background: isDark ? "#111827" : "#ffffff",
      color: isDark ? "#f9fafb" : "#111827",
    },

    // Custom CSS
    editorCssClass: isDark ? "jodit-dark-theme" : "jodit-light-theme",

    // Performance optimizations
    observer: true,
    iframe: false,
    recreateFromHTML: false,
    beautifyHTML: true,
    cleanHTML: {
      timeout: 300,
      removeEmptyElements: false,
      fillEmptyParagraph: true,
    },

    // Image upload configuration
    uploader: {
      insertImageAsBase64URI: true,
      imagesExtensions: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
    },

    // Link configuration - Fixed to maintain functionality
    link: {
      followOnDblClick: false,
      openInNewTabCheckbox: true,
      noFollowCheckbox: false,
      modeClassName: "input",
      processPastedLink: true,
    },

    // Table configuration
    table: {
      selectionCellStyle: "border: 2px solid #3b82f6;",
      defaultTag: "table",
    },

    // Enhanced paste configuration
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    defaultActionOnPaste: "insert_clear_html",
    processPastedHTML: true,

    // Event configuration with enhanced handling
    events: {
      afterInit: (editor: any) => {
        setEditorInitialized(true);
        editorRef.current = editor;

        // Ensure proper formatting is maintained
        editor.events.on("change", () => {
          // Force update to maintain formatting
          const content = editor.getEditorValue();
          if (content !== editor.value) {
            editor.value = content;
          }
        });

        // Fix link functionality
        editor.events.on("afterSetMode", () => {
          if (editor.mode === "wysiwyg") {
            const links = editor.editor.querySelectorAll("a");
            links.forEach((link: HTMLAnchorElement) => {
              link.addEventListener("click", (e) => {
                if (e.ctrlKey || e.metaKey) {
                  window.open(link.href, "_blank");
                }
              });
            });
          }
        });
      },

      beforeCommand: (command: string) => {
        // Ensure commands are properly executed
        return true;
      },

      afterCommand: (command: string) => {
        // Handle post-command cleanup if needed
        if (
          ["bold", "italic", "underline", "foreColor", "formatBlock"].includes(
            command
          )
        ) {
          // Force a refresh to ensure formatting is visible
          if (editorRef.current) {
            editorRef.current.synchronizeValues();
          }
        }
      },
    },

    // Additional configuration for better formatting support
    enter: "P",
    useSplitMode: false,
    colors: {
      greyscale: [
        "#000000",
        "#434343",
        "#666666",
        "#999999",
        "#B7B7B7",
        "#CCCCCC",
        "#D9D9D9",
        "#EFEFEF",
        "#F3F3F3",
        "#FFFFFF",
      ],
      palette: [
        "#980000",
        "#FF0000",
        "#FF9900",
        "#FFFF00",
        "#00FF00",
        "#00FFFF",
        "#4A86E8",
        "#0000FF",
        "#9900FF",
        "#FF00FF",
      ],
      full: [
        "#E6B8AF",
        "#F4CCCC",
        "#FCE5CD",
        "#FFF2CC",
        "#D9EAD3",
        "#D0E0E3",
        "#C9DAF8",
        "#CFE2F3",
        "#D9D2E9",
        "#EAD1DC",
        "#DD7E6B",
        "#EA9999",
        "#F9CB9C",
        "#FFE599",
        "#B6D7A8",
        "#A2C4C9",
        "#A4C2F4",
        "#9FC5E8",
        "#B4A7D6",
        "#D5A6BD",
        "#CC4125",
        "#E06666",
        "#F6B26B",
        "#FFD966",
        "#93C47D",
        "#76A5AF",
        "#6D9EEB",
        "#6FA8DC",
        "#8E7CC3",
        "#C27BA0",
        "#A61E4D",
        "#CC0000",
        "#E69138",
        "#F1C232",
        "#6AA84F",
        "#45818E",
        "#3C78D8",
        "#3D85C6",
        "#674EA7",
        "#A64D79",
        "#85200C",
        "#990000",
        "#B45F06",
        "#BF9000",
        "#38761D",
        "#134F5C",
        "#1155CC",
        "#0B5394",
        "#351C75",
        "#741B47",
        "#5B0F00",
        "#660000",
        "#783F04",
        "#7F6000",
        "#274E13",
        "#0C343D",
        "#1C4587",
        "#073763",
        "#20124D",
        "#4C1130",
      ],
    },
  };

  return config;
};

export default getEditorConfig;
