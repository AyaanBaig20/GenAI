import express from "express"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.routes.js"
import interviewRouter from "./routes/interview.routes.js"
import resumeRouter from "./routes/resume.routes.js"
import cors from "cors"


const app = express()
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));
app.use(express.json())
app.use(cookieParser())

// import routes
// auth routes
app.use("/auth/api",authRouter)
app.use("/interview/api",interviewRouter)
app.use("/api/resume",resumeRouter)

export default app
