import { toast as sonnerToast } from "sonner";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Info,
  Loader2,
} from "lucide-react";
import type { ReactNode } from "react";

type ToastType =
  | "default"
  | "success"
  | "error"
  | "info"
  | "warning"
  | "loading";

interface ToastOptions {
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  cancel?: {
    label: string;
    onClick: () => void;
  };
  position?:
    | "top-center"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  id?: string | number;
  icon?: ReactNode;
}

// Default icons for each toast type
const defaultIcons = {
  success: <CheckCircle2 className="h-5 w-5 text-green-500" />,
  error: <XCircle className="h-5 w-5 text-red-500" />,
  warning: <AlertCircle className="h-5 w-5 text-yellow-500" />,
  info: <Info className="h-5 w-5 text-blue-500" />,
  loading: <Loader2 className="h-5 w-5 text-gray-500 animate-spin" />,
  default: undefined,
};

export function toast(options: ToastOptions) {
  const {
    title,
    description,
    type = "default",
    duration,
    action,
    cancel,
    id,
    icon,
  } = options;

  // Use provided icon or default icon for the type
  const iconToUse = icon !== undefined ? icon : defaultIcons[type];

  const toastOptions = {
    id,
    description,
    duration,
    action,
    cancel,
    icon: iconToUse,
  };

  switch (type) {
    case "success":
      return sonnerToast.success(title, toastOptions);
    case "error":
      return sonnerToast.error(title, toastOptions);
    case "info":
      return sonnerToast.info(title, toastOptions);
    case "warning":
      return sonnerToast.warning(title, toastOptions);
    case "loading":
      return sonnerToast.loading(title, toastOptions);
    default:
      return sonnerToast(title, toastOptions);
  }
}

// Add additional utility methods
toast.dismiss = sonnerToast.dismiss;
toast.promise = sonnerToast.promise;
