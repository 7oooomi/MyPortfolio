import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { logger } from "../logger/index";

export const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req: Request, res: Response) => {
  const profile = await prisma.profile.findMany();
  res.status(200).json({ profile });
  logger.info("profile ok");
});

router.post("/", async (req: Request, res: Response) => {
  const { name, career, foreword, email, twitter } = req.body;
  try {
    logger.info("pro_post start");
    const profile = await prisma.profile.create({
      data: {
        name,
        career,
        foreword,
        email,
        twitter,
      },
    });
    res.status(201).json({ profile });
    logger.info("pro_post ok");
  } catch (e) {
    res.status(400).send(e);
    logger.info("pro_post error");
  }
});

router.put("/", async (req: Request, res: Response) => {
  const { name, career, foreword, email, twitter } = req.body;
  try {
    logger.info("pro_put start");
    const putProfile = await prisma.profile.update({
      where: {
        id: 1,
      },
      data: {
        name,
        career,
        foreword,
        email,
        twitter,
      },
    });
    res.status(200).json({ putProfile });
    logger.info("pro_put ok");
  } catch (e) {
    res.status(400).send(e);
    logger.info("pro_put error");
  }
});
