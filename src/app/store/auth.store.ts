import { makeAutoObservable, runInAction } from "mobx";
import { AuthService } from "./api.auth";
import type { User } from "../../interfaces/aurh.interfaces";

class AuthStore {
  isAuthenticated = false;
  user: User | null = null;
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.checkAuth();
  }

  async register(email: string, password: string): Promise<void> {
    this.loading = true;
    this.error = null;

    try {
      const user = await AuthService.register(email, password);

      runInAction(() => {
        this.user = user;
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

  async login(email: string, password: string): Promise<void> {
    this.loading = true;
    this.error = null;

    try {
      const user = await AuthService.login(email, password);

      runInAction(() => {
        this.user = user;
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

  async checkAuth(): Promise<void> {
    runInAction(() => {
      this.loading = true;
    });
    const token = localStorage.getItem("accessToken");
    if (token && token !== "undefined" && token !== "null") {
      try {
        const user = await AuthService.getMe();
        if (user?.id) {
          runInAction(() => {
            this.user = user;
            this.isAuthenticated = true;
          });
        } else {
          this.logout();
        }
      } catch {
        this.logout();
      }
    }
    runInAction(() => {
      this.loading = false;
    });
  }

  logout(): void {
    runInAction(() => {
      this.isAuthenticated = false;
      this.user = null;
    });

    localStorage.removeItem("accessToken");
  }
}

export const authStore = new AuthStore();
