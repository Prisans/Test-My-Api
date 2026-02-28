import dotenv from "dotenv"
dotenv.config()
import express from "express"
import connectDB from "./config/db.js"
import authRoutes from './routes/authRoutes.js'

// console.log("express is -", express)

const app  = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use('/api/auth', authRoutes)

connectDB()


app.get("/",(req,res)=>{
    res.send("i am home page")
})

app.listen(process.env.PORT,()=>{
    console.log("starteddd") 
})



