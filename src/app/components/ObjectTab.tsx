import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { managerStore } from "../store/managerStore";
import { Table, Th, Td, TableWrapper } from "../../pages/Table.styles";

const ObjectsTab: React.FC = observer(() => {
  useEffect(() => {
    managerStore.fetchObjects();
  }, []);

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
            <Th>Кол-во заявок</Th>
          </tr>
        </thead>
        <tbody>
          {managerStore.objects.map((o) => (
            <tr key={o.id}>
              <Td>#{o.id}</Td>
              <Td>{o.title}</Td>
              <Td>{o.adress || "—"}</Td>
              <Td>
                <b>{o.requestsCount}</b>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableWrapper>
  );
});

export default ObjectsTab;
