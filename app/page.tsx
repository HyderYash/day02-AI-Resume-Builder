"use client";

import { useState, useEffect, useRef } from "react";
import { ResumeData } from "@/lib/types";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { ResumeForm } from "@/components/ResumeForm";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Toast } from "@/components/Toast";
import { Footer } from "@/components/Footer";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { ResumeActions } from "@/components/ResumeActions";
import { ResumeValidator } from "@/components/ResumeValidator";
import { Eye, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const initialResumeData: ResumeData = {
  personalInfo: {
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
  },
  summary: "",
  experience: [],
  education: [],
  skills: [],
  customSections: [],
  jobTitle: "",
};

export default function Home() {
  const { data: savedData, saveData, clearData, isLoading } = useLocalStorage();
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [generatingBulletsId, setGeneratingBulletsId] = useState<string | null>(null);
  const [isRefiningSkills, setIsRefiningSkills] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
    isVisible: boolean;
  }>({
    message: "",
    type: "success",
    isVisible: false,
  });
  const [showClearModal, setShowClearModal] = useState(false);

  const hasInitialized = useRef(false);

  // Load saved data on mount (only once)
  useEffect(() => {
    if (!isLoading && !hasInitialized.current) {
      if (savedData) {
        setResumeData(savedData);
      }
      hasInitialized.current = true;
    }
  }, [isLoading, savedData]);

  // Auto-save to localStorage (debounced, skip initial load)
  useEffect(() => {
    if (isLoading || !hasInitialized.current) return; // Don't save while loading or on initial load

    const timeoutId = setTimeout(() => {
      saveData(resumeData);
    }, 500); // Debounce saves by 500ms

    return () => clearTimeout(timeoutId);
  }, [resumeData, isLoading, saveData]);

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ message, type, isVisible: true });
  };

  const handleGenerateSummary = async () => {
    if (!resumeData.personalInfo.name || !resumeData.personalInfo.title) {
      showToast("Please fill in your name and title first", "error");
      return;
    }

    setIsGeneratingSummary(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "summary", data: resumeData }),
      });

      const { result, error } = await response.json();

      if (error || !result) {
        throw new Error(error || "Failed to generate summary");
      }

      setResumeData({ ...resumeData, summary: result });
      showToast("Summary generated successfully!", "success");
    } catch (error) {
      console.error("Error generating summary:", error);
      showToast("Failed to generate summary. Please try again.", "error");
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  const handleGenerateBullets = async (id: string) => {
    const experience = resumeData.experience.find((exp) => exp.id === id);
    if (!experience || !experience.role || !experience.company) {
      showToast("Please fill in role and company first", "error");
      return;
    }

    setGeneratingBulletsId(id);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "bullets", data: experience }),
      });

      const { result, error } = await response.json();

      if (error || !result) {
        throw new Error(error || "Failed to generate bullets");
      }

      const bullets = Array.isArray(result) ? result : [result];
      setResumeData({
        ...resumeData,
        experience: resumeData.experience.map((exp) =>
          exp.id === id ? { ...exp, bullets } : exp
        ),
      });
      showToast("Bullet points generated successfully!", "success");
    } catch (error) {
      console.error("Error generating bullets:", error);
      showToast("Failed to generate bullet points. Please try again.", "error");
    } finally {
      setGeneratingBulletsId(null);
    }
  };

  const handleRefineSkills = async () => {
    if (resumeData.skills.length === 0) {
      showToast("Please add some skills first", "error");
      return;
    }

    setIsRefiningSkills(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "skills", data: resumeData.skills }),
      });

      const { result, error } = await response.json();

      if (error || !result) {
        throw new Error(error || "Failed to refine skills");
      }

      const refinedSkills = Array.isArray(result) ? result : [result];
      setResumeData({ ...resumeData, skills: refinedSkills });
      showToast("Skills refined successfully!", "success");
    } catch (error) {
      console.error("Error refining skills:", error);
      showToast("Failed to refine skills. Please try again.", "error");
    } finally {
      setIsRefiningSkills(false);
    }
  };

  const handleClearData = () => {
    clearData();
    setResumeData(initialResumeData);
    setShowClearModal(false);
    showToast("All data cleared", "info");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 gradient-bg opacity-30 dark:opacity-20 -z-10"></div>
      <div className="fixed inset-0 bg-light-bg dark:bg-dark-bg -z-10"></div>

      {/* Floating orbs for visual interest */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-light-accent/20 dark:bg-dark-accent/20 rounded-full blur-3xl -z-0 animate-pulse"></div>
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-purple-500/20 dark:bg-purple-400/20 rounded-full blur-3xl -z-0 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <ThemeToggle />

      {/* Header */}
      <header className="glass border-b border-white/20 dark:border-white/10 sticky top-0 z-40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-light-accent via-purple-500 to-light-accent dark:from-dark-accent dark:via-purple-400 dark:to-dark-accent bg-clip-text text-transparent">
                AI Resume Builder
              </h1>
              <p className="text-sm md:text-base text-light-text dark:text-dark-text opacity-80 mt-2 font-medium">
                Day 2 of #100Days100Projects by Yash Sharma
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/preview">
                <motion.button
                  className="px-6 py-3 bg-gradient-to-r from-light-accent to-purple-500 dark:from-dark-accent dark:to-purple-400 text-white rounded-xl hover:opacity-90 flex items-center gap-2 font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Eye className="w-5 h-5" />
                  Preview
                </motion.button>
              </Link>
              <motion.button
                onClick={() => setShowClearModal(true)}
                className="px-6 py-3 glass-input border border-red-400/50 dark:border-red-500/50 text-red-500 dark:text-red-400 rounded-xl hover:bg-red-50/50 dark:hover:bg-red-900/20 flex items-center gap-2 font-medium transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Trash2 className="w-5 h-5" />
                Clear All
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Dashboard Components */}
          <div className="lg:col-span-1 space-y-6">
            {/* Progress Indicator */}
            <ProgressIndicator data={resumeData} />

            {/* Resume Actions */}
            <ResumeActions
              data={resumeData}
              onDataChange={setResumeData}
              onToast={showToast}
            />

            {/* Resume Validator */}
            <ResumeValidator data={resumeData} />
          </div>

          {/* Right Side - Form */}
          <div className="lg:col-span-3">
            <ResumeForm
              data={resumeData}
              onChange={setResumeData}
              onGenerateSummary={handleGenerateSummary}
              onGenerateBullets={handleGenerateBullets}
              onRefineSkills={handleRefineSkills}
              isGeneratingSummary={isGeneratingSummary}
              generatingBulletsId={generatingBulletsId}
              isRefiningSkills={isRefiningSkills}
            />
          </div>
        </div>
      </main>

      {/* Clear Confirmation Modal */}
      {showClearModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass-card rounded-2xl p-8 max-w-md w-full"
          >
            <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-4">
              Clear All Data?
            </h3>
            <p className="text-light-text dark:text-dark-text mb-6">
              This will permanently delete all your resume data. This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowClearModal(false)}
                className="px-4 py-2 border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text hover:bg-light-secondary dark:hover:bg-dark-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleClearData}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:opacity-90"
              >
                Clear All
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

