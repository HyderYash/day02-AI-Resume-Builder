"use client";

import { ResumeData } from "@/lib/types";
import { validateResume } from "@/lib/resumeUtils";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

interface ResumeValidatorProps {
  data: ResumeData;
}

export function ResumeValidator({ data }: ResumeValidatorProps) {
  const errors = validateResume(data);
  const warnings = [];

  // Add warnings for missing optional but recommended fields
  if (!data.personalInfo.linkedin && !data.personalInfo.github) {
    warnings.push("Consider adding LinkedIn or GitHub profile");
  }
  if (data.experience.length < 2) {
    warnings.push("Having 2+ work experiences strengthens your resume");
  }
  if (data.skills.length < 5) {
    warnings.push("Add more skills to showcase your expertise");
  }

  const isValid = errors.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-6 border border-white/20 dark:border-white/10"
    >
      <div className="flex items-center gap-3 mb-4">
        {isValid ? (
          <CheckCircle2 className="w-6 h-6 text-green-500" />
        ) : (
          <XCircle className="w-6 h-6 text-red-500" />
        )}
        <h3 className="text-lg font-semibold text-light-text dark:text-dark-text">
          Resume Validation
        </h3>
      </div>

      {isValid ? (
        <div className="space-y-2">
          <p className="text-sm text-green-600 dark:text-green-400 font-medium">
            ✓ Your resume meets all required criteria!
          </p>
          {warnings.length > 0 && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-yellow-600 dark:text-yellow-400">
                <AlertTriangle className="w-4 h-4" />
                Recommendations:
              </div>
              <ul className="space-y-1 ml-6">
                {warnings.map((warning, idx) => (
                  <li key={idx} className="text-xs text-gray-600 dark:text-gray-400 list-disc">
                    {warning}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-red-600 dark:text-red-400 font-medium">
            Please fix the following issues:
          </p>
          <ul className="space-y-2">
            {errors.map((error, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-2 text-sm text-red-600 dark:text-red-400"
              >
                <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}

