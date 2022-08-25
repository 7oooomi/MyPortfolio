import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { logger } from "../logger/index";

export const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const levels = await prisma.level.findMany();
  res.status(200).send(levels);
  logger.info("lv_get ok");
});
