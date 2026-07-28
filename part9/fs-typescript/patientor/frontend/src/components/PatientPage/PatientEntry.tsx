import { Box, Typography } from "@mui/material";
import type { Diagnosis, Entry } from "../../types";
function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${JSON.stringify(value)}`);
}

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return (
        <>
          <Typography>{entry.date}</Typography>
          <Typography>{entry.description}</Typography>
          <Typography>{entry.healthCheckRating}</Typography>
          <Typography>
            diagnose by <strong>{entry.specialist}</strong>
          </Typography>
        </>
      );
    case "Hospital":
      return (
        <>
          <Typography>{entry.date}</Typography>
          <Typography>{entry.description}</Typography>
          <Typography>
            diagnose by <strong>{entry.specialist}</strong>
          </Typography>
          <Typography>
            {entry.discharge.date} - {entry.discharge.criteria}
          </Typography>
        </>
      );
    case "OccupationalHealthcare":
      return (
        <>
          <Typography>
            {entry.date} {entry.employerName}
          </Typography>
          <Typography>{entry.description}</Typography>
          <Typography>
            diagnose by <strong>{entry.specialist}</strong>
          </Typography>
          {entry.sickLeave && (
            <Typography>
              Leave: {entry.sickLeave.startDate}-{entry.sickLeave.endDate}
            </Typography>
          )}
        </>
      );
    default:
      return assertNever(entry);
  }
};
export const PatientEntry = ({
  entry,
  diagnoses,
}: {
  entry: Entry;
  diagnoses: Diagnosis[] | null;
}) => {
  const dignosisName = (id: Diagnosis["code"]) => {
    if (diagnoses === null) return "";
    const code = diagnoses.find((entry) => entry.code === id);
    if (code === undefined) return "";
    return code.name;
  };

  return (
    <Box
      sx={{
        padding: "4px 8px",
        border: "1px solid grey",
        borderRadius: "1em",
      }}
    >
      <EntryDetails entry={entry} />
      <ul>
        {entry.diagnosisCodes &&
          entry.diagnosisCodes.map((id) => (
            <li key={id}>
              {id} {dignosisName(id)}
            </li>
          ))}
      </ul>
    </Box>
  );
};
