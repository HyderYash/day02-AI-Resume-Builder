import { ResumeData } from "./types";

/**
 * Calculate resume completion percentage
 */
export function calculateResumeProgress(data: ResumeData): number {
  let score = 0;
  const maxScore = 100;

  // Personal Info (25 points)
  if (data.personalInfo.name) score += 5;
  if (data.personalInfo.title) score += 5;
  if (data.personalInfo.email) score += 5;
  if (data.personalInfo.phone) score += 3;
  if (data.personalInfo.location) score += 2;
  if (data.personalInfo.linkedin || data.personalInfo.github) score += 5;

  // Summary (15 points)
  if (data.summary && data.summary.length > 50) score += 15;

  // Experience (30 points)
  if (data.experience.length > 0) {
    score += 10; // Has experience
    data.experience.forEach((exp) => {
      if (exp.role && exp.company) score += 5;
      if (exp.startDate) score += 2;
      if (exp.bullets.length > 0 || exp.description) score += 3;
    });
    score = Math.min(score, maxScore * 0.3); // Cap at 30
  }

  // Education (15 points)
  if (data.education.length > 0) {
    score += 5;
    data.education.forEach((edu) => {
      if (edu.degree && edu.institution) score += 5;
    });
    score = Math.min(score, maxScore * 0.15); // Cap at 15
  }

  // Skills (15 points)
  if (data.skills.length >= 5) score += 15;
  else if (data.skills.length >= 3) score += 10;
  else if (data.skills.length >= 1) score += 5;

  return Math.min(Math.round(score), maxScore);
}

/**
 * Get resume validation errors
 */
export function validateResume(data: ResumeData): string[] {
  const errors: string[] = [];

  if (!data.personalInfo.name) {
    errors.push("Name is required");
  }
  if (!data.personalInfo.email) {
    errors.push("Email is required");
  }
  if (!data.personalInfo.title) {
    errors.push("Professional title is required");
  }
  if (data.experience.length === 0) {
    errors.push("At least one work experience is recommended");
  }
  if (data.education.length === 0) {
    errors.push("At least one education entry is recommended");
  }
  if (data.skills.length < 3) {
    errors.push("Add at least 3 skills");
  }
  if (!data.summary || data.summary.length < 50) {
    errors.push("Professional summary should be at least 50 characters");
  }

  return errors;
}

/**
 * Get resume quality score and feedback
 */
export function getResumeQuality(data: ResumeData): {
  score: number;
  feedback: string[];
  suggestions: string[];
} {
  const progress = calculateResumeProgress(data);
  const errors = validateResume(data);
  const feedback: string[] = [];
  const suggestions: string[] = [];

  // Score calculation
  let qualityScore = progress;
  if (errors.length === 0) qualityScore += 10;
  if (data.experience.length >= 2) qualityScore += 5;
  if (data.skills.length >= 10) qualityScore += 5;
  qualityScore = Math.min(qualityScore, 100);

  // Feedback
  if (progress >= 90) {
    feedback.push("Excellent! Your resume is well-complete.");
  } else if (progress >= 70) {
    feedback.push("Good progress! A few more details would make it perfect.");
  } else if (progress >= 50) {
    feedback.push("You're halfway there! Keep adding more information.");
  } else {
    feedback.push("Getting started! Add more details to strengthen your resume.");
  }

  // Suggestions
  if (!data.personalInfo.linkedin && !data.personalInfo.github) {
    suggestions.push("Add LinkedIn or GitHub profile to increase visibility");
  }
  if (data.experience.length === 0) {
    suggestions.push("Add your work experience to showcase your expertise");
  }
  if (data.experience.some((exp) => exp.bullets.length === 0)) {
    suggestions.push("Add bullet points to your experience entries for better impact");
  }
  if (data.skills.length < 5) {
    suggestions.push("Add more skills to demonstrate your technical expertise");
  }
  if (!data.summary || data.summary.length < 100) {
    suggestions.push("Expand your professional summary to make a stronger first impression");
  }

  return {
    score: qualityScore,
    feedback,
    suggestions,
  };
}

/**
 * Export resume data as JSON
 */
export function exportResumeAsJSON(data: ResumeData): string {
  return JSON.stringify(data, null, 2);
}

/**
 * Import resume data from JSON
 */
export function importResumeFromJSON(jsonString: string): ResumeData | null {
  try {
    const data = JSON.parse(jsonString);
    // Basic validation
    if (data && data.personalInfo) {
      return data as ResumeData;
    }
    return null;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
}

/**
 * Duplicate resume data
 */
export function duplicateResume(data: ResumeData): ResumeData {
  return {
    ...data,
    personalInfo: { ...data.personalInfo },
    experience: data.experience.map((exp) => ({
      ...exp,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      bullets: [...exp.bullets],
    })),
    education: data.education.map((edu) => ({
      ...edu,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    })),
    skills: [...data.skills],
    customSections: data.customSections.map((section) => ({
      ...section,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      items: [...section.items],
    })),
  };
}

