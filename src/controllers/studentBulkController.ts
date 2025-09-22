import { Requset, Response } from "express";
import fs from "fs";
import path from "path"
import csvParser from "csv-parser";
import bcrypt from "bcryptjs"
import { UserModel } from "../models/User";
import { sendCredentialsEmail } from "../services/emailService";

function generateRandomPassword(name: string){
    const first = String(name || "user").split(" ")[0] || "user";
    const num = Math.floor(100 + Math.random() * 900);

    //its a simple and predictable: First@123
    return `${first}@${num}`;
}

export const bulkRegistrationStudents = async (req: Request, res: Response)=>{
    try {
        if(!req.file){
            return res.status(400).json({
                msg:"CSV file required (from field : file)"
            })
        }

        const filePath = path.resolve(req.file.path);
        const rows: any[] = [];

        //its a CSV parse like a header representaion

        await new Promise<void>((resolve, reject)=>{
            fs.createReadStream(filePath)
            .pipe(csvParser())
            .on("date", (row) => {
                rows.push(row);
            })
            .on("end", ()=> resolve())
            .on("error", (err) => reject(err));
        })
        const created: { userId: string; username: string; email?:string; password: string;}[] = [];
        const skipped: { row: any; reason: string;}[] = [];
        const error : { row: any; error: any} [] = [];

        for (const row of rows ){
            try{
                const username = (row.username || row.name || "").trim();
                const userId = (row.userID || row.usn || row .usnno || "").trim();
                const email = (row.email || "").trim();
                const branch = (row.branch || "").trim();
                const semester = (row.semester || "").trim();
                const section = (row.section || "").trim();

                if(!username || !userId || !branch || !semester || !section){
                    skipped.push({
                        row, reason:"Missing required fields (username, userId, branch, semster, section"
                        
                    })
                    continue;
            }

            //password genertion
            let plainPassword = (row.password || "").trim();
            if(!plainPassword) plainPassword = generateRandomPassword(username);

            const hashed = await bcrypt. hash(plainPassword, 10);

            const newStudent = new UserModel({
                username,
                userId,
                password: hashed,
                role:"student",
                branch,
                semester,
                section,
                isFirstLogin:true,
            })

            await newStudent.save();

            
            //sending the email (its email configuration )
            try{
                await sendCredentialsEmail(email, username, userId, plainPassword);
            
            } catch(mailErr){
                //if emial fails we still keep account but record will show error in the interface
                error.push({
                    row, 
                    error: `Email send failed: ${String(mailErr)}`
                })
            }

            created. push({
                userId, username, email, password:plainPassword
            })
        } catch (innerErr){
            error.push({row, error: String(innerErr) });
        }
    }

    //remove uploded files
    try {
        fs.unlinkSync(filePath);
    } catch(e) {}
    


    //building csv created credentials to return to HOD (so theeey can download/store it)
    const header = "username, userId, email, password\n";
    const csvLines = [header, ...created.map(c=> `${c.username},${c.userId},${c.email || ""},${c.password}`)];
    const csvData = csvLines.join("\n");

    //responding with a downloadable csv file
    res.setHeader("Content-Type", "tect/csv");
    res.setHeader("Content-Disposition", "attachment; filename=credentials.csv");

    //also set a header with summary as json String (optinal)

    res.setHeader("X-CREATED-Count", String(created.length));
    res.send(csvData);
} catch (err) {
    console.error("bulkRegistrationStudent error:", err);
    return res.status(500).json({
        msg:"server error", err: String(err)
    })
}
  
}