interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDes extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDes {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartDes {
  backgroundMaterial: string;
  kind: "background";
}
interface CoursePartSpecial extends CoursePartDes {
  requirements: string[];
  kind: "special";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;
