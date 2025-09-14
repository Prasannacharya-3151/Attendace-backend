import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { UserModel } from "../models/User";

export const registerStudent = async(req: Request, res: Response) =>{
    try{
        const {username, userId, password, branch }  =req.body

        const trimmedUsername = username?.trim();
        const trimmedUserId = username?.trim();
        const trimmedPassword = password?.trim();
        const trimmedBranch = branch?.trim();


        if (!trimmedUsername || !trimmedUserId || !trimmedPassword || !trimmedBranch){
            return res.status(400).json({
                msg:"All the fields are required"
            })
        }

        //check if the students alredy exists 
        const existing = await UserModel.findOne({userId})
        if(existing){
            return res.status(400).json({
                msg:"Student alreasdy exist"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newStudent = new UserModel({
            username,
            userId,
            password: hashedPassword,
            role:"student",
            branch,
            isFirstLogin:true
        })

        await newStudent.save();
        return res.status(201).json({
            msg:"Student registerd successfully", newStudent
        })
    } catch (err){
        return res.status(500).json({
            msg:"Server error", err
        })
    }
}