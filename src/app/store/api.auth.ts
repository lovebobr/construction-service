import { api } from "../../shared/lib/axios";
import type { User, AuthResponse } from "../../interfaces/aurh.interfaces";
import { PATHS } from "../../paths";

export const AuthService = {
  async register(email: string, password: string): Promise<User> {
    if (!email || !password) {
      throw new Error("Заполните email и пароль");
    }

    const { data } = await api.post<AuthResponse>(PATHS.REGISTER, {
      email,
      password,
      role: "user",
    });
    localStorage.setItem("accessToken", data.token);

    const { data: user } = await api.get<User>("/auth_me");
    return user;
  },

  async login(email: string, password: string): Promise<User> {
    if (!email || !password) {
      throw new Error("Заполните email и пароль");
    }
    const { data } = await api.post<AuthResponse>(PATHS.LOGIN, {
      email,
      password,
    });

    if (!data?.token) {
      throw new Error("Неверные учетные данные");
    }

    localStorage.setItem("accessToken", data.token);

    const { data: user } = await api.get<User>("/auth_me");
    return user;
  },

  async getMe(): Promise<User> {
    const { data } = await api.get<User>("/auth_me");
    return data;
  },

  async logout() {
    localStorage.removeItem("accessToken");
  },
};
