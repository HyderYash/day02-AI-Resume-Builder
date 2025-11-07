"use client";

import { useState } from "react";
import { Trash2, Sparkles, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Experience } from "@/lib/types";
import { formatDate } from "@/lib/format";

interface ExperienceFormProps {
  experiences: Experience[];
  onChange: (experiences: Experience[]) => void;
  onGenerateBullets?: (id: string) => void;
  generatingId?: string | null;
}

export function ExperienceForm({
  experiences,
  onChange,
  onGenerateBullets,
  generatingId,
}: ExperienceFormProps) {
  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      role: "",
      company: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      bullets: [],
    };
    onChange([...experiences, newExp]);
  };

  const updateExperience = (id: string, updates: Partial<Experience>) => {
    onChange(
      experiences.map((exp) => (exp.id === id ? { ...exp, ...updates } : exp))
    );
  };

  const removeExperience = (id: string) => {
    onChange(experiences.filter((exp) => exp.id !== id));
  };

  return (
    <div className="space-y-4">
      {experiences.map((exp, index) => (
        <motion.div
          key={exp.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="p-6 glass-card rounded-xl border border-white/20 dark:border-white/10 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-medium text-light-text dark:text-dark-text">
              Experience #{index + 1}
            </h3>
            <div className="flex gap-2">
              {onGenerateBullets && (
                <motion.button
                  onClick={() => onGenerateBullets(exp.id)}
                  disabled={generatingId === exp.id || !exp.role || !exp.company}
                  className="px-4 py-2 text-sm bg-gradient-to-r from-light-accent to-purple-500 dark:from-dark-accent dark:to-purple-400 text-white rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Sparkles className="w-4 h-4" />
                  {generatingId === exp.id ? "Generating..." : "Generate Bullets"}
                </motion.button>
              )}
              <button
                onClick={() => removeExperience(exp.id)}
                className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              id={`experience-role-${exp.id}`}
              name={`experience-role-${exp.id}`}
              placeholder="Job Title"
              value={exp.role}
              onChange={(e) => updateExperience(exp.id, { role: e.target.value })}
              className="px-4 py-3 rounded-xl glass-input border border-white/30 dark:border-white/10 text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent focus:border-transparent transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
            <input
              type="text"
              id={`experience-company-${exp.id}`}
              name={`experience-company-${exp.id}`}
              placeholder="Company"
              value={exp.company}
              onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
              className="px-4 py-3 rounded-xl glass-input border border-white/30 dark:border-white/10 text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent focus:border-transparent transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
            <input
              type="text"
              id={`experience-start-date-${exp.id}`}
              name={`experience-start-date-${exp.id}`}
              placeholder="Start Date (e.g., Jan 2020 or 01/2020)"
              value={exp.startDate}
              onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
              onBlur={(e) => {
                const formatted = formatDate(e.target.value);
                if (formatted !== e.target.value) {
                  updateExperience(exp.id, { startDate: formatted });
                }
              }}
              className="px-4 py-3 rounded-xl glass-input border border-white/30 dark:border-white/10 text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent focus:border-transparent transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
            <div className="flex items-center gap-2">
              <input
                type="text"
                id={`experience-end-date-${exp.id}`}
                name={`experience-end-date-${exp.id}`}
                placeholder="End Date (e.g., Dec 2023 or 12/2023)"
                value={exp.endDate}
                onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                onBlur={(e) => {
                  const formatted = formatDate(e.target.value);
                  if (formatted !== e.target.value) {
                    updateExperience(exp.id, { endDate: formatted });
                  }
                }}
                disabled={exp.current}
                className="flex-1 px-4 py-2 rounded-lg border border-light-border dark:border-dark-border bg-white dark:bg-dark-bg text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent disabled:opacity-50"
              />
              <label className="flex items-center gap-2 text-sm text-light-text dark:text-dark-text whitespace-nowrap">
                <input
                  type="checkbox"
                  id={`experience-current-${exp.id}`}
                  name={`experience-current-${exp.id}`}
                  checked={exp.current}
                  onChange={(e) => updateExperience(exp.id, { current: e.target.checked })}
                  className="w-4 h-4"
                />
                Current
              </label>
            </div>
          </div>

          <textarea
            id={`experience-description-${exp.id}`}
            name={`experience-description-${exp.id}`}
            placeholder="Brief description of your role and responsibilities..."
            value={exp.description}
            onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 rounded-xl glass-input border border-white/30 dark:border-white/10 text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent focus:border-transparent transition-all duration-200 resize-none placeholder:text-gray-400 dark:placeholder:text-gray-500 mb-4"
          />

          {exp.bullets.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-light-text dark:text-dark-text">
                Bullet Points:
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-light-text dark:text-dark-text ml-4">
                {exp.bullets.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      ))}

      <motion.button
        onClick={addExperience}
        className="w-full py-4 border-2 border-dashed border-white/40 dark:border-white/20 rounded-xl text-light-text dark:text-dark-text glass-input hover:border-light-accent dark:hover:border-dark-accent transition-all duration-300 flex items-center justify-center gap-2 font-medium hover:scale-[1.02]"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Plus className="w-5 h-5" />
        Add Experience
      </motion.button>
    </div>
  );
}

