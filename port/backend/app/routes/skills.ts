import {Router} from 'express'
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const router = Router();

router.get("/", (req, res) => {

})

router.post("/", (req, res) => {

})

router.put("/:id", (req, res) => {

})

router.delete("/:id", (req, res) => {

})