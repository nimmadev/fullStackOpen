import type { CoursePart } from "../types";
import { assertNever } from "../utils";

export const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <h2>
            {part.name} {part.exerciseCount}
          </h2>
          <p>{part.description}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <h2>
            {part.name} {part.exerciseCount}
          </h2>
          <p>
            {part.description}
            {part.backgroundMaterial}
          </p>
        </div>
      );
    case "group":
      return (
        <div>
          <h2>
            {part.name} {part.exerciseCount}
          </h2>
          <p> {part.groupProjectCount} </p>
        </div>
      );
    case "special":
      return (
        <div>
          <h2>
            {part.name} {part.exerciseCount}
          </h2>
          <p>{part.description}</p>
          <p>requirements: {part.requirements.join(", ")}</p>
        </div>
      );
    default:
      assertNever(part);
  }
};
