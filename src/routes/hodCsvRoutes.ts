import { Router } from "express";
import { upload } from "../middleware/upload"
import { bulkRegistrationStudents } from "../controllers/studentBulkController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";  

const router = Router();

router.post("/students/bulk", authMiddleware, roleMiddleware(["hod"]), upload.single("file"), bulkRegistrationStudents);
export default router;