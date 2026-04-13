import express from "express"
import interviewController from "../controller/interview.controller.js"
import middleware from "../middleware/islogin.js"
import limiter from "../rateLimit/ratelimit.js"

let router = express.Router()

// interview Routes
router.post("/test",middleware.islogin,limiter.Ailimiter,interviewController.GenerateInteriewReport)

export default router