import { NextFunction,Request,Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

// export function middleware(req:Request,res:Response,next:NextFunction){
//     const token=req.headers["authorization"] ?? "";

//     const decoded=jwt.verify(token,JWT_SECRET);

//     if(decoded){
//         //@ts-ignore
//         req.userId=decoded.userId;
//         next();
//     }else{
//         res.status(403).json({
//             message:"Unauthorized"
//         })
//     }
// }

export function middleware(req:Request, res:Response, next:NextFunction){
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        res.status(403).json({
            message: "No token provided"
        });
        return;
    }

    const token = authHeader.split(" ")[1];

    if(!token){
        res.status(403).json({
            message:"Invalid token"
        });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        //@ts-ignore
        req.userId = decoded.userId;

        next();
    } catch (e) {
        res.status(403).json({
            message: "Unauthorized"
        });
    }
}