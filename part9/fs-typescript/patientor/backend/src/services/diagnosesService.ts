import diaries from "../../data/diagnoses.ts";
import type { Diagnosis } from "../types.ts";

const getEntries = (): Diagnosis[] => {
  return diaries;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getEntries,
  addDiagnosis,
};
