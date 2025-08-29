import { Navigate, Outlet } from "react-router-dom";
import { authStore } from "../app/store/auth.store";
import { PATHS } from "../paths";

interface RoleGuardProps {
  role: string;
}
const RoleGuard = ({ role }: RoleGuardProps) => {
  if (authStore.user?.role !== role) return <Navigate to={PATHS.HOME} />;
  return <Outlet />;
};

export default RoleGuard;
