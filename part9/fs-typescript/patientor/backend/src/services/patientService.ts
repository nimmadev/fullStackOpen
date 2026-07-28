import data from "../../data/patients.ts";
import type {
  Patient,
  NonSensitiveInfoPatient,
  NewPatientEntry,
  NewEntry,
  Entry,
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
  const newPatient = { ...entry, id: uuid(), entries: [] };
  data.push(newPatient);
  return newPatient;
};

const getPatient = (id: string): Patient | undefined => {
  return data.find((entry) => entry.id === id);
};

const updatePatient = (patient: Patient, entry: NewEntry): Entry => {
  const newEntry: Entry = {
    id: uuid(),
    ...entry,
  };

  patient.entries.push(newEntry);

  return newEntry;
};
export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  getPatient,
  updatePatient,
};
