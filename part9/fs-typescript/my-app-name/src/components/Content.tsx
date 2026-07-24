import type { CoursePart } from "../types";
import { Part } from "./Part";

export const Content = ({ data }: { data: CoursePart[] }) => {
  return data.map((elem) => <Part part={elem} />);
};
