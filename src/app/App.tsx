import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthGuard from "../guards/AuthGuard";
import RoleGuard from "../guards/RoleGuard";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ManagerPage from "../pages/ManagerPage";
import UserPage from "../pages/UserPage";

import { GlobalStyle } from "../styles/global-styles";
import { PATHS } from "../paths";
import RequestStatusPage from "../pages/RequestStatusPage";
function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path={PATHS.LOGIN} element={<LoginPage />} />
          <Route path={PATHS.REGISTER} element={<RegisterPage />} />
          <Route path="/" element={<Navigate to={PATHS.USER} replace />} />
          <Route element={<AuthGuard />}>
            <Route element={<RoleGuard role="manager" />}>
              <Route path={PATHS.MANAGER} element={<ManagerPage />} />
            </Route>

            {/* <Route element={<RoleGuard role="user" />}> */}
            <Route path={PATHS.USER} element={<UserPage />} />
            <Route path="/status/:id" element={<RequestStatusPage />} />
            {/* </Route> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
