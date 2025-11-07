import { ResumeData, Experience } from "./types";

const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

// Mock response for when API key is not set
const mockResponse = {
  summary: "Experienced professional with a strong background in technology and innovation. Proven track record of delivering high-quality solutions and driving business growth through strategic thinking and technical expertise.",
  bullets: [
    "Led cross-functional teams to deliver projects 20% ahead of schedule",
    "Implemented process improvements that increased efficiency by 35%",
    "Collaborated with stakeholders to define and execute strategic initiatives",
    "Mentored junior team members and contributed to knowledge sharing initiatives"
  ],
  skills: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "AWS", "Docker", "Kubernetes"]
};

async function callOpenAI(prompt: string, maxTokens: number = 200) {
  if (!OPENAI_API_KEY) {
    // Return mock response after a delay to simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    return null;
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a professional resume writer. Generate concise, impactful, and results-oriented content for resumes."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: maxTokens,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || null;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return null;
  }
}

export async function generateSummary(resumeData: ResumeData): Promise<string> {
  const { personalInfo, experience, skills, jobTitle } = resumeData;
  
  const prompt = `Write a concise, professional summary (2-3 sentences) for a resume. 
  
  Name: ${personalInfo.name}
  Title: ${personalInfo.title}
  Target Job: ${jobTitle || personalInfo.title}
  Key Skills: ${skills.slice(0, 10).join(", ")}
  Experience: ${experience.length} position(s)
  
  Make it compelling, professional, and tailored to the target role.`;

  const response = await callOpenAI(prompt, 150);
  
  if (!response) {
    return mockResponse.summary;
  }

  return response.trim();
}

export async function generateExperienceBullets(experience: Experience): Promise<string[]> {
  const prompt = `Generate 4-5 strong, results-oriented bullet points for this work experience. Use action verbs and quantify achievements where possible.
  
  Role: ${experience.role}
  Company: ${experience.company}
  Duration: ${experience.startDate} - ${experience.endDate}
  Current Description: ${experience.description}
  
  Format as a JSON array of strings, each bullet point should be concise and impactful.`;

  const response = await callOpenAI(prompt, 300);
  
  if (!response) {
    return mockResponse.bullets;
  }

  try {
    // Try to parse as JSON array
    const parsed = JSON.parse(response);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch {
    // If not JSON, split by newlines and clean up
    const bullets = response
      .split("\n")
      .map(line => line.replace(/^[-•*]\s*/, "").trim())
      .filter(line => line.length > 0)
      .slice(0, 5);
    
    return bullets.length > 0 ? bullets : mockResponse.bullets;
  }

  return mockResponse.bullets;
}

export async function refineSkills(skills: string[]): Promise<string[]> {
  const prompt = `Refine and organize this list of skills for a resume. Group related skills, remove duplicates, and present them in a professional format. Return only the skills, one per line, no numbering or bullets.
  
  Current Skills: ${skills.join(", ")}
  
  Make it concise and professional.`;

  const response = await callOpenAI(prompt, 200);
  
  if (!response) {
    return mockResponse.skills;
  }

  const refined = response
    .split("\n")
    .map(line => line.replace(/^[-•*\d.]\s*/, "").trim())
    .filter(line => line.length > 0 && line.length < 50);

  return refined.length > 0 ? refined : skills;
}

