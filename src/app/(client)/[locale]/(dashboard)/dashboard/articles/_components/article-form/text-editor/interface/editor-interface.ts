import { RefObject } from "react";

export type IViewMode = "edit" | "preview" | "split";

export interface IEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export interface ICustomToolBarProps {
  viewMode: IViewMode;
  setViewMode: (mode: IViewMode) => void;
  isFullscreen: boolean;
  setIsFullscreen: (value: boolean) => void;
  charCount: number;
  wordCount: number;
}

export interface IEditorFooterProps {
  viewMode: IViewMode;
  charCount: number;
  wordCount: number;
}

export interface IFullScreenEditorProps {
  viewMode: IViewMode;
  value: string;
  setViewMode: (mode: IViewMode) => void;
  setIsFullscreen: (value: boolean) => void;
  charCount: number;
  wordCount: number;
  onChange: (value: string) => void;
  latestValueRef: RefObject<any>;
  config?: object;
}

export interface ISmallScreenEditorProps {
  viewMode: IViewMode;
  value: string;
  setViewMode: (mode: IViewMode) => void;
  setIsFullscreen: (value: boolean) => void;
  charCount: number;
  wordCount: number;
  onChange: (value: string) => void;
  latestValueRef: RefObject<any>;
  config?: object;
  className?: string;
}

export interface IEditorContentProps {
  value: string;
  viewMode: IViewMode;
  onChange: (value: string) => void;
  latestValueRef: RefObject<any>;
  config?: object;
}

export interface IGetEditorConfigProps {
  placeholder?: string;
  isFullscreen: boolean;
  viewMode: "edit" | "preview" | "split";
  isDark: boolean;
  setEditorInitialized: (initialized: boolean) => void;
  editorRef: RefObject<any>;
}
