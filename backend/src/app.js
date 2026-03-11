import express from "express"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.routes.js"

const app = express()
app.use(express.json())
app.use(cookieParser())

// import routes
// auth routes
app.use("/auth/api",authRouter)

export default app
