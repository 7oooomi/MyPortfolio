import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { logger } from "../logger/index";

const prisma = new PrismaClient();
export const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const skills = await prisma.skill.findMany();
  res.status(200).json({ skills });
  logger.info("skills_get ok");
});

router.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const skill = await prisma.skill.findMany({
    where: {
      id: Number(id),
    },
    include: {
      level: true,
    },
  });
  res.status(200).json({ skill });
  logger.info("skill_get ok");
});

router.post("/", async (req: Request, res: Response) => {
  const { name, levelId } = req.body;
  try {
    logger.info("skill_post start");
    const skill = await prisma.skill.create({
      data: {
        name,
        levelId: Number(levelId),
        profileId: 1,
      },
    });
    res.status(201).json({ skill });
    logger.info("skill_post ok");
  } catch (e) {
    res.status(400).send(e);
    logger.info("skill_post error", e);
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, levelId, profileId } = req.body;
  try {
    logger.info("skill_put start");
    const upSkill = await prisma.skill.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        levelId: Number(levelId),
        profileId,
      },
    });
    res.status(200).json({ upSkill });
    logger.info("skill_put ok");
  } catch (e) {
    res.status(400).send(e);
    logger.info("skill_put error", e);
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    logger.info("skill_del start");
    const delSkill = await prisma.skill.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ delSkill });
    logger.info("skill_del ok");
  } catch (e) {
    res.status(400).send(e);
    logger.info("skill_del error", e);
  }
});
