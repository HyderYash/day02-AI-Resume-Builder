"use client";

import { ResumeData } from "@/lib/types";
import { motion } from "framer-motion";
import { formatDate, formatPhoneNumber } from "@/lib/format";

interface PreviewCardProps {
  data: ResumeData;
}

export function PreviewCard({ data }: PreviewCardProps) {
  const { personalInfo, summary, experience, education, skills, customSections } = data;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card rounded-2xl p-10 md:p-12 shadow-2xl max-w-4xl mx-auto border border-white/30 dark:border-white/10"
    >
      {/* Header */}
      <div className="border-b border-white/20 dark:border-white/10 pb-8 mb-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-100 dark:via-gray-200 dark:to-gray-100 bg-clip-text text-transparent mb-3">
          {personalInfo.name || "Your Name"}
        </h1>
        <p className="text-2xl font-semibold bg-gradient-to-r from-light-accent to-purple-500 dark:from-dark-accent dark:to-purple-400 bg-clip-text text-transparent mb-6">
          {personalInfo.title || "Your Title"}
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-light-text dark:text-dark-text">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{formatPhoneNumber(personalInfo.phone)}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && (
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
              LinkedIn
            </a>
          )}
          {personalInfo.github && (
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
              GitHub
            </a>
          )}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-1 w-12 bg-gradient-to-r from-light-accent to-purple-500 dark:from-dark-accent dark:to-purple-400 rounded-full"></div>
            <h2 className="text-2xl font-bold text-light-text dark:text-dark-text">
              Professional Summary
            </h2>
          </div>
          <p className="text-light-text dark:text-dark-text leading-relaxed">
            {summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-light-text dark:text-dark-text mb-4">
            Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="border-l-4 border-light-accent dark:border-dark-accent pl-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-light-text dark:text-dark-text">
                      {exp.role}
                    </h3>
                    <p className="text-lg text-light-accent dark:text-dark-accent">
                      {exp.company}
                    </p>
                  </div>
                  <span className="text-sm text-light-text dark:text-dark-text">
                    {(() => {
                      const start = exp.startDate ? formatDate(exp.startDate) : "";
                      const end = exp.current ? "Present" : (exp.endDate ? formatDate(exp.endDate) : "");
                      if (!start && !end) return "";
                      if (start && end) return `${start} - ${end}`;
                      return start || end;
                    })()}
                  </span>
                </div>
                {exp.bullets.length > 0 ? (
                  <ul className="list-disc list-inside space-y-1 text-light-text dark:text-dark-text ml-4">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                ) : (
                  exp.description && (
                    <p className="text-light-text dark:text-dark-text mt-2">
                      {exp.description}
                    </p>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-light-text dark:text-dark-text mb-4">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <h3 className="text-lg font-semibold text-light-text dark:text-dark-text">
                  {edu.degree}
                </h3>
                <p className="text-light-accent dark:text-dark-accent">
                  {edu.institution} {edu.year && `• ${edu.year}`}
                </p>
                {edu.gpa && (
                  <p className="text-sm text-light-text dark:text-dark-text">
                    GPA: {edu.gpa}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-light-text dark:text-dark-text mb-4">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-light-secondary dark:bg-dark-secondary rounded-full text-sm text-light-text dark:text-dark-text"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Custom Sections */}
      {customSections.map((section) => (
        <div key={section.id} className="mb-6">
          <h2 className="text-2xl font-semibold text-light-text dark:text-dark-text mb-4">
            {section.title}
          </h2>
          <ul className="list-disc list-inside space-y-1 text-light-text dark:text-dark-text ml-4">
            {section.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </motion.div>
  );
}

