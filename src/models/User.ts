import mongoose, { Schema, model } from "mongoose";

interface User {
    username: string;
    userId: string;
    password: string;
    role: "student" | "faculty" | "hod";
    branch?: "CSE" | "AIML" | "DS" | "ISE" | "CSD" | "IOT" | "ME" | "CV" | "AG" | "AS";
    semester?:"1SEM" | "2SEM" | "3SEM" | "4SEM" | "5SEM" | "6SEM" | "7SEM" | "8SEM";
    section?:"A"|"B"|"C"|"D";
    isFirstLogin?:boolean;
}

const userSchema = new Schema({
    username:{type: String, required: true, trim: true},
    userId:{type:String, required:true, unique: true, trim :true},
    password:{type:String, required:true, trim :true},
    role:{type: String, enum:["student", "faculty", "hod"], required:true, trim:true},
    branch: {type:String, enum:["CSE","AIML","DS","ISE","CSD","IOT","ME","CV","AG","AS"], required:true, trim:true},
    semester: {type:String, enum:["1SEM" , "2SEM" , "3SEM" , "4SEM" , "5SEM" , "6SEM" , "7SEM" , "8SEM"], required: function(this: any) { return this.role === "student"; }, trim:true},
    section: {type:String, enum:["A", "B", "C", "D"],  required: function(this: any) { return this.role === "student"; }, trim:true},
    isFirstLogin: { type: Boolean, default:true},
},
 { timestamps: true }
)

export const UserModel = model("userSchema", userSchema)