import express from "express";
import { calculateBmi } from "./bmiCalculator.ts";
import { isNotNumber } from "./utils.ts";
import {
  calculateExercises,
  type ExerciseValue,
} from "./exerciseCalculator.ts";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});
app.get("/bmi", (req, res) => {
  try {
    if (req.query.height === undefined || req.query.weight === undefined) {
      throw new Error("parameters missing");
    }

    if (isNotNumber(req.query.height) || isNotNumber(req.query.weight)) {
      throw new Error("only numbers are allowed");
    }

    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    res.json({
      height,
      weight,
      bmi: calculateBmi(height, weight),
    });
  } catch (error) {
    res.status(400).json({
      error: "malformatted parameters",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.post("/exercises", (req, res) => {
  const data = req.body as ExerciseValue;
  console.log(data);
  if (data.target === undefined || data.daily_exercises === undefined) {
    return res.status(400).json({
      error: "parameters missing",
    });
  }

  if (isNotNumber(String(data.target))) {
    return res.status(400).json({
      error: "malformatted parameters",
      message: "target must be a number",
    });
  }

  if (
    !Array.isArray(data.daily_exercises) ||
    data.daily_exercises.some((value) => isNotNumber(String(value)))
  ) {
    return res.status(400).json({
      error: "malformatted parameters",
      message: "daily_exercises must contain only numbers",
    });
  }

  try {
    const result = calculateExercises(data.daily_exercises, data.target);
    return res.json(result);
  } catch (error) {
    let errorMessage = "Something bad happened.";

    if (error instanceof Error) {
      errorMessage += ` Error: ${error.message}`;
    }

    return res.status(500).json({ error: errorMessage });
  }
});

const PORT = 3003;
app.listen(PORT, (error: unknown) => {
  if (error instanceof Error) {
    console.log("Something bad happend." + " " + error.message);
  } else {
    console.log(`Server running on port ${PORT}`);
  }
});
