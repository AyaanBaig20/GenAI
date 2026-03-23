import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

const ReportSchema = z.object({
  matchScore: z.number().min(1).max(100),
  technicalQuestions: z.array(z.object({ question: z.string() })).length(5),
  behavioralQuestions: z.array(z.object({ question: z.string() })).length(5),
  skillsGap: z.array(
    z.object({
      skills: z.string(),
      severity: z.enum(["low", "medium", "high"]),
    })
  ).length(5),
  preparationPlan: z.array(
    z.object({
      day: z.number(),
      task: z.array(z.string()),
    })
  ).length(5),
});

// ✅ Manually define the JSON schema instead of using zodToJsonSchema
const responseSchema = {
  type: "object",
  properties: {
    matchScore: { type: "number", minimum: 1, maximum: 100 },
    technicalQuestions: {
      type: "array",
      minItems: 5,
      maxItems: 5,
      items: {
        type: "object",
        properties: { question: { type: "string" } },
        required: ["question"],
      },
    },
    behavioralQuestions: {
      type: "array",
      minItems: 5,
      maxItems: 5,
      items: {
        type: "object",
        properties: { question: { type: "string" } },
        required: ["question"],
      },
    },
    skillsGap: {
      type: "array",
      minItems: 5,
      maxItems: 5,
      items: {
        type: "object",
        properties: {
          skills: { type: "string" },
          severity: { type: "string", enum: ["low", "medium", "high"] },
        },
        required: ["skills", "severity"],
      },
    },
    preparationPlan: {
      type: "array",
      minItems: 5,
      maxItems: 5,
      items: {
        type: "object",
        properties: {
          day: { type: "number" },
          task: { type: "array", items: { type: "string" } },
        },
        required: ["day", "task"],
      },
    },
  },
  required: [
    "matchScore",
    "technicalQuestions",
    "behavioralQuestions",
    "skillsGap",
    "preparationPlan",
  ],
};

export async function GenerateReport({ selfdescription, jobdescription, resume }) {
  console.log("AI working");

  const prompt = `
You are an expert technical recruiter. Analyze the candidate's profile against the job description and return a structured JSON report.

--- JOB DESCRIPTION ---
${jobdescription}

--- RESUME ---
${resume ?? "Not provided"}

--- SELF DESCRIPTION ---
${selfdescription}

Generate:
- matchScore: how well the candidate matches the job (1–100)
- technicalQuestions: 5 technical interview questions based on the job
- behavioralQuestions: 5 behavioral interview questions
- skillsGap: 5 missing or weak skills with severity (low/medium/high)
- preparationPlan: 5-day plan where each day has a list of tasks
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: responseSchema, // ✅ use responseSchema, not responseJsonSchema
    },
  });

  const raw = JSON.parse(response.text);
  const parsed = ReportSchema.safeParse(raw);

  if (!parsed.success) {
    console.error("Validation failed:", parsed.error.format());
    throw new Error("AI returned invalid structure");
  }
  return parsed.data;
}