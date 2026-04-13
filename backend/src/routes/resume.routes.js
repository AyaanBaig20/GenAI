import express from "express"
import ResumeController from "../controller/Resume.controller.js" 
import limiter from "../rateLimit/ratelimit.js"
import middleware from "../middleware/islogin.js"

let router = express.Router()
router.post("/create",middleware.islogin,limiter.Ailimiter,ResumeController.GenerateRESUME)

export default router