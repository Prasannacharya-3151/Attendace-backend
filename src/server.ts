import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db"
import authRouter from "./routes/auth"
import hodRouter from "./routes/hod"
import subjectRouter from "./routes/subject"

dotenv.config()
const app = express()

app.use(express.json());//middelware
app.use("/api/auth", authRouter)
app.use("/api/hod", hodRouter)
app.use("/api/subject", subjectRouter)

const PORT = process.env.PORT || 5000;


connectDB().then(() =>{
app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})
});