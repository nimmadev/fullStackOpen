import type { DiaryEntry } from "../../../backend/src/types";

export const Entry = ({ entry }: { entry: DiaryEntry }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "12px",
        marginBottom: "12px",
      }}
    >
      <h3>{entry.date}</h3>

      <p>
        <strong>Weather:</strong> {entry.weather}
      </p>

      <p>
        <strong>Visibility:</strong> {entry.visibility}
      </p>

      {entry.comment && (
        <p>
          <strong>Comment:</strong> {entry.comment}
        </p>
      )}
    </div>
  );
};
