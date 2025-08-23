import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthGuard from "../guards/AuthGuard";
import RoleGuard from "../guards/RoleGuard";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ManagerPage from "../pages/ManagerPage";
import UserPage from "../pages/UserPage";
import HomePage from "../pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
        <Route
          path="/manager"
          element={
            <AuthGuard>
              <RoleGuard role="manager">
                <ManagerPage />
              </RoleGuard>
            </AuthGuard>
          }
        />

        <Route
          path="/user"
          element={
            <AuthGuard>
              <RoleGuard role="user">
                <UserPage />
              </RoleGuard>
            </AuthGuard>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
