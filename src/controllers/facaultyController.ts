import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { UserModel } from "../models/User";

export const registerFaculty = async (req: Request, res: Response ) =>{
    try {
        const { username, userId, password, branch } = req.body;

        const trimmedUsername = username?.trim();
        const trimmedUserId = userId?.trim();
        const trimmedPassword = password?.trim();
        const trimmedBranch = branch?.trim();


        //check all the fielad are required
        if (!username || !userId || !password || ! branch){
            return res.status(400).json({
                msg:"All fields are required"
            })
        }

        //check if faculty already existes
        const existing = await UserModel.findOne({ userId });
        if (existing) {
            return res.status(400).json({
                msg:"Faculty already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newFaculty = new UserModel({
            username,
            userId,
            password:hashedPassword,
            role:"faculty",
            branch,
            isFirstLogin: true,
        })

        await newFaculty.save()

        return res.status(201).json({
            msg:"Faculty registration successfully", newFaculty
        })


    } catch (err) {
        return res.status(500).json({
            msg:"Server error:", error 
        })
    }
}