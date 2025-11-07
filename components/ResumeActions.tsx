"use client";

import { ResumeData } from "@/lib/types";
import { exportResumeAsJSON, importResumeFromJSON, duplicateResume } from "@/lib/resumeUtils";
import { Download, Upload, Copy, FileJson } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface ResumeActionsProps {
  data: ResumeData;
  onDataChange: (data: ResumeData) => void;
  onToast: (message: string, type: "success" | "error" | "info") => void;
}

export function ResumeActions({ data, onDataChange, onToast }: ResumeActionsProps) {
  const [isImporting, setIsImporting] = useState(false);

  const handleExportJSON = () => {
    try {
      const json = exportResumeAsJSON(data);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${data.personalInfo.name || "resume"}-resume.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      onToast("Resume exported as JSON successfully!", "success");
    } catch (error) {
      console.error("Export error:", error);
      onToast("Failed to export resume", "error");
    }
  };

  const handleImportJSON = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setIsImporting(true);
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const jsonString = event.target?.result as string;
            const importedData = importResumeFromJSON(jsonString);
            if (importedData) {
              onDataChange(importedData);
              onToast("Resume imported successfully!", "success");
            } else {
              onToast("Invalid resume file format", "error");
            }
          } catch (error) {
            console.error("Import error:", error);
            onToast("Failed to import resume", "error");
          } finally {
            setIsImporting(false);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleDuplicate = () => {
    const duplicated = duplicateResume(data);
    onDataChange(duplicated);
    onToast("Resume duplicated! You can now edit the copy.", "success");
  };

  return (
    <div className="glass-card rounded-xl p-6 border border-white/20 dark:border-white/10">
      <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-4">
        Resume Actions
      </h3>
      <div className="grid grid-cols-1 gap-3">
        <motion.button
          onClick={handleExportJSON}
          className="flex items-center gap-3 px-4 py-3 glass-input border border-white/30 dark:border-white/10 rounded-xl text-light-text dark:text-dark-text hover:border-light-accent dark:hover:border-dark-accent transition-all duration-200 hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FileJson className="w-5 h-5 text-light-accent dark:text-dark-accent" />
          <span className="text-sm font-medium">Export JSON</span>
        </motion.button>

        <motion.button
          onClick={handleImportJSON}
          disabled={isImporting}
          className="flex items-center gap-3 px-4 py-3 glass-input border border-white/30 dark:border-white/10 rounded-xl text-light-text dark:text-dark-text hover:border-light-accent dark:hover:border-dark-accent transition-all duration-200 hover:scale-105 disabled:opacity-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Upload className="w-5 h-5 text-light-accent dark:text-dark-accent" />
          <span className="text-sm font-medium">
            {isImporting ? "Importing..." : "Import JSON"}
          </span>
        </motion.button>

        <motion.button
          onClick={handleDuplicate}
          className="flex items-center gap-3 px-4 py-3 glass-input border border-white/30 dark:border-white/10 rounded-xl text-light-text dark:text-dark-text hover:border-light-accent dark:hover:border-dark-accent transition-all duration-200 hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Copy className="w-5 h-5 text-light-accent dark:text-dark-accent" />
          <span className="text-sm font-medium">Duplicate</span>
        </motion.button>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
        💡 Export your resume as JSON for backup or import it later to continue editing.
      </p>
    </div>
  );
}

