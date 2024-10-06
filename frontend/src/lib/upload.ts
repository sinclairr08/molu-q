import axios from "axios";

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

export const uploadFile = async (
  file: File,
  data: any, // IQuizRequets
  type: "image" | "audio",
  index?: number
): Promise<string> => {
  const suffix = getSuffix(file.name);
  const fn =
    index === undefined
      ? `quiz_${data.quizSetId}_${data.problemId}_${type}.${suffix}`
      : `quiz_${data.quizSetId}_${data.problemId}_${type}${index}.${suffix}`;

  return await uploadApi(file, fn, type);
};

export const getSuffix = (filename: string): string => {
  const suffix = filename.split(".").pop();
  return suffix || "";
};

export const uploadMedia = async (
  data: any, // IQuizRequest
  type: "image" | "audio"
): Promise<string> => {
  const file = data[type]?.[0];
  if (!file) return "";

  return await uploadFile(file, data, type);
};
