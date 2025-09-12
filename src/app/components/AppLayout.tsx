import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { authStore } from "../store/auth.store";
import styled from "styled-components";
import { LogOut, LogIn, ArrowLeft } from "lucide-react";
import { PATHS } from "../../paths";

const LayoutWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  background: var(--color-bg);
  font-family: Arial, sans-serif;
`;
const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  display: inline-flex;
  align-items: center;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: bold;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-primary-hover);
  }
`;

const ActionWrapper = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  z-index: 1000;

  background: none;
  border: none;
  color: var(--color-text);

  &:hover {
    color: var(--color-primary);
  }

  svg {
    margin-right: 5px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 90%;
  margin: 0 auto;
  padding: 50px 20px 20px;
`;

const AppLayout: React.FC<{ children: React.ReactNode }> = observer(
  ({ children }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
      authStore.logout();
      navigate(PATHS.LOGIN, { replace: true });
    };

    const handleLogin = () => {
      navigate(PATHS.LOGIN);
    };

    return (
      <LayoutWrapper>
        {location.pathname !== PATHS.USER &&
          authStore.user?.role !== "manager" && (
            <BackButton onClick={() => navigate(-1)}>
              <ArrowLeft size={16} /> Назад
            </BackButton>
          )}
        {authStore.isAuthenticated ? (
          <ActionWrapper onClick={handleLogout}>
            <LogOut size={16} /> Выйти
          </ActionWrapper>
        ) : (
          <ActionWrapper onClick={handleLogin}>
            <LogIn size={16} /> Войти
          </ActionWrapper>
        )}

        <ContentWrapper>{children}</ContentWrapper>
      </LayoutWrapper>
    );
  }
);

export default AppLayout;
