import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

export const router = Router();
const prisma = new PrismaClient();

router.get("/", (req:Request, res:Response) => {
    res.send("Hello world")
});
