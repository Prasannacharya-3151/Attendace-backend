import { Request, Response } from "express";
import { SubjectMasterModel } from "../models/SubjectMaster";

export const createSubjectMaster = async (req: Request, res: Response)=>{
    try{
        const { name, code } = req.body;
        if(!name || !code ){
            return res.status(400).json({
                msg:"subjectname and subjectcode required"
            })
        }

        const existing = await SubjectMasterModel.findOne({code})
        if(existing) {
            return res.status(400).json({
                msg:"subjectcode and subjectname already exist"
            })
        }

        const subject = new SubjectMasterModel({name, code})
        await subject.save();

        return res.status(201).json({
            msg:"subject created", subject
        })
    } catch (err){
        return res.status(500).json({
            msg:"server error", err
        })
    }
}