import React, { useState } from "react";
import ObjectsTab from "../app/components/ObjectTab";
import RequestsTab from "../app/components/RequestTab";
import styled from "styled-components";
import AppLayout from "../app/components/AppLayout";
import { Tabs, Tab } from "./Tabs.styles";

const PageWrapper = styled.div`
  padding: 30px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const ManagerPage: React.FC = () => {
  const [tab, setTab] = useState<"objects" | "requests">("objects");

  return (
    <AppLayout>
      <PageWrapper>
        <Title>Менеджер</Title>
        <Tabs>
          <Tab $active={tab === "objects"} onClick={() => setTab("objects")}>
            Объекты
          </Tab>
          <Tab $active={tab === "requests"} onClick={() => setTab("requests")}>
            Заявки
          </Tab>
        </Tabs>
        {tab === "objects" ? <ObjectsTab /> : <RequestsTab />}
      </PageWrapper>
    </AppLayout>
  );
};

export default ManagerPage;
