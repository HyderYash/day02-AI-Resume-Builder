"use client";

import { useState, useEffect } from "react";
import { ResumeData, PersonalInfo, Experience, Education, CustomSection } from "@/lib/types";
import { SectionCard } from "./SectionCard";
import { ExperienceForm } from "./ExperienceForm";
import { SkillsInput } from "./SkillsInput";
import { Sparkles, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { formatPhoneNumber, formatURL, formatYear } from "@/lib/format";

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  onGenerateSummary?: () => void;
  onGenerateBullets?: (id: string) => void;
  onRefineSkills?: () => void;
  isGeneratingSummary?: boolean;
  generatingBulletsId?: string | null;
  isRefiningSkills?: boolean;
}

export function ResumeForm({
  data,
  onChange,
  onGenerateSummary,
  onGenerateBullets,
  onRefineSkills,
  isGeneratingSummary,
  generatingBulletsId,
  isRefiningSkills,
}: ResumeFormProps) {
  const updatePersonalInfo = (updates: Partial<PersonalInfo>) => {
    onChange({ ...data, personalInfo: { ...data.personalInfo, ...updates } });
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      degree: "",
      institution: "",
      year: "",
    };
    onChange({ ...data, education: [...data.education, newEdu] });
  };

  const updateEducation = (id: string, updates: Partial<Education>) => {
    onChange({
      ...data,
      education: data.education.map((edu) =>
        edu.id === id ? { ...edu, ...updates } : edu
      ),
    });
  };

  const removeEducation = (id: string) => {
    onChange({
      ...data,
      education: data.education.filter((edu) => edu.id !== id),
    });
  };

  const addCustomSection = () => {
    const newSection: CustomSection = {
      id: Date.now().toString(),
      title: "",
      items: [],
    };
    onChange({ ...data, customSections: [...data.customSections, newSection] });
  };

  const updateCustomSection = (id: string, updates: Partial<CustomSection>) => {
    onChange({
      ...data,
      customSections: data.customSections.map((section) =>
        section.id === id ? { ...section, ...updates } : section
      ),
    });
  };

  const removeCustomSection = (id: string) => {
    onChange({
      ...data,
      customSections: data.customSections.filter((section) => section.id !== id),
    });
  };

  const addCustomItem = (sectionId: string) => {
    updateCustomSection(sectionId, {
      items: [...data.customSections.find((s) => s.id === sectionId)!.items, ""],
    });
  };

  const updateCustomItem = (sectionId: string, index: number, value: string) => {
    const section = data.customSections.find((s) => s.id === sectionId)!;
    const newItems = [...section.items];
    newItems[index] = value;
    updateCustomSection(sectionId, { items: newItems });
  };

  const removeCustomItem = (sectionId: string, index: number) => {
    const section = data.customSections.find((s) => s.id === sectionId)!;
    const newItems = section.items.filter((_, i) => i !== index);
    updateCustomSection(sectionId, { items: newItems });
  };

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <SectionCard title="Personal Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Full Name"
            value={data.personalInfo.name}
            onChange={(e) => updatePersonalInfo({ name: e.target.value })}
            className="glass-input px-4 py-3 rounded-xl border border-white/30 dark:border-white/10 text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent focus:border-transparent transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Professional Title"
            value={data.personalInfo.title}
            onChange={(e) => updatePersonalInfo({ title: e.target.value })}
            className="glass-input px-4 py-3 rounded-xl border border-white/30 dark:border-white/10 text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent focus:border-transparent transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={data.personalInfo.email}
            onChange={(e) => updatePersonalInfo({ email: e.target.value })}
            className="glass-input px-4 py-3 rounded-xl border border-white/30 dark:border-white/10 text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent focus:border-transparent transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Phone (e.g., (555) 123-4567)"
            value={data.personalInfo.phone}
            onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
            onBlur={(e) => {
              const formatted = formatPhoneNumber(e.target.value);
              if (formatted !== e.target.value) {
                updatePersonalInfo({ phone: formatted });
              }
            }}
            className="glass-input px-4 py-3 rounded-xl border border-white/30 dark:border-white/10 text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent focus:border-transparent transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Location"
            value={data.personalInfo.location}
            onChange={(e) => updatePersonalInfo({ location: e.target.value })}
            className="glass-input px-4 py-3 rounded-xl border border-white/30 dark:border-white/10 text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent focus:border-transparent transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
          <input
            type="url"
            id="linkedin"
            name="linkedin"
            placeholder="LinkedIn URL (e.g., linkedin.com/in/username)"
            value={data.personalInfo.linkedin}
            onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
            onBlur={(e) => {
              const formatted = formatURL(e.target.value);
              if (formatted !== e.target.value) {
                updatePersonalInfo({ linkedin: formatted });
              }
            }}
            className="glass-input px-4 py-3 rounded-xl border border-white/30 dark:border-white/10 text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent focus:border-transparent transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
          <input
            type="url"
            id="github"
            name="github"
            placeholder="GitHub URL (e.g., github.com/username)"
            value={data.personalInfo.github}
            onChange={(e) => updatePersonalInfo({ github: e.target.value })}
            onBlur={(e) => {
              const formatted = formatURL(e.target.value);
              if (formatted !== e.target.value) {
                updatePersonalInfo({ github: formatted });
              }
            }}
            className="glass-input px-4 py-3 rounded-xl border border-white/30 dark:border-white/10 text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent focus:border-transparent transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            placeholder="Target Job Title (for AI generation)"
            value={data.jobTitle || ""}
            onChange={(e) => onChange({ ...data, jobTitle: e.target.value })}
            className="glass-input px-4 py-3 rounded-xl border border-white/30 dark:border-white/10 text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent focus:border-transparent transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
        </div>
      </SectionCard>

      {/* Professional Summary */}
      <SectionCard title="Professional Summary">
        <div className="space-y-4">
          <textarea
            id="summary"
            name="summary"
            placeholder="Write a brief professional summary or use AI to generate one..."
            value={data.summary}
            onChange={(e) => onChange({ ...data, summary: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 rounded-xl glass-input border border-white/30 dark:border-white/10 text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent focus:border-transparent transition-all duration-200 resize-none placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
          {onGenerateSummary && (
            <motion.button
              onClick={onGenerateSummary}
              disabled={isGeneratingSummary}
              className="px-6 py-3 bg-gradient-to-r from-light-accent to-purple-500 dark:from-dark-accent dark:to-purple-400 text-white rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-4 h-4" />
              {isGeneratingSummary ? "Generating Summary..." : "Generate Summary with AI"}
            </motion.button>
          )}
        </div>
      </SectionCard>

      {/* Experience */}
      <SectionCard title="Experience">
        <ExperienceForm
          experiences={data.experience}
          onChange={(experiences) => onChange({ ...data, experience: experiences })}
          onGenerateBullets={onGenerateBullets}
          generatingId={generatingBulletsId}
        />
      </SectionCard>

      {/* Education */}
      <SectionCard title="Education">
        <div className="space-y-4">
          {data.education.map((edu) => (
            <div
              key={edu.id}
              className="p-5 glass-card rounded-xl border border-white/20 dark:border-white/10 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => removeEducation(edu.id)}
                  className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  id={`education-degree-${edu.id}`}
                  name={`education-degree-${edu.id}`}
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                  className="glass-input px-4 py-3 rounded-xl border border-white/30 dark:border-white/10 text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent focus:border-transparent transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
                <input
                  type="text"
                  id={`education-institution-${edu.id}`}
                  name={`education-institution-${edu.id}`}
                  placeholder="Institution"
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                  className="glass-input px-4 py-3 rounded-xl border border-white/30 dark:border-white/10 text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent focus:border-transparent transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
                <input
                  type="text"
                  id={`education-year-${edu.id}`}
                  name={`education-year-${edu.id}`}
                  placeholder="Year (e.g., 2020)"
                  value={edu.year}
                  onChange={(e) => updateEducation(edu.id, { year: e.target.value })}
                  onBlur={(e) => {
                    const formatted = formatYear(e.target.value);
                    if (formatted !== e.target.value) {
                      updateEducation(edu.id, { year: formatted });
                    }
                  }}
                  className="glass-input px-4 py-3 rounded-xl border border-white/30 dark:border-white/10 text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent focus:border-transparent transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
                <input
                  type="text"
                  id={`education-gpa-${edu.id}`}
                  name={`education-gpa-${edu.id}`}
                  placeholder="GPA (optional)"
                  value={edu.gpa || ""}
                  onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                  className="glass-input px-4 py-3 rounded-xl border border-white/30 dark:border-white/10 text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent focus:border-transparent transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
              </div>
            </div>
          ))}
          <motion.button
            onClick={addEducation}
            className="w-full py-4 border-2 border-dashed border-white/40 dark:border-white/20 rounded-xl text-light-text dark:text-dark-text glass-input hover:border-light-accent dark:hover:border-dark-accent transition-all duration-300 flex items-center justify-center gap-2 font-medium hover:scale-[1.02]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="w-5 h-5" />
            Add Education
          </motion.button>
        </div>
      </SectionCard>

      {/* Skills */}
      <SectionCard title="Skills">
        <SkillsInput
          skills={data.skills}
          onChange={(skills) => onChange({ ...data, skills })}
          onRefine={onRefineSkills}
          isRefining={isRefiningSkills}
        />
      </SectionCard>

      {/* Custom Sections */}
      {data.customSections.map((section) => (
        <SectionCard key={section.id} title={section.title || "Custom Section"}>
          <div className="space-y-4">
            <input
              type="text"
              id={`custom-section-title-${section.id}`}
              name={`custom-section-title-${section.id}`}
              placeholder="Section Title"
              value={section.title}
              onChange={(e) => updateCustomSection(section.id, { title: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-light-border dark:border-dark-border bg-white dark:bg-dark-bg text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent"
            />
            <div className="space-y-2">
              {section.items.map((item, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    id={`custom-section-item-${section.id}-${idx}`}
                    name={`custom-section-item-${section.id}-${idx}`}
                    placeholder="Item"
                    value={item}
                    onChange={(e) => updateCustomItem(section.id, idx, e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg border border-light-border dark:border-dark-border bg-white dark:bg-dark-bg text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent"
                  />
                  <button
                    onClick={() => removeCustomItem(section.id, idx)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addCustomItem(section.id)}
                className="px-4 py-2 border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text hover:bg-light-secondary dark:hover:bg-dark-secondary transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Item
              </button>
            </div>
            <button
              onClick={() => removeCustomSection(section.id)}
              className="px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Remove Section
            </button>
          </div>
        </SectionCard>
      ))}

      <motion.button
        onClick={addCustomSection}
        className="w-full py-4 border-2 border-dashed border-white/40 dark:border-white/20 rounded-xl text-light-text dark:text-dark-text glass-input hover:border-light-accent dark:hover:border-dark-accent transition-all duration-300 flex items-center justify-center gap-2 font-medium hover:scale-[1.02]"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Plus className="w-5 h-5" />
        Add Custom Section
      </motion.button>
    </div>
  );
}

