import { makeAutoObservable, runInAction } from "mobx";
import { api } from "../../shared/lib/axios";

import type {
  ObjectItem,
  RequestItem,
  RequestStatus,
} from "../../interfaces/manager.interfaces";

class ManagerStore {
  objects: ObjectItem[] = [];
  requests: RequestItem[] = [];
  totalRequests = 0;

  objectsLoading = false;
  requestsLoading = false;

  reqPage = 1;
  reqLimit = 10;
  reqStatus: RequestStatus | "all" = "all";
  reqObjectId: number | "all" = "all";
  reqSearch = "";
  reqSortBy: keyof RequestItem = "createdAt";
  reqOrder: "asc" | "desc" = "desc";

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async fetchObjects() {
    runInAction(() => (this.objectsLoading = true));

    try {
      const { data: objects } = await api.get<ObjectItem[]>("/objects");
      const { data: requests } = await api.get<RequestItem[]>("/requests");

      const counts = requests.reduce<Record<number, number>>((acc, r) => {
        acc[r.objectId] = (acc[r.objectId] || 0) + 1;
        return acc;
      }, {});

      runInAction(() => {
        this.objects = objects.map((o) => ({
          ...o,
          requestsCount: counts[o.id] || 0,
        }));
      });
    } catch (e) {
      console.error("Ошибка при загрузке объектов:", e);
    } finally {
      runInAction(() => (this.objectsLoading = false));
    }
  }

  async fetchRequests() {
    runInAction(() => (this.requestsLoading = true));

    try {
      const { data, headers } = await api.get<RequestItem[]>("/requests");

      console.log("===== Mokky /requests =====");
      console.log("data:", data);
      console.log("headers:", headers);

      const requestsArray: RequestItem[] = Array.isArray(data) ? data : [];

      runInAction(() => {
        this.requests = requestsArray;
        this.totalRequests = requestsArray.length;
      });
    } catch (e) {
      console.error("Ошибка при загрузке заявок:", e);
    } finally {
      runInAction(() => (this.requestsLoading = false));
    }
  }

  async updateRequestStatus(id: number, status: RequestStatus) {
    const prev = this.requests.slice();

    runInAction(() => {
      this.requests = this.requests.map((r) =>
        r.id === id ? { ...r, status } : r
      );
    });

    try {
      await api.patch(`/requests/${id}`, { status });
    } catch (e) {
      console.error("Ошибка при обновлении статуса:", e);
      runInAction(() => {
        this.requests = prev;
      });
    }
  }
}

export const managerStore = new ManagerStore();
