import axios from "axios";

interface IAPIData {
  quizSetId?: number;
  problemId?: number;
  code?: number;
  image?: FileList;
  audio?: FileList;
  images?: FileList;
  audios?: FileList;
}

const FILE_UPLOAD_API_ENDPOINT = "/api/v0/upload";
const FORM_CONTENT_TYPE = { "Content-Type": "multipart/form-data" };
const JSON_CONTENT_TYPE = { "Content-Type": "application/json" };

const uploadFileApi = async (
  file: File,
  fileName: string,
  type: "image" | "audio"
): Promise<string> => {
  const formData = new FormData();

  formData.append(type, file);
  formData.append(`${type}Id`, fileName);

  try {
    const { data } = await axios.post(
      `${FILE_UPLOAD_API_ENDPOINT}/${type}`,
      formData,
      {
        headers: FORM_CONTENT_TYPE
      }
    );

    return data?.filePath || "";
  } catch (error) {
    console.error(error);
    return "";
  }
};

export const uploadFile = async <T extends IAPIData>(
  data: T,
  type: "image" | "audio",
  domain: "quiz" | "http"
): Promise<string> => {
  const file = data[type]?.[0];
  if (!file) return "";

  return await uploadFileApi(
    file,
    makeFileName(data, file, domain, type),
    type
  );
};

export const uploadFiles = async <T extends IAPIData>(
  data: T,
  type: "images" | "audios",
  domain: "quiz" | "http"
): Promise<string[]> => {
  const files = data[type];
  if (!files) return [];

  const uploadedResult = Array.from(files).map((file, index) =>
    uploadFileApi(
      file,
      makeFileName(data, file, domain, type, index),
      type.slice(0, -1) as "image" | "audio"
    )
  );

  const results = await Promise.all(uploadedResult);
  return results.some((result) => !result) ? [] : results;
};

export const uploadData = async <T>(data: T, url: string) => {
  try {
    await axios.post(url, data, { headers: JSON_CONTENT_TYPE });
  } catch (error) {
    console.error(`${error} occurred`);
  }
};

const makeFileName = <T extends IAPIData>(
  data: T,
  file: File,
  domain: "quiz" | "http",
  type: string,
  index?: number
) => {
  const suffix = file.name.split(".").pop() || "";
  const prefix =
    domain === "quiz"
      ? `quiz_${data.quizSetId}_${data.problemId}_${type}`
      : `http_${data.code}`;
  const postfix = index ?? "";

  return `${prefix}_${postfix}.${suffix}`;
};
