import { NextFunction, Request, Response } from "express";
import { boolean } from "zod";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { OK, StatusCodes } from "http-status-codes";
import { JWT_SECRET } from "./config";

function checkForValidJWT(req: Request): [boolean, number] {
  const authHeader = req.headers["authorization"]?.split(" ");

  if (!authHeader || authHeader.length !== 2 || authHeader[0] !== "Bearer") {
    return [false, 0];
  }

  const token = authHeader[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return [true, decoded.id];
  } catch (err) {
    return [false, 0];
  }
}


export function authMiddleware(req : Request,res : Response,next : NextFunction) {
    
    const [ok,id] = checkForValidJWT(req);

    if (!ok) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            error : "Invalid or empty jwt",
        });
        return;
    }

    req.id = id;

    next()
}