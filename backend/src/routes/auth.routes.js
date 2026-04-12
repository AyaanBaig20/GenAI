import authController from "../controller/auth.controller.js"
import express from "express"
import middleware from "../middleware/islogin.js"

let router  = express.Router()

// Login api => auth/api/login
router.post("/login",authController.loginController)

// signup api => auth/api/signup
router.post("/signup",authController.signupController)

// logout => auth/api/logout
router.get("/logout",authController.logout)

// Get me
router.get("/get/me",middleware.islogin,authController.Getme)

router.get("/get/data",middleware.islogin,authController.getreportdata)


export default router