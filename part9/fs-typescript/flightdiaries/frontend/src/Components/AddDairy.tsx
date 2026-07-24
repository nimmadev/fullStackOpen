import {
  Visibility,
  Weather,
  type NewDiaryEntry,
} from "../../../backend/src/types";
import { useNotify } from "../hooks/Notification";
import diariesService from "../Services/diaries";
import type { Page } from "../types";

export const AddDiary = ({ setPage }: { setPage: (page: Page) => void }) => {
  const message = useNotify();
  const handleForm = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const entry = {
      date: formData.get("date"),
      weather: formData.get("weather"),
      visibility: formData.get("visibility"),
      comment: formData.get("comment"),
    } as NewDiaryEntry;
    diariesService
      .createDiary(entry)
      .then(() => setPage("home"))
      .catch((error: unknown) =>
        diariesService.axiosErrorHanlder(error, message),
      );
  };

  return (
    <>
      <h1>Add a new entry</h1>
      <form onSubmit={handleForm} style={{ maxWidth: 300 }}>
        <div>
          <label>
            Date
            <input type="date" name="date" />
          </label>
        </div>

        <fieldset>
          <legend>Weather</legend>
          {Object.values(Weather).map((weather) => (
            <label key={weather}>
              <input type="radio" name="weather" value={weather} />
              {weather}
            </label>
          ))}
        </fieldset>

        <fieldset>
          <legend>Visibility</legend>
          {Object.values(Visibility).map((visibility) => (
            <label key={visibility}>
              <input type="radio" name="visibility" value={visibility} />
              {visibility}
            </label>
          ))}
        </fieldset>

        <div>
          <label>
            Comment
            <textarea name="comment" rows={3} />
          </label>
        </div>

        <button type="submit">Add</button>
      </form>
    </>
  );
};
