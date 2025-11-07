"use client";

import { ResumeData } from "@/lib/types";
import { Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface CopyResumeButtonProps {
  data: ResumeData;
}

export function CopyResumeButton({ data }: CopyResumeButtonProps) {
  const [copied, setCopied] = useState(false);

  const copyResumeText = () => {
    const { personalInfo, summary, experience, education, skills, customSections } = data;
    
    let text = "";
    
    // Header
    text += `${personalInfo.name || "Your Name"}\n`;
    text += `${personalInfo.title || "Your Title"}\n\n`;
    if (personalInfo.email) text += `Email: ${personalInfo.email}\n`;
    if (personalInfo.phone) text += `Phone: ${personalInfo.phone}\n`;
    if (personalInfo.location) text += `Location: ${personalInfo.location}\n`;
    if (personalInfo.linkedin) text += `LinkedIn: ${personalInfo.linkedin}\n`;
    if (personalInfo.github) text += `GitHub: ${personalInfo.github}\n`;
    text += "\n";
    
    // Summary
    if (summary) {
      text += `PROFESSIONAL SUMMARY\n${summary}\n\n`;
    }
    
    // Experience
    if (experience.length > 0) {
      text += "EXPERIENCE\n";
      experience.forEach((exp) => {
        text += `${exp.role} at ${exp.company}\n`;
        text += `${exp.startDate} - ${exp.current ? "Present" : exp.endDate}\n`;
        if (exp.bullets.length > 0) {
          exp.bullets.forEach((bullet) => {
            text += `• ${bullet}\n`;
          });
        } else if (exp.description) {
          text += `${exp.description}\n`;
        }
        text += "\n";
      });
    }
    
    // Education
    if (education.length > 0) {
      text += "EDUCATION\n";
      education.forEach((edu) => {
        text += `${edu.degree}\n`;
        text += `${edu.institution}${edu.year ? `, ${edu.year}` : ""}\n`;
        if (edu.gpa) text += `GPA: ${edu.gpa}\n`;
        text += "\n";
      });
    }
    
    // Skills
    if (skills.length > 0) {
      text += `SKILLS\n${skills.join(", ")}\n\n`;
    }
    
    // Custom Sections
    customSections.forEach((section) => {
      if (section.items.length > 0) {
        text += `${section.title.toUpperCase()}\n`;
        section.items.forEach((item) => {
          text += `• ${item}\n`;
        });
        text += "\n";
      }
    });
    
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <motion.button
      onClick={copyResumeText}
      className="px-4 py-2 glass-input border border-white/30 dark:border-white/10 rounded-xl text-light-text dark:text-dark-text hover:border-light-accent dark:hover:border-dark-accent flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:scale-105"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-green-500" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          <span>Copy Text</span>
        </>
      )}
    </motion.button>
  );
}

