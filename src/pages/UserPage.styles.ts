import styled from "styled-components";

export const PageWrapper = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background: var(--color-bg-form);
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-family: "Arial", sans-serif;
  color: var(--color-text);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  font-size: 16px;
  box-sizing: border-box;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
  }
`;
export const Inputs = styled.input`
  padding: 10px;
  font-size: 16px;
`;
export const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  font-size: 16px;
  font-family: "Arial", sans-serif;
  resize: vertical;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px 15px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  font-size: 16px;
  transition: all 0.3s;
  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
  }
`;

export const Button = styled.button<{ disabled?: boolean }>`
  width: 100%;
  padding: 12px 15px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  background-color: ${({ disabled }) =>
    disabled ? "var(--color-disabled)" : "var(--color-primary)"};
  border: none;
  border-radius: 8px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all 0.3s;

  &:hover {
    background-color: ${({ disabled }) =>
      disabled ? "var(--color-disabled)" : "var(--color-primary-hover)"};
    transform: ${({ disabled }) => (disabled ? "none" : "translateY(-2px)")};
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 5px 15px rgba(0, 0, 0, 0.2)"};
  }
`;

export const LinkContainer = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 14px;

  a {
    color: var(--color-primary);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Tab = styled.span<{ active?: boolean }>`
  position: relative;
  font-size: 18px;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  color: ${({ active }) =>
    active ? "var(--color-primary)" : "var(--color-text)"};
  cursor: pointer;
  transition: color 0.3s ease;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -4px;
    height: 2px;
    width: ${({ active }) => (active ? "100%" : "0")};
    background-color: var(--color-primary);
    transition: width 0.3s ease;
  }

  &:hover {
    color: var(--color-primary-hover);
  }

  &:hover::after {
    width: 100%;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div<{ $type: "success" | "error" }>`
  background-color: #fff;
  border-radius: 12px;
  padding: 30px 40px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  min-width: 300px;
  max-width: 400px;

  h3 {
    color: ${({ $type }) => ($type === "success" ? "#4caf50" : "#f44336")};
    margin-bottom: 15px;
    font-size: 20px;
  }
`;

export const CloseButton = styled.button<{ $type: "success" | "error" }>`
  margin-top: 20px;
  padding: 8px 20px;
  border-radius: 8px;
  border: none;
  background-color: ${({ $type }) =>
    $type === "success" ? "#4caf50" : "#f44336"};
  color: white;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ $type }) =>
      $type === "success" ? "#43a047" : "#d32f2f"};
  }
`;
