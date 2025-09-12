import React, { useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { managerStore } from "../store/managerStore";
import { Table, Th, Td, TableWrapper } from "../../pages/Table.styles";
import {
  PageButton,
  PageInfo,
  PaginationWrapper,
} from "../../pages/RequestTab.styles";
import { ArrowLeft, ArrowRight } from "lucide-react";

const ObjectsTab: React.FC = observer(() => {
  const OBJECTS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    managerStore.fetchObjects();
  }, []);

  const totalPages = useMemo(
    () =>
      Math.max(1, Math.ceil(managerStore.objects.length / OBJECTS_PER_PAGE)),
    [managerStore.objects.length]
  );

  const paginatedObjects = useMemo(() => {
    const start = (currentPage - 1) * OBJECTS_PER_PAGE;
    const end = start + OBJECTS_PER_PAGE;
    return managerStore.objects.slice(start, end);
  }, [managerStore.objects, currentPage]);

  if (managerStore.objectsLoading) return <p>Загрузка...</p>;

  return (
    <TableWrapper>
      <h3>Объекты</h3>
      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Название</Th>
            <Th>Адрес</Th>
            <Th>Дата регистрации</Th>
            <Th>Кол-во заявок</Th>
          </tr>
        </thead>
        <tbody>
          {paginatedObjects.map((o) => (
            <tr key={o.id}>
              <Td>{o.id}</Td>
              <Td>{o.title}</Td>
              <Td>{o.adress || "—"}</Td>
              <Td>
                {o.createdAt
                  ? new Date(o.createdAt).toISOString().split("T")[0]
                  : "-"}
              </Td>
              <Td>
                <b>{o.requestsCount}</b>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
      <PaginationWrapper>
        <PageButton
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          <ArrowLeft size={18} />
        </PageButton>
        <PageInfo>
          {currentPage} / {totalPages}
        </PageInfo>
        <PageButton
          disabled={currentPage >= totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          <ArrowRight size={18} />
        </PageButton>
      </PaginationWrapper>
    </TableWrapper>
  );
});

export default ObjectsTab;
