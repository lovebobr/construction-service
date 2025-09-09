import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { authStore } from "../app/store/auth.store";
import { PATHS } from "../paths";
import AppLayout from "../app/components/AppLayout";

const StyledLink = styled.a`
  color: #007bff;
  text-decoration: none;
  font-size: 16px;
  display: block;
  margin: 10px 0;

  &:hover {
    text-decoration: underline;
  }
`;

const HomePage = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    if (authStore.isAuthenticated) {
      if (authStore.user?.role === "manager") {
        navigate(PATHS.MANAGER);
      } else if (authStore.user?.role === "user") {
        navigate(PATHS.USER);
      }
    }
  }, [authStore.isAuthenticated, authStore.user, navigate]);

  if (authStore.isAuthenticated) {
    return null;
  }

  return (
    <AppLayout>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <p>Вы можете:</p>
        <StyledLink href={PATHS.LOGIN}>Войти</StyledLink>
        <StyledLink href={PATHS.REGISTER}>Зарегистрироваться</StyledLink>
      </div>
    </AppLayout>
  );
});

export default HomePage;
