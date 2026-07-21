import { isNotNumber } from "./utils.ts";

interface TrainingResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
}

export function calculateExercises(
  daily_exercises: number[],
  target: number,
): TrainingResult {
  if (target <= 0) {
    throw new Error("Target must be greater than 0");
  }
  if (daily_exercises.length === 0) {
    throw new Error("At least one day of exercise data is required.");
  }
  const periodLength = daily_exercises.length;
  const trainingDays = daily_exercises.filter((h) => h > 0).length;
  const totalTraining = daily_exercises.reduce((acc, curr) => acc + curr, 0);
  const average = totalTraining / periodLength;
  const success = average >= target;
  const shortfall = ((target - average) / target) * 100;
  let rating: 1 | 2 | 3;
  let ratingDescription: string;
  if (shortfall <= 0) {
    rating = 3;
    ratingDescription = "you did great work";
  } else if (shortfall <= 25) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "try harder";
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
}

export interface ExerciseValue {
  target: number;
  daily_exercises: number[];
}

function parseArguments(args: string[]): ExerciseValue {
  if (args.length < 4) throw new Error("minimum 2 args are required.");
  if (isNotNumber(args[2])) throw new Error("invalid args.");
  const daily_exercises: number[] = [];
  for (let i = 3; i < args.length; i++) {
    if (isNotNumber(args[i])) throw new Error("invalid args.");
    daily_exercises.push(Number(args[i]));
  }

  return {
    target: Number(args[2]),
    daily_exercises,
  };
}

if (process.argv[1] === import.meta.filename) {
  try {
    const { target, daily_exercises } = parseArguments(process.argv);
    console.log(calculateExercises(daily_exercises, target));
  } catch (error: unknown) {
    let errorMessage = "Something bad happend.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
