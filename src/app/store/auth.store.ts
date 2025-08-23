import { makeAutoObservable, runInAction } from "mobx";
import { AuthService } from "./api.auth";

class AuthStore {
  isAuthenticated = false;
  user: any = null;
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.checkAuth();
  }

  async register(email: string, password: string) {
    this.loading = true;
    this.error = null;

    try {
      await AuthService.register(email, password);
      const me = await AuthService.getMe();

      if (!me || !me.id) {
        throw new Error("Ошибка получения данных пользователя");
      }

      runInAction(() => {
        this.user = me;
        this.isAuthenticated = true;
      });
    } catch (err: any) {
      runInAction(() => {
        this.error =
          err.response?.status === 401
            ? "Пользователь с таким email уже существует"
            : err.message || "Ошибка регистрации";
        this.isAuthenticated = false;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async login(email: string, password: string) {
    this.loading = true;
    this.error = null;

    try {
      await AuthService.login(email, password);
      const me = await AuthService.getMe();

      if (!me || !me.id) {
        throw new Error("Ошибка получения данных пользователя");
      }

      runInAction(() => {
        this.user = me;
        this.isAuthenticated = true;
      });
    } catch (err: any) {
      runInAction(() => {
        this.error =
          err.response?.status === 401
            ? "Неверный email или пароль"
            : err.message || "Ошибка входа";
        this.isAuthenticated = false;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async checkAuth() {
    const token = localStorage.getItem("accessToken");
    if (token && token !== "undefined" && token !== "null") {
      try {
        const me = await AuthService.getMe();
        if (me?.id) {
          this.user = me;
          this.isAuthenticated = true;
        } else {
          this.logout();
        }
      } catch {
        this.logout();
      }
    }
  }

  logout() {
    this.isAuthenticated = false;
    this.user = null;
    localStorage.removeItem("accessToken");
  }
}

export const authStore = new AuthStore();
