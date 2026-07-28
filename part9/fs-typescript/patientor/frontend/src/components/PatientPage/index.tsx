import { useEffect, useState } from "react";
import patientsService from "../../services/patients";
import { useNavigate, useParams } from "react-router-dom";
import type { Patient } from "../../types";

import { PatientInfo } from "./PatientInfo";
export const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const { id: patientId } = useParams();
  const navigator = useNavigate();
  useEffect(() => {
    if (!patientId) {
      navigator("/");
      return;
    }

    const fetchPatient = async () => {
      try {
        const data = await patientsService.getPatientById(patientId);
        setPatient(data);
      } catch {
        navigator("/");
      }
    };

    void fetchPatient();
  }, [patientId, navigator]);
  if (patient === null) return <>Loading...</>;

  return <PatientInfo patient={patient} />;
};
