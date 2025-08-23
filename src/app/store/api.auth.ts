import { api } from "../../shared/lib/axios";

export const AuthService = {
  async register(email: string, password: string) {
    if (!email || !password) {
      throw new Error("Заполните email и пароль");
    }
    const { data } = await api.post("/register", { email, password });
    localStorage.setItem("accessToken", data.token);
    return data;
  },

  async login(email: string, password: string) {
    if (!email || !password) {
      throw new Error("Заполните email и пароль");
    }

    const { data } = await api.post("/auth", { email, password });

    if (!data?.token) {
      throw new Error("Неверные учетные данные");
    }

    localStorage.setItem("accessToken", data.token);
    return data;
  },

  async getMe() {
    const { data } = await api.get("/auth_me");
    return data;
  },

  async logout() {
    localStorage.removeItem("accessToken");
  },
};
