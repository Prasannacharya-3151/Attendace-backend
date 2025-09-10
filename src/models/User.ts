import mongoose, { Schema, model } from "mongoose";

interface User {
    username: string;
    userId: string;
    password: string;
    role: "student" | "faculty" | "hod";
}

const userSchema = new Schema({
    username:{type: String, required: true},
    userId:{type:String, require:true},
    password:{type:String, required:true },
    role:{type: String, enum:["student", "faculty", "hod"], required:true}
})

export const UserModel = model("userSchema", userSchema)