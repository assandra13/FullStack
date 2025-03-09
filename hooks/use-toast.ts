"use client";

import { useState } from "react";

type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface UseToastReturn {
  toasts: Toast[];
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  dismissToast: (id: string) => void;
  dismissAllToasts: () => void;
}

/**
 * Hook to manage toast notifications
 * @returns Object with toast state and methods
 */
export function useToast(): UseToastReturn {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Show a new toast notification
  const showToast = (message: string, type: ToastType = "info", duration = 5000) => {
    const id = Date.now().toString();
    const newToast: Toast = { id, message, type, duration };

    setToasts((prevToasts) => [...prevToasts, newToast]);

    // Auto dismiss after duration
    if (duration > 0) {
      setTimeout(() => {
        dismissToast(id);
      }, duration);
    }
  };

  // Dismiss a specific toast by id
  const dismissToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  // Dismiss all toasts
  const dismissAllToasts = () => {
    setToasts([]);
  };

  return {
    toasts,
    showToast,
    dismissToast,
    dismissAllToasts,
  };
}
