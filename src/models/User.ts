import mongoose, { Schema, model } from "mongoose";

interface User {
    username: string;
    userId: string;
    password: string;
    role: "student" | "faculty" | "hod";
    branch: "CSE" | "AIML" | "DS" | "ISE" | "CSD" | "IOT" | "ME" | "CV" | "AG" | "AS";
    
    isFirstLogin?:boolean;
}

const userSchema = new Schema({
    username:{type: String, required: true, trim: true},
    userId:{type:String, require:true, unique: true, trim :true},
    password:{type:String, required:true, trim :true},
    role:{type: String, enum:["student", "faculty", "hod"], required:true, trim:true},
    branch: {type:String, enum:["CSE","AIML","DS","ISE","CSD","IOT","ME","CV","AG","AS"], required:true, trim:true},
    
    isFirstLogin: { type: Boolean, default:true},
},
 { timestamps: true }
)

export const UserModel = model("userSchema", userSchema)