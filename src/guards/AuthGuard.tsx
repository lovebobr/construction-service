import { Navigate, Outlet } from "react-router-dom";
import { authStore } from "../app/store/auth.store";
import { observer } from "mobx-react-lite";
import { PATHS } from "../paths";

const AuthGuard = observer(() => {
  if (authStore.loading) return <div>Загрузка...</div>;
  if (!authStore.isAuthenticated) {
    return <Navigate to={PATHS.LOGIN} />; //исправить, что-то неприятное
  }
  return <Outlet />;
});

export default AuthGuard;
