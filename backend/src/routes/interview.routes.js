import express from "express"
import interviewController from "../controller/interview.controller.js"
import isLogin from "../middleware/islogin.middleware.js"

let router = express.Router()

// interview Routes
router.post("/test",isLogin,interviewController.GenerateInteriewReport)

export default router