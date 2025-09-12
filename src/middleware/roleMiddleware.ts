import { Request, Response, NextFunction } from "express";

export const roleMiddleware = (roles: string[]) => {
    return (req: Request, res: Response, next:NextFunction)=>{
        if(!req.user ||  !roles.includes(req.user.role)){
            return res.status(403).json({
                msg:"Access denied"
            })
        }
        next();
    }
}

//roles = the allowed roles you passed.

//req.user.role = role from the decoded JWT token (hod, faculty, student).

//includes checks if that role is in the list.

//roles = ["hod"]
//req.user.role = "faculty"
//roles.includes("faculty") → false → reject