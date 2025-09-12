import { Outlet } from "react-router-dom";
import { authStore } from "../app/store/auth.store";
import { observer } from "mobx-react-lite";
// import { PATHS } from "../paths";
import { useEffect } from "react";

const AuthGuard = observer(() => {
  useEffect(() => {
    if (!authStore.isAuthenticated && !authStore.loading) {
      authStore.checkAuth();
    }
  }, []);
  if (authStore.loading) return <div>Загрузка...</div>;
  // if (!authStore.isAuthenticated) {
  //   return <Navigate to={PATHS.LOGIN} replace />;
  // }
  return <Outlet />;
});

export default AuthGuard;
