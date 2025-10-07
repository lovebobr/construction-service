import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRequestById } from "../api/requestsApi";
import AppLayout from "../app/components/AppLayout";
import { PageWrapper, Title } from "./UserPage.styles";

const RequestStatusPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [request, setRequest] = useState<any>(null);

  useEffect(() => {
    if (id) {
      getRequestById(id).then(setRequest).catch(console.error);
    }
  }, [id]);

  if (!request) return <AppLayout>Загрузка...</AppLayout>;

  return (
    <AppLayout>
      <PageWrapper>
        <Title>Статус заявки</Title>
        <p>
          <b>Название:</b> {request.title}
        </p>
        <p>
          <b>Описание:</b> {request.description}
        </p>
        <p>
          <b>Статус:</b> {request.status}
        </p>
        <p>
          <b>Email:</b> {request.email}
        </p>
      </PageWrapper>
    </AppLayout>
  );
};

export default RequestStatusPage;
