"use client";

import { useState, KeyboardEvent } from "react";
import { X, Sparkles, Plus, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SkillsInputProps {
  skills: string[];
  onChange: (skills: string[]) => void;
  onRefine?: () => void;
  isRefining?: boolean;
}

const COMMON_SKILLS = [
  "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python",
  "Java", "C++", "HTML5", "CSS3", "Tailwind CSS", "Git", "GitHub",
  "MongoDB", "PostgreSQL", "MySQL", "AWS", "Docker", "Kubernetes",
  "GraphQL", "REST API", "Express.js", "Vue.js", "Angular", "Redux",
  "Firebase", "Prisma", "Jest", "Cypress", "Figma", "Adobe XD"
];

export function SkillsInput({ skills, onChange, onRefine, isRefining }: SkillsInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      const newSkills = [...skills, trimmed];
      onChange(newSkills);
      setInputValue("");
      setShowSuggestions(false);
    } else if (trimmed && skills.includes(trimmed)) {
      // Skill already exists - provide feedback
      setInputValue("");
    }
  };

  const addMultipleSkills = (text: string) => {
    const skillsToAdd = text
      .split(/[,\n]/)
      .map(s => s.trim())
      .filter(s => s && !skills.includes(s));
    
    if (skillsToAdd.length > 0) {
      onChange([...skills, ...skillsToAdd]);
      setInputValue("");
      setShowSuggestions(false);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onChange(skills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (inputValue.includes(",") || inputValue.includes("\n")) {
        addMultipleSkills(inputValue);
      } else {
        addSkill(inputValue);
      }
    }
  };

  const handleAddClick = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    const trimmed = inputValue.trim();
    if (trimmed) {
      if (trimmed.includes(",") || trimmed.includes("\n")) {
        addMultipleSkills(trimmed);
      } else {
        addSkill(trimmed);
      }
    }
  };

  const filteredSuggestions = COMMON_SKILLS.filter(
    skill => 
      skill.toLowerCase().includes(inputValue.toLowerCase()) && 
      !skills.includes(skill)
  ).slice(0, 8);

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="space-y-3">
        <div className="flex gap-2 items-center">
          <div className="relative flex-1">
            <input
              type="text"
              id="skills-input"
              name="skills-input"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setShowSuggestions(e.target.value.length > 0);
              }}
              onKeyDown={handleKeyDown}
              onFocus={() => setShowSuggestions(inputValue.length > 0)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder="Type a skill and press Enter (or comma-separated for multiple)"
              className="w-full px-4 py-3 pl-11 rounded-xl glass-input border border-white/30 dark:border-white/10 text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent focus:border-transparent transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
              autoComplete="off"
            />
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
            
            {/* Suggestions Dropdown */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 glass-card rounded-xl border border-white/20 dark:border-white/10 shadow-xl z-50 max-h-64 overflow-y-auto"
              >
                <div className="p-2">
                  {filteredSuggestions.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => addSkill(skill)}
                      className="w-full text-left px-4 py-2 rounded-lg hover:bg-white/20 dark:hover:bg-white/10 text-light-text dark:text-dark-text transition-colors text-sm"
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
          
          <motion.button
            type="button"
            onClick={handleAddClick}
            disabled={!inputValue.trim()}
            className="px-5 py-3 glass-input border border-white/30 dark:border-white/10 rounded-xl text-light-text dark:text-dark-text hover:border-light-accent dark:hover:border-dark-accent disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium transition-all duration-200 hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5" />
            Add
          </motion.button>
          
          {onRefine && (
            <motion.button
              onClick={onRefine}
              disabled={isRefining || skills.length === 0}
              className="px-5 py-3 bg-gradient-to-r from-light-accent to-purple-500 dark:from-dark-accent dark:to-purple-400 text-white rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-4 h-4" />
              {isRefining ? "Refining..." : "Refine"}
            </motion.button>
          )}
        </div>
        
        <p className="text-xs text-gray-500 dark:text-gray-400 px-1">
          💡 Tip: Add multiple skills at once by separating them with commas (e.g., "React, Node.js, MongoDB")
        </p>
      </div>

      {/* Quick Add Common Skills */}
      {skills.length === 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-gray-400 dark:text-gray-500" />
            <p className="text-sm font-medium text-light-text dark:text-dark-text">
              Quick Add Common Skills:
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {COMMON_SKILLS.slice(0, 12).map((skill) => (
              <motion.button
                key={skill}
                onClick={() => addSkill(skill)}
                disabled={skills.includes(skill)}
                className="px-3 py-1.5 text-xs glass-input border border-white/20 dark:border-white/10 rounded-lg text-light-text dark:text-dark-text hover:border-light-accent dark:hover:border-dark-accent disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {skill}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Skills Display */}
      <div className="space-y-3">
        {skills.length > 0 && (
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-light-text dark:text-dark-text">
              {skills.length} {skills.length === 1 ? "Skill" : "Skills"} Added
            </p>
            <button
              onClick={() => onChange([])}
              className="text-xs text-red-500 dark:text-red-400 hover:underline font-medium"
            >
              Clear All
            </button>
          </div>
        )}
        <div className={`flex flex-wrap gap-2 p-4 glass-card rounded-xl border border-white/20 dark:border-white/10 ${skills.length > 0 ? 'min-h-[80px]' : 'min-h-[60px]'}`}>
          {skills.length > 0 ? (
            <AnimatePresence mode="popLayout">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -10 }}
                  layout
                  transition={{ duration: 0.2, delay: index * 0.02 }}
                  className="group flex items-center gap-2 px-4 py-2.5 glass-input rounded-full text-sm border border-white/30 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
                >
                  <span className="text-light-text dark:text-dark-text font-medium">{skill}</span>
                  <button
                    onClick={() => removeSkill(skill)}
                    className="opacity-0 group-hover:opacity-100 hover:bg-red-500/20 dark:hover:bg-red-500/30 rounded-full p-1 transition-all duration-200"
                    aria-label={`Remove ${skill}`}
                  >
                    <X className="w-3.5 h-3.5 text-red-500 dark:text-red-400" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <div className="w-full flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm py-4">
              No skills added yet. Start typing to add skills!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

