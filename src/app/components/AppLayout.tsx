import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { authStore } from "../store/auth.store";
import styled from "styled-components";
import { LogOut, LogIn } from "lucide-react";
import { PATHS } from "../../paths";

const LayoutWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  background: var(--color-bg);
  font-family: Arial, sans-serif;
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
  color: #333;

  &:hover {
    color: #007bff;
  }

  svg {
    margin-right: 5px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 800px;
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
