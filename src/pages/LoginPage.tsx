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

const LoginPage = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    return () => {
      authStore.error = null;
    };
  }, []);
  const handleLogin = async () => {
    await authStore.login(email, password);
    console.log("isAuthenticated:", authStore.isAuthenticated);
    console.log("user:", authStore.user);

    if (authStore.isAuthenticated) {
      if (authStore.user?.role === "manager") {
        console.log("Навигация на /manager");
        navigate(PATHS.MANAGER);
      } else {
        navigate(PATHS.USER);
      }
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
