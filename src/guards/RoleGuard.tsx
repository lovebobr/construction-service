import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { authStore } from "../app/store/auth.store";
import { observer } from "mobx-react-lite";

type Role = "manager" | "user";

const RoleGuard = observer(
  ({ children, role }: { children: ReactNode; role: Role }) => {
    if (!authStore.user?.role || authStore.user.role !== role) {
      return <Navigate to="/auth" />;
    }
    return <>{children}</>;
  }
);

export default RoleGuard;
