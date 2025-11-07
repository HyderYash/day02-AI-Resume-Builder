"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X, AlertCircle } from "lucide-react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export function Toast({
  message,
  type = "success",
  isVisible,
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -50, x: "-50%" }}
          className="fixed top-4 left-1/2 z-50 flex items-center gap-3 px-6 py-4 bg-white dark:bg-dark-secondary border border-light-border dark:border-dark-border rounded-apple shadow-apple dark:shadow-apple-dark"
        >
          {type === "success" && (
            <CheckCircle className="w-5 h-5 text-green-500" />
          )}
          {type === "error" && <AlertCircle className="w-5 h-5 text-red-500" />}
          {type === "info" && (
            <AlertCircle className="w-5 h-5 text-light-accent dark:text-dark-accent" />
          )}
          <span className="text-light-text dark:text-dark-text">{message}</span>
          <button
            onClick={onClose}
            className="ml-2 p-1 hover:bg-light-secondary dark:hover:bg-dark-secondary rounded transition-colors"
          >
            <X className="w-4 h-4 text-light-text dark:text-dark-text" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

