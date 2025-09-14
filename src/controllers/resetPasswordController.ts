import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { UserModel } from "../models/User";


//reset password old password requires
export const resetPassword = async ( req: Request, res: Response ) =>{
    try{
        const {userId, oldPassword, newPassword } = req.body;

        if(!userId || !oldPassword || !newPassword){
            return res.status(400).json({
                msg:"All the fileds are mandatory"
            })
        }

        //find the user 
        const user = await UserModel.findOne({userId});
        if(!user){
            return res.status(400).json({
                msg:"User not found"
            })
        }

        //check old password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if(!isMatch){
            return res.status(400).json({
                msg:"Old password is incorrect"
            })
        }

        //hashing the password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        //updating password
        user.password = hashedPassword;
        user.isFirstLogin = false;
        await user.save();

        return res.status(200).json({
            msg:"password reset successfull"
        })
    } catch (error){
        console.error("Reset password error:",error )
        return res.status(500).json({
            msg:"Server error", error
        })
    }
}