"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Code,
  LinkIcon,
  // ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Quote,
  Eye,
  Edit,
  Undo,
  Redo,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  getFromLocalStorageAsParse,
  setToLocalStorageAsStringify,
} from "@/utils/local-storage";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder,
  className,
}: RichTextEditorProps) {
  // Store the HTML content in state to ensure it's preserved between tab switches
  const [internalContent, setInternalContent] = useState<string>(
    value || getFromLocalStorageAsParse("draft-content")
  );

  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const [isFocused, setIsFocused] = useState(false);

  // Refs
  const editorRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);
  const isTabSwitching = useRef(false);

  // Debug logging function
  const logDebug = useCallback((message: string, data?: any) => {
    // console.log(`[RichTextEditor] ${message}`, data || "");
  }, []);

  useEffect(() => {
    setToLocalStorageAsStringify("draft-content", internalContent);
  }, [internalContent]);

  // Initialize editor content on mount
  useEffect(() => {
    if (isInitialMount.current && editorRef.current) {
      // logDebug("Initial mount, setting editor content", value);
      editorRef.current.innerHTML = value || "";

      setInternalContent(value || "");
      isInitialMount.current = false;
    }
  }, [value, logDebug]);

  // UpcreatedAt editor content when external value changes
  useEffect(() => {
    if (
      !isInitialMount.current &&
      !isTabSwitching.current &&
      editorRef.current
    ) {
      if (editorRef.current.innerHTML !== value) {
        logDebug("External value changed, updating editor", value);
        editorRef.current.innerHTML = value || "";
        setInternalContent(value || "");
      }
    }
  }, [value, logDebug]);

  // Handle content changes in the editor
  const handleContentChange = useCallback(() => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      logDebug("Content changed in editor", newContent);
      setInternalContent(newContent);
      onChange(newContent);
    }
  }, [onChange, logDebug]);

  // Handle tab change with content preservation
  const handleTabChange = useCallback(
    (tab: string) => {
      isTabSwitching.current = true;
      logDebug(`Switching tab from ${activeTab} to ${tab}`);

      // Before changing tabs, make sure we capture the latest content
      if (activeTab === "write" && editorRef.current) {
        const currentContent = editorRef.current.innerHTML;
        logDebug("Saving content before tab switch", currentContent);
        setInternalContent(currentContent);
        onChange(currentContent);
      }

      setActiveTab(tab as "write" | "preview");

      // After tab switch, ensure content is preserved when going back to write tab
      setTimeout(() => {
        if (tab === "write" && editorRef.current) {
          logDebug("Restoring content after tab switch", internalContent);
          editorRef.current.innerHTML = internalContent;
        }
        isTabSwitching.current = false;
      }, 50);
    },
    [activeTab, internalContent, onChange, logDebug]
  );

  // Format commands with proper error handling
  const execFormatCommand = useCallback(
    (e: React.MouseEvent, command: string, value?: string) => {
      e.preventDefault();
      e.stopPropagation();

      try {
        // Focus the editor if it's not already focused
        if (document.activeElement !== editorRef.current) {
          editorRef.current?.focus();
        }

        // Execute the command
        document.execCommand(command, false, value);

        // UpcreatedAt content after command execution
        handleContentChange();
      } catch (error) {
        console.error(`Error executing command ${command}:`, error);
      }
    },
    [handleContentChange]
  );

  // Special handling for heading formats
  const applyHeading = useCallback(
    (e: React.MouseEvent, level: 1 | 2) => {
      e.preventDefault();
      e.stopPropagation();

      try {
        // Focus the editor
        editorRef.current?.focus();

        // Apply heading format
        document.execCommand("formatBlock", false, `<h${level}>`);

        // UpcreatedAt content
        handleContentChange();
      } catch (error) {
        console.error(`Error applying heading ${level}:`, error);
      }
    },
    [handleContentChange]
  );

  // Special handling for blockquote
  const applyBlockquote = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      try {
        // Focus the editor
        editorRef.current?.focus();

        // Apply blockquote format
        document.execCommand("formatBlock", false, "<blockquote>");

        // UpcreatedAt content
        handleContentChange();
      } catch (error) {
        console.error("Error applying blockquote:", error);
      }
    },
    [handleContentChange]
  );

  // Insert link with proper error handling
  const insertLink = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      try {
        // Focus the editor
        editorRef.current?.focus();

        const url = prompt("Enter URL:");
        if (url) {
          document.execCommand("createLink", false, url);
          handleContentChange();
        }
      } catch (error) {
        console.error("Error inserting link:", error);
      }
    },
    [handleContentChange]
  );

  // Insert image with proper error handling
  // const insertImage = useCallback(
  //   async (e: React.MouseEvent) => {
  //     e.preventDefault();
  //     e.stopPropagation();

  //     try {
  //       // Create a file input element
  //       const input = document.createElement("input");
  //       input.type = "file";
  //       input.accept = "image/*";

  //       input.onchange = async (e) => {
  //         const target = e.target as HTMLInputElement;
  //         if (target.files && target.files[0]) {
  //           const file = target.files[0];

  //           // Focus the editor
  //           editorRef.current?.focus();

  //           // Create a FormData object
  //           const formData = new FormData();
  //           formData.append("imgFile", file);
  //           formData.append("payload", JSON.stringify({ type: "editor" }));

  //           try {
  //             // Show loading indicator in editor
  //             document.execCommand(
  //               "insertHTML",
  //               false,
  //               '<span id="image-loading" class="text-[#ff005b]">Uploading image...</span>'
  //             );

  //             // Upload the image
  //             const response = await fetch("/api/upload", {
  //               method: "POST",
  //               body: formData,
  //             });

  //             if (!response.ok) {
  //               throw new Error("Failed to upload image");
  //             }

  //             const data = await response.json();

  //             // Find and remove loading indicator
  //             const loadingEl = document.getElementById("image-loading");
  //             if (loadingEl && loadingEl.parentNode) {
  //               // Create the image element
  //               const imgHTML = `<img src="${data.imageUrl}" alt="Article image" class="w-full h-auto rounded-lg my-4" />`;

  //               // Replace the loading element
  //               document.execCommand("insertHTML", false, imgHTML);

  //               // UpcreatedAt content
  //               handleContentChange();
  //             }
  //           } catch (error) {
  //             console.error("Error uploading image:", error);

  //             // Find and remove loading indicator
  //             const loadingEl = document.getElementById("image-loading");
  //             if (loadingEl && loadingEl.parentNode) {
  //               // Show error message
  //               document.execCommand(
  //                 "insertHTML",
  //                 false,
  //                 '<span class="text-[#ff005b]">Failed to upload image</span>'
  //               );

  //               // UpcreatedAt content
  //               handleContentChange();
  //             }
  //           }
  //         }
  //       };

  //       // Trigger the file input click
  //       input.click();
  //     } catch (error) {
  //       console.error("Error handling image upload:", error);
  //     }
  //   },
  //   [handleContentChange]
  // );

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // Prevent form submission on Enter key
      if (e.key === "Enter" && e.ctrlKey) {
        e.preventDefault();
        return;
      }

      // Handle common keyboard shortcuts
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case "b":
            e.preventDefault();
            document.execCommand("bold", false);
            handleContentChange();
            break;
          case "i":
            e.preventDefault();
            document.execCommand("italic", false);
            handleContentChange();
            break;
          case "u":
            e.preventDefault();
            document.execCommand("underline", false);
            handleContentChange();
            break;
          case "z":
            e.preventDefault();
            if (e.shiftKey) {
              document.execCommand("redo", false);
            } else {
              document.execCommand("undo", false);
            }
            handleContentChange();
            break;
          case "y":
            e.preventDefault();
            document.execCommand("redo", false);
            handleContentChange();
            break;
        }
      }
    },
    [handleContentChange]
  );

  // Effect to ensure editor content is restored when switching back to write tab
  useEffect(() => {
    if (activeTab === "write" && editorRef.current && !isInitialMount.current) {
      logDebug("Tab switched to write, restoring content", internalContent);
      // Use a small timeout to ensure the DOM is ready
      const timer = setTimeout(() => {
        if (
          editorRef.current &&
          editorRef.current.innerHTML !== internalContent
        ) {
          editorRef.current.innerHTML = internalContent;
        }
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [activeTab, internalContent, logDebug]);

  return (
    <div className={cn("border rounded-md overflow-hidden", className)}>
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <div className="flex items-center justify-between border-b px-3 py-2  bg-gray-50 dark:bg-gray-800">
          <TabsList className="grid w-[180px] grid-cols-2">
            <TabsTrigger value="write" className="flex items-center gap-1">
              <Edit className="h-4 w-4" />
              Write
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              Preview
            </TabsTrigger>
          </TabsList>

          {activeTab === "write" && (
            <div className="flex items-center space-x-1 overflow-x-auto pb-2 sm:pb-0">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={(e) => execFormatCommand(e, "bold")}
                title="Bold (Ctrl+B)"
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={(e) => execFormatCommand(e, "italic")}
                title="Italic (Ctrl+I)"
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={(e) => applyHeading(e, 1)}
                title="Heading 1"
              >
                <Heading1 className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={(e) => applyHeading(e, 2)}
                title="Heading 2"
              >
                <Heading2 className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={(e) => execFormatCommand(e, "insertUnorderedList")}
                title="Bullet List"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={(e) => execFormatCommand(e, "insertOrderedList")}
                title="Numbered List"
              >
                <ListOrdered className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={(e) => applyBlockquote(e)}
                title="Quote"
              >
                <Quote className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={(e) => execFormatCommand(e, "justifyLeft")}
                title="Align Left"
              >
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={(e) => execFormatCommand(e, "justifyCenter")}
                title="Align Center"
              >
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={(e) => execFormatCommand(e, "justifyRight")}
                title="Align Right"
              >
                <AlignRight className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={insertLink}
                title="Insert Link"
              >
                <LinkIcon className="h-4 w-4" />
              </Button>
              {/* <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={insertImage}
                title="Insert Image"
              >
                <ImageIcon className="h-4 w-4" />
              </Button> */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={(e) => execFormatCommand(e, "formatBlock", "<pre>")}
                title="Code Block"
              >
                <Code className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={(e) => execFormatCommand(e, "undo")}
                title="Undo (Ctrl+Z)"
              >
                <Undo className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={(e) => execFormatCommand(e, "redo")}
                title="Redo (Ctrl+Y)"
              >
                <Redo className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <TabsContent value="write" className="p-0 m-0">
          <div
            ref={editorRef}
            contentEditable
            className={cn(
              "min-h-[300px] p-4 focus:outline-none prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-[#ff005b] prose-a:no-underline hover:prose-a:underline",
              isFocused && "ring-1 ring-[#ff005b]/20"
            )}
            placeholder={placeholder as any}
            onInput={handleContentChange}
            onBlur={() => {
              handleContentChange();
              setIsFocused(false);
            }}
            onFocus={() => setIsFocused(true)}
            onKeyDown={handleKeyDown}
            spellCheck="true"
            // data-gramm="false"
          />
        </TabsContent>

        <TabsContent value="preview" className="p-4 m-0 min-h-[300px]">
          <div
            contentEditable
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-[#ff005b] prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-[#ff005b] prose-blockquote:text-gray-700 prose-blockquote:font-normal prose-blockquote:italic"
            dangerouslySetInnerHTML={{ __html: internalContent }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
