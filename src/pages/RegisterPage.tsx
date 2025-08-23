import { observer } from "mobx-react-lite";
import { useState } from "react";
import { authStore } from "../app/store/auth.store";
import { useNavigate, Link } from "react-router-dom";
import townImg from "../assets/town.jpg";
import styled from "styled-components";

const PageWrapper = styled.div`
  min-height: 100vh;
  background: url(${townImg}) ;
    no-repeat center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormWrapper = styled.div`
  background: rgba(255, 255, 255, 1);
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;
const Title = styled.h1`
  margin-bottom: 20px;
  font-family: "Arial", sans-serif;
  color: #333;
  font-size: 26px;
`;
const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  font-size: 16px;
  transition: all 0.3s;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
  }
`;
const Button = styled.button<{ disabled?: boolean }>`
  width: 100%;
  padding: 12px 15px;
  margin-bottom: 20px;
  background-color: ${({ disabled }) => (disabled ? "#cccccc" : "#007bff")};
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all 0.3s;
  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#cccccc" : "#0056b3")};
    transform: ${({ disabled }) => (disabled ? "none" : "translateY(-2px)")};
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 5px 15px rgba(0, 0, 0, 0.2)"};
  }
`;
const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 15px;
  font-size: 14px;
`;
const StyledLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  font-size: 14px;
  &:hover {
    text-decoration: underline;
  }
`;
const RegisterPage = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password) {
      alert("Введите email и пароль");
      return;
    }
    try {
      await authStore.register(email, password);
      if (!authStore.error) {
        navigate("/");
      }
    } catch (error) {
      console.error("Ошибка регистрации", error);
    }
  };

  return (
    <PageWrapper>
      <FormWrapper>
        <Title>Регистрация</Title>
        {authStore.error && <ErrorMessage>{authStore.error}</ErrorMessage>}
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
        <Button onClick={handleRegister} disabled={authStore.loading}>
          {authStore.loading ? "Загрузка..." : "Зарегистрироваться"}
        </Button>
        <StyledLink to="/auth">Есть аккаунта? Войдите</StyledLink>
      </FormWrapper>
    </PageWrapper>
  );
});

export default RegisterPage;
