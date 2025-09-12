import {Router} from "express";
import { signupHod } from "../controllers/hodController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";

const router = Router();

router.post("/signup", signupHod)
router.get("/dashboard", authMiddleware, roleMiddleware(["hod"]), (req, res)=>{
    res.json({
        msg:"Welcome HOD", user: req.user
    })
})
export default router;