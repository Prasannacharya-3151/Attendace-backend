import { Router } from "express";
import multer, { MulterError } from "multer";
import { bulkRegistrationStudents, deleteStudent, updateStudent, getAllStudents } from "../controllers/studentBulkController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";  
import { get } from "http";

const upload = multer({
    dest: "uploads/"
})
const router = Router();


//hod add bulk students
router.post("/bulk-register", authMiddleware, roleMiddleware(["hod"]), upload.single("file"), bulkRegistrationStudents);

//hod get all the students
router.get("/", authMiddleware, roleMiddleware(["hod"]), getAllStudents);

//hod delete a student 
router.delete("/:userId", authMiddleware, roleMiddleware(["hod"]), deleteStudent);

//hod update a student 
router.put("/:userId", authMiddleware, roleMiddleware(["hod"]), updateStudent);

export default router;