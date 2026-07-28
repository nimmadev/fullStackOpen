import {
  Alert,
  Box,
  Button,
  FilledInput,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Diagnosis, EntryWithoutId } from "../types";
import { useState } from "react";

const DiagnosisCodes = ({ diagnoses }: { diagnoses: Diagnosis[] | null }) => {
  // const codes;
  return (
    <FormControl required variant="filled">
      <FormControl fullWidth>
        <InputLabel shrink>Diagnosis Codes</InputLabel>
        <Select
          label="Diagnosis Codes"
          defaultValue={[]}
          name="diagnosisCodes"
          multiple
          renderValue={(selected) => (selected as string[]).join(", ")}
        >
          {/* <MenuItem value="0">Healthy</MenuItem> */}
          {diagnoses &&
            diagnoses.map((dig) => (
              <MenuItem key={dig.code} value={dig.code}>
                {dig.code} -- {dig.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </FormControl>
  );
};
const HealthCheck = () => (
  <FormControl required variant="filled">
    <FormControl required fullWidth>
      <InputLabel shrink>Health Check Rating</InputLabel>
      <Select
        defaultValue="0"
        label="Health Check Rating"
        name="healthCheckRating"
      >
        <MenuItem value="0">Healthy</MenuItem>
        <MenuItem value="1">Low risk</MenuItem>
        <MenuItem value="2">Hight risk</MenuItem>
        <MenuItem value="3">Critical risk</MenuItem>
      </Select>
    </FormControl>
  </FormControl>
);

const Hospital = () => {
  return (
    <>
      <FormControl required variant="filled">
        <FormLabel htmlFor="discharge-date">Discharge-date</FormLabel>
        <FilledInput id="discharge-date" type="date" name="dischargeDate" />
      </FormControl>

      <FormControl required variant="filled">
        <FormLabel htmlFor="discharge-criteria">Criteria</FormLabel>
        <FilledInput
          id="discharge-criteria"
          name="dischargeCriteria"
          multiline
          minRows={1}
        />
      </FormControl>
    </>
  );
};

const OccupationalHealthcare = () => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <FormControl required variant="filled">
        <FormLabel htmlFor="employerName">Employer Name</FormLabel>
        <FilledInput id="employerName" name="employerName" />
      </FormControl>

      <FormLabel>Sick Leave</FormLabel>

      <Box display="flex" gap={2}>
        <FormControl variant="filled" fullWidth>
          <FormLabel htmlFor="startDate">Start Date</FormLabel>
          <FilledInput id="startDate" type="date" name="startDate" />
        </FormControl>

        <FormControl variant="filled" fullWidth>
          <FormLabel htmlFor="endDate">End Date</FormLabel>
          <FilledInput id="endDate" type="date" name="endDate" />
        </FormControl>
      </Box>
    </Box>
  );
};
export default Hospital;
export const EntryForm = ({
  diagnoses,
  error,
  handleForm,
  setForm,
}: {
  diagnoses: Diagnosis[] | null;
  error: string | null;
  handleForm: (e: React.SubmitEvent<HTMLFormElement>) => void;
  setForm: (x: boolean) => void;
}) => {
  const [entryType, setEntryType] =
    useState<EntryWithoutId["type"]>("HealthCheck");

  return (
    <Box
      component="section"
      sx={{
        mt: 2,
        p: 2,
        border: "2px dotted",
        borderColor: "black",
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" mb={2}>
        New HealthCheck Entry
      </Typography>

      <Box
        component="form"
        onSubmit={handleForm}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        {error && <Alert severity="error">{error}</Alert>}
        <FormControl fullWidth>
          <InputLabel shrink>Entry type</InputLabel>
          <Select<EntryWithoutId["type"]>
            defaultValue="HealthCheck"
            label="Entry type"
            name="type"
            onChange={(e) => setEntryType(e.target.value)}
          >
            <MenuItem value="HealthCheck">Health Check</MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
            <MenuItem value="OccupationalHealthcare">
              Occupational Healthcare
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl required variant="filled">
          <FormLabel required htmlFor="Date">
            Date
          </FormLabel>
          <FilledInput type="date" name="date" id="Date" />
        </FormControl>

        <FormControl required variant="filled">
          <FormLabel required htmlFor="Description">
            Description
          </FormLabel>
          <FilledInput name="description" id="Description" />
        </FormControl>

        <FormControl required variant="filled">
          <FormLabel required htmlFor="Specialist">
            Specialist
          </FormLabel>
          <FilledInput name="specialist" id="Specialist" />
        </FormControl>
        {entryType === "HealthCheck" && <HealthCheck />}
        {entryType === "Hospital" && <Hospital />}
        {entryType === "OccupationalHealthcare" && <OccupationalHealthcare />}
        <DiagnosisCodes diagnoses={diagnoses} />

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            type="button"
            variant="outlined"
            onClick={() => setForm(false)}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Add
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
