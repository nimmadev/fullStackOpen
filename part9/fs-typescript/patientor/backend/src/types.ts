import type { parseNewPatientEntry, parseNewEntry } from "./utils.ts";
import type { z } from "zod";
export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};
export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}
export const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

export type HealthCheckRating =
  (typeof HealthCheckRating)[keyof typeof HealthCheckRating];

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

type SickLeave = {
  startDate: string;
  endDate: string;
};

type Discharge = {
  date: string;
  criteria: string;
};

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}
export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type NewEntry = z.infer<typeof parseNewEntry>;
export type NewPatientEntry = z.infer<typeof parseNewPatientEntry>;
export interface Patient extends NewPatientEntry {
  id: string;
  entries: Entry[];
}
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
export type EntryWithoutId = UnionOmit<Entry, "id">;
export type NonSensitiveInfoPatient = Omit<Patient, "ssn" | "entries">;
