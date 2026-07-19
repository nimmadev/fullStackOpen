import { isNotNumber } from "./utils.ts";

type BMIType =
  | "Underweight (Severe thinness)"
  | "Underweight (Moderate thinness)"
  | "Underweight (Mild thinness)"
  | "Normal range"
  | "Overweight (Pre-obese)"
  | "Obese (Class I)"
  | "Obese (Class II)"
  | "Obese (Class III)";

export function calculateBmi(height: number, weight: number): BMIType {
  if (height <= 0 || weight <= 0) {
    throw new Error("Height and weight must be positive.");
  }
  const heightInMeters = height / 100;
  const bmi = Number((weight / heightInMeters ** 2).toFixed(1));

  if (bmi < 16) return "Underweight (Severe thinness)";
  if (bmi < 17) return "Underweight (Moderate thinness)";
  if (bmi < 18.5) return "Underweight (Mild thinness)";
  if (bmi < 25) return "Normal range";
  if (bmi < 30) return "Overweight (Pre-obese)";
  if (bmi < 35) return "Obese (Class I)";
  if (bmi < 40) return "Obese (Class II)";

  return "Obese (Class III)";
}

// console.log(calculateBmi(172, 82));

interface BmiValues {
  height: number;
  weight: number;
}

function parseArguments(args: string[]): BmiValues {
  if (args.length <= 2) throw new Error("No args provided.");
  if (args.length > 4) throw new Error("unkown args provided");
  if (isNotNumber(args[2]) || isNotNumber(args[3]))
    throw new Error("invalid args provided");

  return {
    height: Number(args[2]),
    weight: Number(args[3]),
  };
}

if (process.argv[1] === import.meta.filename) {
  try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = "Something bad happend.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
