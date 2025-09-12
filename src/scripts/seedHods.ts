import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import {connectDB} from "../config/db"
import {UserModel} from "../models/User"

dotenv.config();

const seedHods = async () =>{
    try{
        await connectDB();//connecting to the database

        //its a list of the hods
        const hods = [
      { username: "CSE HOD", userId: "HOD02", password: "CSE@123" },
      { username: "ECE HOD", userId: "HOD03", password: "ECE@123" },
      { username: "ME HOD", userId: "HOD04", password: "ME@123" },
      { username: "CIVIL HOD", userId: "HOD05", password: "CIVIL@123" },
      { username: "ISE HOD", userId: "HOD06", password: "ISE@123" },
      { username: "EEE HOD", userId: "HOD07", password: "EEE@123" },
      { username: "AI&ML HOD", userId: "HOD08", password: "AI@123" },
      { username: "DS HOD", userId: "HOD09", password: "DS@123" },
      { username: "MBA HOD", userId: "HOD10", password: "MBA@123" },
      { username: "MCA HOD", userId: "HOD11", password: "MCA@123" },
    ];

    for (const hod of hods){
        const exists = await UserModel.findOne({
            userId:hod.userId
        })

        if(!exists){
            const hashedPassword = await bcrypt.hash(hod.password,10);
            await UserModel.create({
                username: hod.username,
                userId:hod.userId,
                password:hashedPassword,
                role:"hod"
            })
            console.log(`Hod created:${hod.userId}`)
        } else {
            console.log(`Hod alredy exists:${hod.userId}`)
        }
    }
    process.exit(0);

    }catch(error){
        console.error("Error seeding HODs:", error)
        process.exit(1);
    }
}