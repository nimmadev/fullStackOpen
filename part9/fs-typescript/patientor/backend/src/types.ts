import type { parseNewPatientEntry } from "./utils.ts";
import type { z } from "zod";
export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

export type NewPatientEntry = z.infer<typeof parseNewPatientEntry>;
export interface Patient extends NewPatientEntry {
  id: string;
}
export type NonSensitiveInfoPatient = Omit<Patient, "ssn">;
