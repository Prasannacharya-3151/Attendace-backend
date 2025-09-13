import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

interface JwtPayload {
    id: string;
    role: string;
}

declare global {
    namespace Express{
        interface Request {
            user?: {
                id: string;
                role: string;
            }
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) =>{
    const token = req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({
            msg:"No token authorization denied"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as JwtPayload;

        //attaching th euser information to the request 
        req.user = { id: decoded.id, role: decoded.role };
        next();
    } catch(err){
        return res.status(401).json({
            msg:"token is not valid pls login again"
        })
    }
}