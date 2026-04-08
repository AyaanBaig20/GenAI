import express from "express"
let router = express.Router()
import ResumeController from "../controller/Resume.controller.js" 

router.post("/create",ResumeController.GenerateRESUME)

export default router