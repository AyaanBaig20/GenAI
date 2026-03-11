import authController from "../controller/auth.controller.js"
import express from "express"

let router  = express.Router()

// Login api => auth/api/login
router.post("/login",authController.loginController)

// signup api => auth/api/signup
router.post("/signup",authController.signupController)

// logout => auth/api/logout
router.get("/logout",authController.logout)

export default router