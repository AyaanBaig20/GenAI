import { GenerateResume } from "../services/resume.services.js";
import interviewReportModel from "../models/interviewReport.model.js";

async function GenerateRESUME(req, res) {
  try {
    const { interviewid } = req.body;
    console.log(interviewid);
    if(!interviewid){
        return res.json({message:"interview Id is needed"})
    }
    let report = await interviewReportModel.findById(interviewid)
    if(!report){
      return res.status(400).json({message:"Report does not exist"})
    }
    const { resume, selfdescription, jobdescription } = report;
    
    const pdfBuffer = await GenerateResume({ selfdescription, jobdescription, resume });

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=Resume.pdf",
    });

    // update report schema 
      report.resumeCreated = true
      await report.save()

    res.send(pdfBuffer);
  } catch (err) {
    console.error("Resume generation failed:", err.message);
    res.status(500).json({ error: "Failed to generate resume" });
  }
}

export default { GenerateRESUME };