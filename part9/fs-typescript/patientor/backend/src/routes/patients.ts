import { type Request, type Response, Router } from "express";
import patientService from "../services/patientService.ts";
import type {
  NewEntry,
  NewPatientEntry,
  NonSensitiveInfoPatient,
  Patient,
} from "../types.ts";
import z from "zod";
import { newEntryHandler, newPatientHandler } from "../middleware.ts";

const patientRouter = Router({ mergeParams: true });

patientRouter.get("/", (_req, res: Response<NonSensitiveInfoPatient[]>) => {
  res.json(patientService.getNonSensitiveEntries());
});

patientRouter.get("/:id", (req, res: Response<Patient | { error: string }>) => {
  const id = req.params.id;

  const patient = patientService.getPatient(id);
  if (patient === undefined) {
    res.status(200).json({ error: "patient not found" });
  }
  res.json(patient);
});

patientRouter.post(
  "/:id/entries",
  newEntryHandler,
  (req: Request<{ id: string }, unknown, NewEntry>, res: Response) => {
    try {
      const id = req.params.id;
      const patient = patientService.getPatient(id);

      if (!patient) {
        return res.status(404).json({ error: "patient not found" });
      }

      const newEntry = patientService.updatePatient(patient, req.body);
      return res.json(newEntry);
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.issues });
      }

      return res.status(400).json({ error: "unknown error" });
    }
  },
);

patientRouter.post(
  "/",
  newPatientHandler,
  (req: Request<unknown, unknown, NewPatientEntry>, res: Response) => {
    try {
      const newPaitent = patientService.addPatient(req.body);
      res.json(newPaitent);
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.issues });
      } else {
        res.status(400).json({ error: "unknown error" });
      }
    }
  },
);
export default patientRouter;
