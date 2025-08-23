import axios from "axios";
export const api = axios.create({
  baseURL: "https://06a06287beb80971.mokky.dev",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token && token !== "undefined" && token !== "null") {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      originalRequest.url?.includes("/register") ||
      originalRequest.url?.includes("/auth")
    ) {
      throw error;
    }

    if (error.response?.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true;
    }

    throw error;
  }
);
