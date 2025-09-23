import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import csvParser from "csv-parser";
import bcrypt from "bcryptjs";
import { UserModel } from "../models/User";
import { sendCredentialsEmail } from "../services/emailService";

// Generating a  random password
function generateRandomPassword(name: string) {
  const first = String(name || "user").split(" ")[0] || "user";
  const num = Math.floor(100 + Math.random() * 900);
  return `${first}@${num}`;
}

//  Bulk register students from CSV
export const bulkRegistrationStudents = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ 
        msg: "CSV file required (form field: file)" 
    });
      return;
    }

    const filePath = path.resolve(req.file.path);
    const rows: any[] = [];

    await new Promise<void>((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on("data", (row) => rows.push(row))
        .on("end", () => resolve())
        .on("error", (err) => reject(err));
    });

    const created: any[] = [];

    for (const row of rows) {
      const username = (row.username || "").trim();
      const userId = (row.userId || "").trim();
      const branch = (row.branch || "").trim();
      const semester = (row.semester || "").trim();
      const section = (row.section || "").trim();
      const email = (row.email || "").trim();

      if (!username || !userId || !branch || !semester || !section) continue;

      let plainPassword = (row.password || "").trim();
      if (!plainPassword) plainPassword = generateRandomPassword(username);
      const hashed = await bcrypt.hash(plainPassword, 10);

      const newStudent = new UserModel({
        username,
        userId,
        password: hashed,
        role: "student",
        branch,
        semester,
        section,
        isFirstLogin: true,
      });
      await newStudent.save();

      if (email) {
        try {
          await sendCredentialsEmail(email, username, userId, plainPassword);
        } catch {}
      }

      created.push({ username, userId, email, password: plainPassword });
    }

    fs.unlinkSync(filePath);

    res.status(201).json({
      msg: "Students registered successfully",
      createdCount: created.length,
      created,
    });
  } catch (err) {
    console.error("bulkRegistrationStudents error:", err);
    res.status(500).json({ 
        msg: "Server error", err: String(err) 
    });
  }
};

//  Delete student from the file 
export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const student = await UserModel.findOneAndDelete({ userId, role: "student" });
    if (!student) return res.status(404).json({ msg: "Student not found" });

    res.json({ 
        msg: "Student deleted successfully", student 
    });
  } catch (err) {
    res.status(500).json({ 
        msg: "Server error", err: String(err) 
    });
  }
};

//  Update student from the file 
export const updateStudent = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { username, branch, semester, section } = req.body;

    const student = await UserModel.findOne({ userId, role: "student" });
    if (!student) return res.status(404).json({ msg: "Student not found" });

    if (username) student.username = username;
    if (branch) student.branch = branch;
    if (semester) student.semester = semester;
    if (section) student.section = section;

    await student.save();

    res.json({ 
        msg: "Student updated successfully", student 
    });
  } catch (err) {
    res.status(500).json({ 
        msg: "Server error", err: String(err) 
    });
  }
};

// Get all students
export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await UserModel.find({ role: "student" }).select("-password");
    res.json(students);
  } catch (err) {
    res.status(500).json({ 
        msg: "Server error", err: String(err) 
    });
  }
};
