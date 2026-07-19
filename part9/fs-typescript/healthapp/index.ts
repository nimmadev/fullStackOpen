import express from "express";
import { calculateBmi } from "./bmiCalculator.ts";
import { isNotNumber } from "./utils.ts";

const app = express();

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

const PORT = 3003;
app.listen(PORT, (error: unknown) => {
  if (error instanceof Error) {
    console.log("Something bad happend." + " " + error.message);
  } else {
    console.log(`Server running on port ${PORT}`);
  }
});
