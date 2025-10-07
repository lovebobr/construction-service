import styled from "styled-components";

export const TabsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const TabButton = styled.button<{ $active?: boolean }>`
  background: none;
  border: none;
  font-size: 16px;
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
  color: ${({ $active }) =>
    $active ? "var(--color-primary)" : "var(--color-text)"};
  margin: 0 15px;
  cursor: pointer;
  padding: 5px 10px;
  border-bottom: 2px solid
    ${({ $active }) => ($active ? "var(--color-primary)" : "transparent")};
  transition: all 0.3s;

  &:hover {
    color: var(--color-primary-hover);
  }
`;
export const Tabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 25px;
`;

export const Tab = styled.span<{ $active?: boolean }>`
  position: relative;
  font-size: 18px;
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
  color: ${({ $active }) =>
    $active ? "var(--color-primary)" : "var(--color-text)"};
  cursor: pointer;
  transition: color 0.3s ease;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -4px;
    height: 2px;
    width: ${({ $active }) => ($active ? "100%" : "0")};
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
