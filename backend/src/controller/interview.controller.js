import { GenerateReport } from "../services/ai.services.js";
import interviewReportModel from "../models/interviewReport.model.js";

async function GenerateInteriewReport(req, res) {
  try {
    const { resume, jobdescription, selfdescription = "" } = req.body;

    // ✅ Basic validation
    if (!jobdescription || !resume) {
      return res.status(400).json({ message: "Job description and Resume is required" });
    }

    // ✅ Generate AI report
    const AIReport = await GenerateReport({
      resume,
      jobdescription,
      selfdescription
    });

    // ✅ Save to DB
    const savedReport = await interviewReportModel.create({
      user: req.user.id,
      jobDescription: jobdescription,
      resume,
      selfDescription: selfdescription,
      matchScore: AIReport.matchScore,
      technicalQuestions: AIReport.technicalQuestions,
      behavioralQuestions: AIReport.behavioralQuestions,
      skillsGap: AIReport.skillsGap,
      preparationPlan: AIReport.preparationPlan 
    });

    // ✅ Send response
    res.status(201).json({
      message: "Customize plan created",
    });

  } catch (error) {
    console.error("Error generating report:", error);

    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
}

export default { GenerateInteriewReport };