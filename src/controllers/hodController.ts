import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { UserModel } from "../models/User";

export const signupHod = async (req: Request, res: Response)=>{
    try{
        const { username, userId, password, branch } = req.body;


        const trimmedUsername = username?.trim();
        const trimmedUserId = userId?.trim();
        const trimmedPassword = password.trim();
        const trimmedBranch = branch.trim();


        //validation
        if(!trimmedUsername || !trimmedUserId || !trimmedPassword || !branch ){
            return res.status(400).json({
                msg:"All fields are required"  ///like a H0D01
            })
        }

        if(!/^HOD\d{2,}$/.test(userId)){
            return res.status(400).json({
                msg:"Invalid HOD ID formate"
            })
        }


        //check if hod already exits
        const existing = await UserModel.findOne({
            userId, role:"hod"
        })
        if(existing){
            return res.status(400).json({
                msg:"HOD already exists with this ID"
            })
        }

        const hashedPassword = await bcrypt.hashSync(password, 10);

        //save in db
        const newHod = new UserModel({
            username,
            userId,
            password:hashedPassword,
            role:"hod",
            branch,
            isFirstLogin:false,
        })

        await newHod.save();

        return res.status(201).json({
            msg:"HOD registered successfully",
            hod:{userId, username, branch}
        })


    } catch (error){
        console.error("HOD signup error", error)
        return res.status(500).json({
            msg:"server error", error
        })
    }
}