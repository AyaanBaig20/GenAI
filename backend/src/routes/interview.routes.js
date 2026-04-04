import express from "express"
import interviewController from "../controller/interview.controller.js"
import middleware from "../middleware/islogin.js"


let router = express.Router()

// interview Routes
router.post("/test",middleware.islogin,interviewController.GenerateInteriewReport)

export default router