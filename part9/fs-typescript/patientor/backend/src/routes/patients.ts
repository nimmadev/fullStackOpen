import { type Request, type Response, Router } from "express";
import patientService from "../services/patientService.ts";
import type { NewPatientEntry, NonSensitiveInfoPatient } from "../types.ts";
import z from "zod";
import { newPatientHandler } from "../middleware.ts";

const patientRouter = Router();

patientRouter.get("/", (_req, res: Response<NonSensitiveInfoPatient[]>) => {
  res.json(patientService.getNonSensitiveEntries());
});

patientRouter.post(
  "/",
  newPatientHandler,
  (req: Request<unknown, unknown, NewPatientEntry>, res: Response) => {
    try {
      const newPaitent = patientService.addPatient(req.body);
      res.json(newPaitent);
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues });
      } else {
        res.status(400).send({ error: "unknown error" });
      }
    }
  },
);
export default patientRouter;
