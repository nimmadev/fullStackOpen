import express from "express";
import diaryRouter from "./routes/diaries.ts";

const app = express();
app.use(express.json());

const PORT = 3001;

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/diaries", diaryRouter);

app.listen(PORT, (err: unknown) => {
  if (err instanceof Error) {
    console.log(err.message);
  } else {
    console.log(`Server running on port ${PORT}`);
  }
});
