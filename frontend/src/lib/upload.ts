import axios from "axios";

interface IAPIData {
  quizSetId?: number;
  problemId?: number;
  code?: number;
  image?: FileList;
  audio?: FileList;
}

export const uploadApi = async (
  file: File,
  fileName: string,
  type: "image" | "audio"
): Promise<string> => {
  const formData = new FormData();

  formData.append(type, file);
  formData.append(`${type}Id`, fileName);

  try {
    const { data } = await axios.post(`/api/v0/upload/${type}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    return data?.filePath || "";
  } catch (error) {
    console.error(error);
    return "";
  }
};

export const uploadFile = async <T extends IAPIData>(
  data: T,
  type: "image" | "audio",
  domain: "quiz" | "http",
  index?: number
): Promise<string> => {
  const file = data[type]?.[0];
  if (!file) return "";
  const suffix = getSuffix(file.name);
  const prefix =
    domain === "quiz"
      ? `quiz_${data.quizSetId}_${data.problemId}_${type}`
      : `http_${data.code}`;

  const postfix = index ?? "";
  const fileName = prefix + postfix + "." + suffix;

  return await uploadApi(file, fileName, type);
};

export const getSuffix = (filename: string): string => {
  const suffix = filename.split(".").pop();
  return suffix || "";
};

export const uploadData = async <T>(data: T, url: string) => {
  try {
    axios.post(url, data, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error(`${error} occurred`);
  }
};
