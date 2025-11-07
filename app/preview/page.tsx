"use client";

import { useEffect, useState } from "react";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { PreviewCard } from "@/components/PreviewCard";
import { PDFExportButton } from "@/components/PDFExportButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";
import { CopyResumeButton } from "@/components/CopyResumeButton";
import { ArrowLeft, Printer } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PreviewPage() {
  const { data: resumeData, isLoading } = useLocalStorage();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleExportPDF = async () => {
    if (!isClient) return;

    const element = document.getElementById("resume-preview");
    if (!element) {
      alert("Resume preview not found");
      return;
    }

    try {
      // Dynamic import for client-side only
      const html2pdf = (await import("html2pdf.js")).default;

      const opt = {
        margin: [10, 10, 10, 10],
        filename: `${resumeData?.personalInfo.name || "resume"}-resume.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("Error exporting PDF:", error);
      alert("Failed to export PDF. Please try again.");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center">
        <div className="text-light-text dark:text-dark-text">Loading...</div>
      </div>
    );
  }

  if (!resumeData) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <p className="text-light-text dark:text-dark-text mb-4">
            No resume data found. Please go back and create your resume.
          </p>
          <Link href="/">
            <motion.button
              className="px-4 py-2 bg-light-accent dark:bg-dark-accent text-white rounded-lg hover:opacity-90 flex items-center gap-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 gradient-bg opacity-30 dark:opacity-20 -z-10"></div>
      <div className="fixed inset-0 bg-light-bg dark:bg-dark-bg -z-10"></div>
      
      {/* Floating orbs */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-light-accent/20 dark:bg-dark-accent/20 rounded-full blur-3xl -z-0 animate-pulse"></div>
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-purple-500/20 dark:bg-purple-400/20 rounded-full blur-3xl -z-0 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <ThemeToggle />

      {/* Header */}
      <header className="glass border-b border-white/20 dark:border-white/10 sticky top-0 z-40 backdrop-blur-xl mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <Link href="/">
              <motion.button
                className="px-6 py-3 glass-input border border-white/30 dark:border-white/10 rounded-xl text-light-text dark:text-dark-text hover:border-light-accent dark:hover:border-dark-accent flex items-center gap-2 font-medium transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Editor
              </motion.button>
            </Link>
            <div className="flex gap-3 flex-wrap">
              <CopyResumeButton data={resumeData} />
              <motion.button
                onClick={handlePrint}
                className="px-6 py-3 glass-input border border-white/30 dark:border-white/10 rounded-xl text-light-text dark:text-dark-text hover:border-light-accent dark:hover:border-dark-accent flex items-center gap-2 font-medium transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Printer className="w-5 h-5" />
                Print
              </motion.button>
              <PDFExportButton onExport={handleExportPDF} />
            </div>
          </div>
        </div>
      </header>

      {/* Preview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div id="resume-preview">
          <PreviewCard data={resumeData} />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

