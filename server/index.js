import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import authRoutes from './routes/authRoutes.js'
import historyRoutes from './routes/historyRoutes.js'

// console.log("express is -", express)


const app  = express()

// const cors = require("cors");

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://test-my-api-wheat.vercel.app"
  ],
  credentials: true
}))

const PORT = process.env.PORT || 5000;

// app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use('/api/auth', authRoutes)
app.use('/api/history', historyRoutes)

connectDB()


app.get("/",(req,res)=>{
    res.send("i am home page")
})

app.listen(PORT,()=>{
    console.log(`starteddd on port ${PORT}` ) 
})



