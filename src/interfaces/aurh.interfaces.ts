export interface User {
  id: number;
  email: string;
  role: "user" | "manager";
}
export interface AuthResponse {
  token: string;
}
