import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { logger } from "../logger/index";

const prisma = new PrismaClient();
export const router = Router();

// works
router.get("/", async (req: Request, res: Response) => {
  const works = await prisma.work.findMany();
  res.status(200).json({ works });
  logger.info("works_get ok");
});

router.post("/", async (req: Request, res: Response) => {
  const { title, content, favorite, image, profileId } = req.body;
  try {
    logger.info("work_post start");
    const work = await prisma.work.create({
      data: {
        title,
        content,
        favorite: Number(favorite),
        image,
        profileId,
      },
    });
    res.status(201).json({ work });
    logger.info("work_post ok");
  } catch (e) {
    res.status(400).send(e);
    logger.info("work_post error", e);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const work = await prisma.work.findMany({
    where: {
      id: Number(id),
    },
  });
  res.status(200).json({ work });
  logger.info("w_get ok");
});

router.put("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const { title, content, favorite } = req.body;
  try {
    logger.info("w_put start");
    const upWork = await prisma.work.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        content,
        favorite: Number(favorite),
      },
    });
    res.status(200).json({ upWork });
    logger.info("w_put ok");
  } catch (e) {
    res.status(400).send(e);
    logger.info("w_put error", e);
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    logger.info("w_del start");
    const delWork = await prisma.work.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(delWork);
    logger.info("w_del ok");
  } catch (e) {
    res.status(400).send(e);
    logger.info("w_del error", e);
  }
});
