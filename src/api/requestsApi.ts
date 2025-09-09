import { api } from "../shared/lib/axios";

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await api.post("/uploads", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const createRequest = async (payload: any) => {
  const { data } = await api.post("/requests", payload);
  return data;
};

export const getObjects = async () => {
  const { data } = await api.get("/objects");
  return data;
};

export const getRequestById = async (id: string | number) => {
  const { data } = await api.get(`/requests/${id}`);
  return data;
};

export const getRequestsByUserId = async (userId: number) => {
  const { data } = await api.get(`/requests?user_id=${userId}`);
  return data;
};
