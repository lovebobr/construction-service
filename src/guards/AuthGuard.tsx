import { Navigate } from "react-router-dom";
import { authStore } from "../app/store/auth.store";
import { observer } from "mobx-react-lite";
import type { ReactNode } from "react";

const AuthGuard = observer(({ children }: { children: ReactNode }) => {
  if (authStore.loading) return <div>Загрузка...</div>;
  if (!authStore.isAuthenticated) {
    return <Navigate to="/auth" />;
  }
  return children;
});

export default AuthGuard;
