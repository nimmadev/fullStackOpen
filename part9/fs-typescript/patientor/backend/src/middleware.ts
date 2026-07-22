import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { parseNewPatientEntry } from "./utils.ts";

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof ZodError) {
    res.status(400).send({ error: error.issues });
  } else if (error instanceof Error) {
    res.status(400).send({ error: error.message });
  } else {
    res.status(400).send({ error: "unknown error" });
  }
};

export const newPatientHandler = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    parseNewPatientEntry.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};
