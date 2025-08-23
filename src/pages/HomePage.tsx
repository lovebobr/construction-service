import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  font-size: 16px;
  display: block;
  margin: 10px 0;
  &:hover {
    text-decoration: underline;
  }
`;
const HomePage = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Это ваш дом</h1>
      <p>Вы можете:</p>
      <StyledLink to="/auth">Войти</StyledLink>
      <StyledLink to="/register">Зарегистрироваться</StyledLink>
    </div>
  );
};

export default HomePage;
