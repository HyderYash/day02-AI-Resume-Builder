"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface PDFExportButtonProps {
  onExport: () => Promise<void>;
}

export function PDFExportButton({ onExport }: PDFExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await onExport();
    } catch (error) {
      console.error("Export error:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <motion.button
      onClick={handleExport}
      disabled={isExporting}
      className="px-6 py-3 bg-gradient-to-r from-light-accent to-purple-500 dark:from-dark-accent dark:to-purple-400 text-white rounded-xl font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isExporting ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Exporting...
        </>
      ) : (
        <>
          <Download className="w-5 h-5" />
          Export as PDF
        </>
      )}
    </motion.button>
  );
}

