import { Request, Response } from "express";
import {UserModel} from "../models/User"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const login = async (req: Request, res: Response ) => {
    try {
        const { username, userId, password, role } = req.body;
        
        //trimmed values
        const trimmedUsername = username?.trim();
        const trimmedUserId = userId?.trim();
        const trimmedPassword = password?.trim();
        const trimmedRole = role?.trim(); 


        //checking requird fields
        if (!trimmedUsername || !trimmedUserId || !trimmedPassword || !trimmedRole){
            return res.status(400).json({
                msg:"All the fields are required"
            })
        } 
        //checks the role matching with the userId
        if(
            (trimmedRole === "student" && !/^4AL\d{2}[A-Z]{2}\d{3}$/.test(trimmedUserId)) ||
            (trimmedRole === "faculty" && !/^FG\d{3}$/.test(trimmedUserId)) ||
            (trimmedRole === "hod" && !/^HOD\d{2,}$/.test(trimmedUserId))
        ) {
            return res.status(400).json({
                msg:"Invalid ID formate for selected role"
            })
        }
        //finding the user
        const user = await UserModel.findOne({
            userId: trimmedUserId, 
            role: trimmedRole
        })
        if(!user){
            return res.status(400).json({
                msg:"user not found or a role mismatch"
            })
        }

        

        //comparing the password
        const isMatch = await bcrypt.compare(trimmedPassword, user.password);

        if(!isMatch){
            return res.status(400).json({
                msg:"Invalid password"
            })
        }

        //generating the tok en

        const token = jwt.sign(
            {id : user._id, role:user.role},//payload=data stores token
            process.env.JWT_SECRET || "secret",//secrete key
            { expiresIn : "1d" }
        )

        return res.json({
            msg:"Login successful",
            token,
            user: {userId :user.userId, name: user.username, role:user.role },
        })
    } catch(error){
        console.error("Login error ", error)
        return res.status(500).json({
            msg:"server error", error
        })
    }
}

///HOD (or you, as developer) will insert credentials directly into the database.

//Students, Faculty, and HOD will then just log in with those given credentials.