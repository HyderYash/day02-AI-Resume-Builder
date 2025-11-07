import { NextRequest, NextResponse } from "next/server";
import { generateSummary, generateExperienceBullets, refineSkills } from "@/lib/ai";
import { ResumeData, Experience } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    let result;

    switch (type) {
      case "summary":
        result = await generateSummary(data as ResumeData);
        return NextResponse.json({ result });

      case "bullets":
        result = await generateExperienceBullets(data as Experience);
        return NextResponse.json({ result });

      case "skills":
        result = await refineSkills(data as string[]);
        return NextResponse.json({ result });

      default:
        return NextResponse.json(
          { error: "Invalid type" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

