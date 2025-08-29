import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
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

const RegisterPage = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  useEffect(() => {
    return () => {
      authStore.error = null;
    };
  }, []);
  const handleRegister = async () => {
    let emailErr = "";
    let passwordErr = "";

    if (!email && password) {
      emailErr = "Введите email";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email) && email) {
        emailErr = "Некорректный email";
      }
    }

    if (!password && email) {
      passwordErr = "Введите пароль";
    } else if (password.length < 0 && password.length !== 0) {
      passwordErr = "Пароль должен быть не менее 6 символов";
    }
    setEmailError(emailErr);
    setPasswordError(passwordErr);

    if (emailErr || passwordErr) return;
    if (emailError || passwordError) return;

    try {
      await authStore.register(email, password);
      if (!authStore.error) {
        setEmailError("");
        setPasswordError("");
        navigate(PATHS.HOME);
      }
    } catch (error) {
      console.error("Ошибка регистрации", error);
    }
  };

  return (
    <PageWrapper>
      <FormWrapper>
        <Title>Регистрация</Title>
        {authStore.error && <ErrorText>{authStore.error}</ErrorText>}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <ErrorText>{emailError}</ErrorText>}
        <Input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <ErrorText>{passwordError}</ErrorText>}
        <Button onClick={handleRegister} disabled={authStore.loading}>
          {authStore.loading ? "Загрузка..." : "Зарегистрироваться"}
        </Button>
        <StyledLink to={PATHS.LOGIN}>Есть аккаунта? Войдите</StyledLink>
      </FormWrapper>
    </PageWrapper>
  );
});

export default RegisterPage;
