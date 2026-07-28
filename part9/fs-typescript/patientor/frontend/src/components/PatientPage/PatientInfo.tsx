import { Box, Button, Typography } from "@mui/material";
import type {
  Patient,
  Diagnosis,
  EntryWithoutId,
  HealthCheckRating,
} from "../../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { PatientEntry } from "./PatientEntry";
import diagnosesService from "../../services/diagnoses";
import patientsService from "../../services/patients";
import { useEffect, useState } from "react";
import { EntryForm } from "../EntryForm";
export const PatientInfo = ({ patient }: { patient: Patient }) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  console.log(patient.id);

  useEffect(() => {
    const getDiagnosNames = async () => {
      const data = await diagnosesService.getDiagnosis();
      setDiagnoses(data);
    };
    void getDiagnosNames();
  }, []);
  const rednerGender = (patient: Patient) => {
    switch (patient.gender) {
      case "male":
        return <MaleIcon />;
      case "female":
        return <FemaleIcon />;
      default:
        return <TransgenderIcon />;
    }
  };
  const handleForm = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const entryType = formData.get("type");
    const date = formData.get("date");
    const description = formData.get("description");
    const specialist = formData.get("specialist");
    const diagnosisCodes = formData.get("diagnosisCodes");

    if (
      typeof entryType !== "string" ||
      typeof date !== "string" ||
      typeof description !== "string" ||
      typeof specialist !== "string"
    ) {
      setError("Form not filled correctly");
      return;
    }
    if (
      !["HealthCheck", "Hospital", "OccupationalHealthcare"].includes(entryType)
    ) {
      setError("EntryType: invalid");
      return;
    }
    let entry: EntryWithoutId = {} as EntryWithoutId;
    console.log("diagnosisCodes", diagnosisCodes);
    if (typeof diagnosisCodes === "string") {
      if (diagnosisCodes.trim() !== "") {
        entry.diagnosisCodes = diagnosisCodes
          .split(",")
          .map((code) => code.trim())
          .filter((code) => code !== "");
      }
    }
    entry.date = date;
    entry.description = description;
    entry.specialist = specialist;

    switch (entryType as EntryWithoutId["type"]) {
      case "HealthCheck":
        const healthCheckRating = formData.get("healthCheckRating");
        if (
          typeof healthCheckRating !== "string" ||
          ![0, 1, 2, 3].includes(Number(healthCheckRating))
        ) {
          setError("healtCheckRating: invalid input");
          return;
        } else {
          const rating = Number(healthCheckRating);
          entry = {
            ...entry,
            type: "HealthCheck",
            healthCheckRating: rating as HealthCheckRating,
          };
        }
        break;
      case "Hospital":
        const dischargeDate = formData.get("dischargeDate");
        const dischargeCriteria = formData.get("dischargeCriteria");
        if (
          typeof dischargeDate !== "string" ||
          typeof dischargeCriteria !== "string"
        ) {
          console.log(dischargeDate, dischargeCriteria);

          setError("Discharge: invalid input");
          return;
        }
        entry = {
          ...entry,
          type: "Hospital",
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        };
        break;
      case "OccupationalHealthcare":
        const employerName = formData.get("employerName");
        const startDate = formData.get("startDate");
        const endDate = formData.get("endDate");
        if (
          typeof employerName !== "string" ||
          typeof startDate !== "string" ||
          typeof endDate !== "string"
        ) {
          setError("sickLeave: invalid input");
          return;
        }
        entry = {
          ...entry,
          type: "OccupationalHealthcare",
          employerName,
          sickLeave: {
            startDate,
            endDate,
          },
        };
        break;
      default:
        setError("Something Wrong happend");
    }

    patientsService
      .addEntry(entry, patient.id)
      .then((data) => {
        patient.entries.push(data);
        event.target.reset();
        setShowForm(false);
        setError(null);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Typography variant="h4">
        {patient.name} {rednerGender(patient)}
      </Typography>
      <Typography variant="body1">ssn : {patient.ssn}</Typography>
      <Typography variant="body1">occupation : {patient.occupation}</Typography>
      <Typography variant="body1">
        date of birth : {patient.dateOfBirth}
      </Typography>

      {patient.entries.length > 0 && showForm === false ? (
        <Box component={"section"}>
          <Typography variant="h5" mt={3}>
            entries
          </Typography>
          <Box display={"flex"} flexDirection={"column"} gap={1}>
            {patient.entries.map((entry) => (
              <PatientEntry
                entry={entry}
                key={entry.id}
                diagnoses={diagnoses}
              />
            ))}
          </Box>
          <Button
            variant="contained"
            sx={{ mt: "1em" }}
            onClick={() => setShowForm(true)}
          >
            Add New Entry
          </Button>
        </Box>
      ) : (
        <EntryForm
          diagnoses={diagnoses}
          error={error}
          handleForm={handleForm}
          setForm={setShowForm}
        />
      )}
    </div>
  );
};
