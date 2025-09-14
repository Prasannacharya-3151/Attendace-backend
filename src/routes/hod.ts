import {Router} from "express";
import { signupHod } from "../controllers/hodController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { registerFaculty } from "../controllers/facaultyController";
import { registerStudent } from "../controllers/studentController";

const router = Router();

router.post("/signup", signupHod)
router.post("/faculty", authMiddleware, roleMiddleware(["hod"]), registerFaculty)
router.post("/student", authMiddleware, roleMiddleware(["hod"]), registerStudent)
router.get("/dashboard", authMiddleware, roleMiddleware(["hod"]), (req, res)=>{
    res.json({
        msg:"Welcome HOD",
        user: req.user
    })
})
export default router;