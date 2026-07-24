import { useState } from "react";

import { Home } from "./Components/Home";
import { AddDiary } from "./Components/AddDairy";
import type { Page } from "./types";
import { Notification } from "./Components/Notification";

function App() {
  // const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [page, setPage] = useState<Page>("home");
  // useEffect(() => {
  //   diariesService.getAll().then((data) => setDiaries(data));
  // }, []);

  return (
    <div>
      <nav>
        <button onClick={() => setPage("home")}>View Diaries</button>
        <button onClick={() => setPage("add")}>Add Diary</button>
      </nav>
      <Notification />
      {page === "home" && <Home />}
      {page === "add" && <AddDiary setPage={setPage} />}
    </div>
  );
}

export default App;
