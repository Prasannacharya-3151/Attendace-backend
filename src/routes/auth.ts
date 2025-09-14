import { Router } from "express";
import { login } from "../controllers/authController";
import { resetPassword } from "../controllers/resetPasswordController";

const router = Router();

// POST /api/auth/login
router.post("/login", login);
router.post("/reset-password", resetPassword)
// router.get("/",(req,res)=>{
//     res.status(200).json({
//         message:"Server is healthy"
//     })
// })

export default router