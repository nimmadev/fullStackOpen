import { z } from "zod";

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
