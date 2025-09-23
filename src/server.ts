import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { connectDB } from "./config/db"

import authRouter from "./routes/auth"
import hodRouter from "./routes/hod"
import subjectRouter from "./routes/subject"
import subjectBulkRouter from "./routes/studentBulk"
import hodCsvRouter from "./routes/hodCsvRoutes"

dotenv.config()

const app = express()
app.use(cors());
app.use(express.json());//middelware

app.use("/api/auth", authRouter)
app.use("/api/hod", hodRouter)
app.use("/api/subject", subjectRouter)
app.use("/api/hod", hodCsvRouter)
app.use("/api/subject", subjectBulkRouter)

const PORT = process.env.PORT || 5000;


connectDB().then(() =>{
app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})
});