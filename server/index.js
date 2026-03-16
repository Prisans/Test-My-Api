import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import authRoutes from './routes/authRoutes.js'
import historyRoutes from './routes/historyRoutes.js'

// console.log("express is -", express)


const app = express()

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://test-my-api-wheat.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}

app.use(cors(corsOptions))
app.options("*", cors(corsOptions)) // Handle preflight for all routes

const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/auth', authRoutes)
app.use('/api/history', historyRoutes)

app.get("/", (req, res) => {
  res.send("i am home page")
})

const startServer = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`starteddd on port ${PORT}`)
    })
  } catch (error) {
    console.error("Failed to start server:", error)
    process.exit(1)
  }
}

startServer()



