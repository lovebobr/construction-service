import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;
  font-family: "Arial", sans-serif;
`;

export const Th = styled.th`
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid var(--color-border);
  background-color: var(--color-bg-form);
  color: var(--color-text);
`;

export const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text);
`;

export const TableWrapper = styled.div`
  background: var(--color-bg-form);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
`;
