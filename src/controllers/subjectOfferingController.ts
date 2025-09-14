import { Request, Response } from "express";
import { SubjectMasterModel } from "../models/SubjectMaster";
import { SubjectOfferingModel } from "../models/SubjectOffering";
import { UserModel } from "../models/User";

export const createSubjectOffering = async (req: Request, res: Response)=>{
    try{
        const { subjectCode, facultyId, branch, semester, section, academicYear  } = req.body;

        const trimmedSubjectCode = subjectCode?.trim();
        const trimmedFacultyId = facultyId?.trim();
        const trimmedBranch = branch?.trim();
        const trimmedSemester  = semester?.trim();
        const trimmedSection = section?.trim();
        const trimmedAcademicYear = academicYear?.trim();


        if (!trimmedSubjectCode || !trimmedFacultyId || !trimmedBranch || !trimmedSemester || !trimmedSection || !trimmedAcademicYear){
            return res.status(400).json({
                msg:"All fields are required"
            })
        }

        const subject = await SubjectMasterModel.findOne({code: subjectCode});
        if (!subject){
            return res.status(404).json({
                msg:"Subject not found"
            })
        }

        const faculty = await UserModel.findOne({userId:facultyId, role:"faculty"});
        if(!faculty){
            return res.status(404).json({
                msg:"Faculty not found"
            })
        }

        const offering = new SubjectOfferingModel({
            subject: subject.id,
            faculty:faculty.id,
            branch,
            semester,
            section,
            academicYear
        })

        await offering.save();
        return res.status(201).json({
            msg:"Subject offering created", offering
        })
    } catch(err){
        return res.status(500).json({
            msg:"Server error", err
        })
    }
}