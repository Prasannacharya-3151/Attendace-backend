import { Request, Response } from "express";
import { SubjectMasterModel } from "../models/SubjectMaster";
import { SubjectOfferingModel } from "../models/SubjectOffering";
import { UserModel } from "../models/User";

export const createSubjectOffering = async (req: Request, res: Response)=>{
    try{
        const { subjectCode, facultyId, branch, semester, section, secton, academicYear  } = req.body;

        const trimmedSubjectCode
    }
}