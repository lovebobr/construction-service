export type RequestStatus = "new" | "done" | "rejected";

export interface ObjectItem {
  id: number;
  title: string;
  adress?: string;
  createdAt?: string;
  requestsCount?: number;
}

export interface RequestItem {
  id: number;
  title: string;
  description?: string;
  email: string;
  createdAt: string;
  status: RequestStatus;
  objectId: number;
  fileUrl?: string;
  object?: ObjectItem;
}
