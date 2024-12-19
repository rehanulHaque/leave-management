import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface CustomRequest extends Request {
    user?: any;
}

export const auth = async (req:CustomRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({message: "Token did't received", sucess: false});
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
        if (!decoded) return res.status(401).json({message: "Wrong Token", sucess: false});
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({message: "unauthorized", sucess: false});
    }
}