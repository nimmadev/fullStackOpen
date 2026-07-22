import express from "express";
import cors from "cors";

// routers
import diagnosisRouter from "./routes/diagnoses.ts";
import patientsRouter from "./routes/patients.ts";
import { errorHandler } from "./middleware.ts";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/ping", (_req, res) => {
  console.log("hit");
  res.send("pong");
});

app.use("/api/diagnoses", diagnosisRouter);
app.use("/api/patients", patientsRouter);

const PORT = 3001;

app.use(errorHandler);
app.listen(PORT, (error: unknown) => {
  if (error instanceof Error) {
    console.log(error.message);
  } else {
    console.log(`server is running on port: ${PORT}`);
  }
});
