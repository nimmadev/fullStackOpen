import axios from "axios";
import type { DiaryEntry, NewDiaryEntry } from "../../../backend/src/types";
import type { NotificationContextType } from "../types";

const getAll = () => {
  return axios.get<DiaryEntry[]>("/api/diaries").then(({ data }) => data);
};

const createDiary = (data: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>("/api/diaries", data)
    .then((data) => console.log(data));
};

const axiosErrorHanlder = (
  error: unknown,
  message: NotificationContextType | null,
) => {
  if (axios.isAxiosError(error)) {
    if (error.response && error.response.data && error.response.data.error) {
      message?.setMessage(error.response.data.error[0].message);
    } else {
      message?.setMessage(error.message);
    }
  } else {
    message?.setMessage("Something bad happend.");
  }
};
export default { getAll, createDiary, axiosErrorHanlder };
