import { Router } from "express";
import { createSubjectMaster } from "../controllers/subjectMasterController";
import { createSubjectOffering } from "../controllers/subjectOfferingController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";

const router = Router();

router.post("/master",authMiddleware, roleMiddleware(["hod"]), createSubjectMaster);
router.post("/offering",authMiddleware, roleMiddleware(["hod"]), createSubjectOffering)

export default router;