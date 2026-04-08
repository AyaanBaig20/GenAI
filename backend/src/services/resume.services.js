import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import puppeteer from "puppeteer";
import { z } from "zod";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });


const resumepdfSchema = z.object({
  html: z.string(),
});

const responseSchema = {
  type: "object",
  properties: {
    html: { type: "string" },
  },
  required: ["html"],
};

async function HTMLtoPDF(htmlContent) {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: "networkidle0" });
  const buffer = await page.pdf({ format: "A4" });
  await browser.close();
  return buffer;
}

export async function GenerateResume({ selfdescription, jobdescription, resume }) {
  console.log("Ai is working");
  
  const prompt = `Generate a professional resume for a candidate with the following information.
Resume: ${resume ?? "Not provided"}
Self Description: ${selfdescription}
Job Description: ${jobdescription}
Respond with a JSON object with a single field "html" containing full styled HTML for the resume.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema, 
      },
    });

    const raw = JSON.parse(response.text);

    const parsed = resumepdfSchema.safeParse(raw);
    if (!parsed.success) {
      throw new Error("AI returned invalid structure");
    }

    const pdfBuffer = await HTMLtoPDF(parsed.data.html);
    return pdfBuffer;

  } catch (err) {
    throw new Error(`Resume generation failed: ${err.message}`);
  }
}