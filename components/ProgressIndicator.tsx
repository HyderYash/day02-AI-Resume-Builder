"use client";

import { ResumeData } from "@/lib/types";
import { calculateResumeProgress, getResumeQuality } from "@/lib/resumeUtils";
import { CheckCircle, AlertCircle, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface ProgressIndicatorProps {
  data: ResumeData;
}

export function ProgressIndicator({ data }: ProgressIndicatorProps) {
  const progress = calculateResumeProgress(data);
  const quality = getResumeQuality(data);

  const getProgressColor = () => {
    if (progress >= 80) return "from-green-500 to-emerald-500";
    if (progress >= 60) return "from-blue-500 to-cyan-500";
    if (progress >= 40) return "from-yellow-500 to-orange-500";
    return "from-red-500 to-pink-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-6 border border-white/20 dark:border-white/10"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-light-accent to-purple-500 dark:from-dark-accent dark:to-purple-400 rounded-lg">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text">
              Resume Progress
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {quality.feedback[0]}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold bg-gradient-to-r from-light-accent to-purple-500 dark:from-dark-accent dark:to-purple-400 bg-clip-text text-transparent">
            {progress}%
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Complete</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="h-3 bg-white/20 dark:bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`h-full bg-gradient-to-r ${getProgressColor()} rounded-full`}
          />
        </div>
      </div>

      {/* Quality Score */}
      <div className="flex items-center justify-between p-3 glass-input rounded-lg border border-white/20 dark:border-white/10">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span className="text-sm font-medium text-light-text dark:text-dark-text">
            Quality Score
          </span>
        </div>
        <span className="text-lg font-bold text-light-accent dark:text-dark-accent">
          {quality.score}/100
        </span>
      </div>

      {/* Suggestions */}
      {quality.suggestions.length > 0 && (
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-light-text dark:text-dark-text">
            <AlertCircle className="w-4 h-4 text-yellow-500" />
            Suggestions:
          </div>
          <ul className="space-y-1 ml-6">
            {quality.suggestions.slice(0, 3).map((suggestion, idx) => (
              <li key={idx} className="text-xs text-gray-600 dark:text-gray-400 list-disc">
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}

