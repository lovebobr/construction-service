import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { authStore } from "../app/store/auth.store";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../paths";
import {
  PageWrapper,
  FormWrapper,
  Title,
  Input,
  Button,
  StyledLink,
  ErrorText,
} from "./Auth.styles";
import { runInAction } from "mobx";

const LoginPage = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (authStore.isAuthenticated) {
      const redirectPath =
        authStore.user?.role === "manager" ? PATHS.MANAGER : PATHS.USER;
      navigate(redirectPath, { replace: true });
    }

    return () => {
      runInAction(() => {
        authStore.error = null;
      });
    };
  }, [authStore.isAuthenticated, navigate]);

  const handleLogin = async () => {
    await authStore.login(email, password);

    if (authStore.isAuthenticated) {
      const redirectPath =
        authStore.user?.role === "manager" ? PATHS.MANAGER : PATHS.USER;
      navigate(redirectPath, { replace: true });
    }
  };

  return (
    <PageWrapper>
      <FormWrapper>
        <Title>Вход</Title>
        {authStore.error && <ErrorText>{authStore.error}</ErrorText>}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin} disabled={authStore.loading}>
          {authStore.loading ? "Загрузка..." : "Войти"}
        </Button>
        <StyledLink to={PATHS.REGISTER}>
          Нет аккаунта? Зарегистрируйтесь
        </StyledLink>
      </FormWrapper>
    </PageWrapper>
  );
});
export default LoginPage;
