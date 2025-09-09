import React, { useEffect, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { managerStore } from "../store/managerStore";
import type { RequestStatus } from "../../interfaces/manager.interfaces";
import { Table, TableWrapper, Td, Th } from "../../pages/Table.styles";

const RequestsTab: React.FC = observer(() => {
  useEffect(() => {
    managerStore.fetchRequests();
  }, [
    managerStore.reqPage,
    managerStore.reqLimit,
    managerStore.reqStatus,
    managerStore.reqObjectId,
    managerStore.reqSearch,
    managerStore.reqSortBy,
    managerStore.reqOrder,
  ]);

  const totalPages = useMemo(
    () =>
      Math.max(
        1,
        Math.ceil(managerStore.totalRequests / managerStore.reqLimit)
      ),
    [managerStore.totalRequests, managerStore.reqLimit]
  );

  if (managerStore.requestsLoading) return <p>Загрузка...</p>;

  return (
    <TableWrapper>
      <h3>Заявки</h3>
      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Название</Th>
            <Th>Email</Th>
            <Th>Статус</Th>
            <Th>Изменить</Th>
          </tr>
        </thead>
        <tbody>
          {managerStore.requests.map((r) => (
            <tr key={r.id}>
              <Td>#{r.id}</Td>
              <Td>{r.title}</Td>
              <Td>{r.email}</Td>
              <Td>{r.status}</Td>
              <Td>
                <select
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
                </select>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div style={{ marginTop: "15px", textAlign: "center" }}>
        Стр. {managerStore.reqPage} из {totalPages}
        <button
          disabled={managerStore.reqPage === 1}
          onClick={() => (managerStore.reqPage -= 1)}
        >
          Назад
        </button>
        <button
          disabled={managerStore.reqPage >= totalPages}
          onClick={() => (managerStore.reqPage += 1)}
        >
          Вперёд
        </button>
      </div>
    </TableWrapper>
  );
});

export default RequestsTab;
