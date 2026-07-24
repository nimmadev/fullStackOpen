import { useEffect, useState } from "react";
import type { DiaryEntry } from "../../../backend/src/types";
import diariesService from "../Services/diaries";
import { Entry } from "./Entry";

export const Home = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diariesService.getAll().then((data) => setDiaries(data));
  }, []);
  if (diaries.length < 1) {
    return "loading...";
  }
  return (
    <div>
      {diaries.map((entry) => (
        <Entry key={entry.id} entry={entry} />
      ))}
    </div>
  );
};
