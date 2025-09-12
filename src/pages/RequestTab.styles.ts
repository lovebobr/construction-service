import styled from "styled-components";
export const StatusBadge = styled.span<{ $status: string }>`
  display: inline-block;
  padding: 2px 10px;
  border-radius: 12px;
  font-weight: 500;
  text-transform: capitalize;
  font-size: 14px;
  color: white;
  background-color: ${({ $status }) =>
    $status === "done"
      ? "rgba(76, 175, 80, 0.7)"
      : $status === "rejected"
      ? "rgba(244, 67, 54, 0.7)"
      : "rgba(33, 150, 243, 0.7)"};
  backdrop-filter: blur(2px);
`;
export const PaginationWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const PageButton = styled.button<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background-color: ${({ disabled }) =>
    disabled ? "var(--color-border)" : "var(--color-primary)"};
  color: white;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ disabled }) =>
      disabled ? "var(--color-border)" : "var(--color-primary-hover)"};
  }
`;

export const PageInfo = styled.span`
  font-size: 14px;
  color: var(--color-text);
`;
export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`;

export const Th = styled.th<{ $width?: string }>`
  text-align: left;
  padding: 8px;
  border-bottom: 1px solid #ddd;
  width: ${({ $width }) => $width || "auto"};
`;

export const Td = styled.td`
  padding: 8px;
  border-bottom: 1px solid #eee;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const FiltersWrapper = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

export const SelectStyled = styled.select`
  padding: 6px 12px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: white;
  font-size: 14px;
  cursor: pointer;
  outline: none;

  &:hover {
    background: #f7f7f7;
  }

  &:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
  }
`;
