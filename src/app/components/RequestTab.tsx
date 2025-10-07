import React, { useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { managerStore } from "../store/managerStore";
import type { RequestStatus } from "../../interfaces/manager.interfaces";

import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  PageButton,
  PageInfo,
  PaginationWrapper,
  StatusBadge,
  Td,
  Th,
  Table,
  FiltersWrapper,
  SelectStyled,
} from "../../pages/RequestTab.styles";
import { TableWrapper } from "../../pages/Table.styles";

const RequestsTab: React.FC = observer(() => {
  const REQUESTS_PER_PAGE = 5;
  const [sortById, setSortById] = useState<"asc" | "desc">("asc");
  const [sortByDate, setSortByDate] = useState<"asc" | "desc">("desc");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "new" | "done" | "rejected"
  >("all");
  const [expandedCells, setExpandedCells] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    managerStore.fetchRequests();
  }, [
    managerStore.reqStatus,
    managerStore.reqObjectId,
    managerStore.reqSearch,
    managerStore.reqSortBy,
    managerStore.reqOrder,
  ]);
  const filteredRequests = useMemo(() => {
    let result = [...managerStore.requests];

    if (statusFilter !== "all") {
      result = result.filter((r) => r.status === statusFilter);
    }

    result.sort((a, b) => {
      const idCompare = sortById === "asc" ? a.id - b.id : b.id - a.id;
      if (idCompare !== 0) return idCompare;

      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortByDate === "asc" ? dateA - dateB : dateB - dateA;
    });

    return result;
  }, [managerStore.requests, sortById, sortByDate, statusFilter]);
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredRequests.length / REQUESTS_PER_PAGE)),
    [filteredRequests.length]
  );

  const paginatedRequests = useMemo(() => {
    const start = (managerStore.reqPage - 1) * REQUESTS_PER_PAGE;
    const end = start + REQUESTS_PER_PAGE;
    return filteredRequests.slice(start, end);
  }, [filteredRequests, managerStore.reqPage]);
  const toggleExpand = (key: string) => {
    setExpandedCells((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (managerStore.requestsLoading) return <p>Загрузка...</p>;

  return (
    <TableWrapper>
      <h3>Заявки</h3>
      <FiltersWrapper>
        <SelectStyled
          value={sortById}
          onChange={(e) => setSortById(e.target.value as "asc" | "desc")}
        >
          <option value="asc">По возрастанию</option>
          <option value="desc">По убыванию</option>
        </SelectStyled>

        <SelectStyled
          value={sortByDate}
          onChange={(e) => setSortByDate(e.target.value as "asc" | "desc")}
        >
          <option value="desc">Сначала новые</option>
          <option value="asc">Сначала старые</option>
        </SelectStyled>

        <SelectStyled
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
        >
          <option value="all">Все</option>
          <option value="new">Новые</option>
          <option value="done">Завершённые</option>
          <option value="rejected">Отклонённые</option>
        </SelectStyled>
      </FiltersWrapper>
      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Название</Th>
            <Th>Описание</Th>
            <Th>Email</Th>
            <Th>Дата подачи</Th>
            <Th>Статус</Th>
            <Th>Изменить</Th>
          </tr>
        </thead>
        <tbody>
          {paginatedRequests.map((r) => (
            <tr key={r.id}>
              <Td>{r.id}</Td>
              <Td>{r.title}</Td>
              <Td
                onDoubleClick={() => toggleExpand(`desc-${r.id}`)}
                style={{
                  whiteSpace: expandedCells[`desc-${r.id}`]
                    ? "normal"
                    : "nowrap",
                  cursor: "pointer",
                }}
              >
                {r.description}
              </Td>
              <Td>{r.email}</Td>
              <Td>{new Date(r.createdAt).toISOString().split("T")[0]}</Td>
              <Td>
                <StatusBadge $status={r.status}>{r.status}</StatusBadge>
              </Td>
              <Td>
                <SelectStyled
                  value={r.status}
                  onChange={(e) =>
                    managerStore.updateRequestStatus(
                      r.id,
                      e.target.value as RequestStatus
                    )
                  }
                >
                  <option value="new">new</option>
                  <option value="done">done</option>
                  <option value="rejected">rejected</option>
                </SelectStyled>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      <PaginationWrapper>
        <PageButton
          disabled={managerStore.reqPage === 1}
          onClick={() => (managerStore.reqPage -= 1)}
        >
          <ArrowLeft size={18} />
        </PageButton>
        <PageInfo>
          {managerStore.reqPage} / {totalPages}
        </PageInfo>
        <PageButton
          disabled={managerStore.reqPage >= totalPages}
          onClick={() => (managerStore.reqPage += 1)}
        >
          <ArrowRight size={18} />
        </PageButton>
      </PaginationWrapper>
    </TableWrapper>
  );
});
export default RequestsTab;
