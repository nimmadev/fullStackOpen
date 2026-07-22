import data from "../../data/patients.ts";
import type {
  Patient,
  NonSensitiveInfoPatient,
  NewPatientEntry,
} from "../types.ts";
import { v1 as uuid } from "uuid";

const getEntries = (): Patient[] => {
  return data;
};

const getNonSensitiveEntries = (): NonSensitiveInfoPatient[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatient = { ...entry, id: uuid() };
  data.push(newPatient);
  return newPatient;
};
export default { getEntries, getNonSensitiveEntries, addPatient };
