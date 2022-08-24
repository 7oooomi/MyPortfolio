import createHttpError from "http-errors";
import express from "express";
import { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import { router as indexRouter } from "./routes/index";
import { router as worksRouter } from "./routes/works";
import { router as skillsRouter } from "./routes/skills";
import { router as levelRouter } from "./routes/level";

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/works", worksRouter);
app.use("/skills", skillsRouter);
app.use("/level", levelRouter);

app.use((req: Request, res: Response, next: NextFunction) =>
  next(createHttpError(404))
);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});
// 追加コード
app.listen(3000, () => {
  console.log("start port to 3000");
});

module.exports = app;
