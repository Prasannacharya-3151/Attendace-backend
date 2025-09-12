import {Router} from "express";
import { signupHod } from "../controllers/hodController";

const router = Router();

router.post("/signup", signupHod)
export default router;