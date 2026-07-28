import { z } from "zod";
import { HealthCheckRating, type EntryWithoutId } from "./types.ts";
const Gender = {
  Female: "female",
  Male: "male",
  Other: "other",
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];

export const parseNewPatientEntry = z.object({
  name: z.string().min(1, "Name is required"),
  dateOfBirth: z.iso.date(),
  ssn: z.string().min(1, "SSN is required"),
  gender: z.enum(Gender),
  occupation: z.string().min(1, "Occupation is required"),
});

export const baseNewEntrySchema = z.object({
  description: z.string().min(1, "Name is required"),
  date: z.iso.date(),
  specialist: z.string().min(1, "Specialist is required"),
  diagnosisCodes: z.array(z.string()).optional(),
});

export const hospitalEntrySchema = baseNewEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.iso.date(),
    criteria: z.string().min(1),
  }),
});

export const occupationalHealthcareEntrySchema = baseNewEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string().min(1),
  sickLeave: z
    .object({
      startDate: z.iso.date(),
      endDate: z.iso.date(),
    })
    .optional(),
});

export const healthCheckEntrySchema = baseNewEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.union([
    z.literal(HealthCheckRating.Healthy),
    z.literal(HealthCheckRating.LowRisk),
    z.literal(HealthCheckRating.HighRisk),
    z.literal(HealthCheckRating.CriticalRisk),
  ]),
});

export const parseNewEntry: z.ZodType<EntryWithoutId> = z.discriminatedUnion(
  "type",
  [
    hospitalEntrySchema,
    occupationalHealthcareEntrySchema,
    healthCheckEntrySchema,
  ],
);
