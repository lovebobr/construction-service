import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { authStore } from "../app/store/auth.store";
import {
  uploadFile,
  createRequest,
  getObjects,
  getRequestsByUserId,
} from "../api/requestsApi";
import {
  PageWrapper,
  Title,
  Form,
  Input,
  TextArea,
  Select,
  Button,
  LinkContainer,
  Inputs,
} from "./UserPage.styles";
import { Tab, Tabs } from "./Tabs.styles";
import { Table, Th, Td, TableWrapper } from "./Table.styles";
import AppLayout from "../app/components/AppLayout";

const UserPage = observer(() => {
  const [activeTab, setActiveTab] = useState<"form" | "requests">("form");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [objectId, setObjectId] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [objects, setObjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusLink, setStatusLink] = useState<string | null>(null);
  const [userRequests, setUserRequests] = useState<any[]>([]);

  useEffect(() => {
    getObjects().then(setObjects).catch(console.error);
  }, []);

  useEffect(() => {
    if (authStore.isAuthenticated && authStore.user?.id) {
      getRequestsByUserId(authStore.user.id)
        .then(setUserRequests)
        .catch(console.error);
    }
  }, [authStore.isAuthenticated, authStore.user?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusLink(null);

    try {
      let fileUrl = null;
      if (file) {
        const uploaded = await uploadFile(file);
        fileUrl = uploaded.url;
      }

      const payload: any = {
        title,
        description,
        email,
        objectId: Number(objectId),
        status: "new",
        createdAt: new Date().toISOString(),
        fileUrl,
      };

      if (authStore.isAuthenticated && authStore.user?.id) {
        payload.user_id = authStore.user.id;
      }

      const newRequest = await createRequest(payload);

      setStatusLink(`/status/${newRequest.id}`);
      setTitle("");
      setDescription("");
      setEmail("");
      setObjectId("");
      setFile(null);

      if (authStore.isAuthenticated && authStore.user?.id) {
        setUserRequests((prev) => [...prev, newRequest]);
      }
    } catch (err) {
      console.error("Ошибка при создании заявки:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <PageWrapper>
        <Tabs>
          <Tab
            $active={activeTab === "form"}
            onClick={() => setActiveTab("form")}
          >
            Создать заявку
          </Tab>

          {authStore.isAuthenticated && (
            <Tab
              $active={activeTab === "requests"}
              onClick={() => setActiveTab("requests")}
            >
              Мои заявки
            </Tab>
          )}
        </Tabs>

        {activeTab === "form" && (
          <Form onSubmit={handleSubmit}>
            <Input
              placeholder="Название"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextArea
              placeholder="Описание"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <Input
              placeholder="Ваш email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Select
              value={objectId}
              onChange={(e) => setObjectId(e.target.value)}
              required
            >
              <option value="">Выберите объект</option>
              {objects.map((obj) => (
                <option key={obj.id} value={obj.id}>
                  {obj.title}
                </option>
              ))}
            </Select>
            <Inputs
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Отправка..." : "Отправить"}
            </Button>

            {statusLink && (
              <LinkContainer>
                <p>Ссылка для проверки статуса:</p>
                <a href={statusLink}>{window.location.origin + statusLink}</a>
              </LinkContainer>
            )}
          </Form>
        )}
        {activeTab === "requests" && authStore.isAuthenticated && (
          <>
            {userRequests.length > 0 ? (
              <TableWrapper>
                <Table>
                  <thead>
                    <tr>
                      <Th>Название</Th>
                      <Th>Статус</Th>
                      <Th>Ссылка</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {userRequests.map((r) => (
                      <tr key={r.id}>
                        <Td>{r.title}</Td>
                        <Td>{r.status}</Td>
                        <Td>
                          <a href={`/status/${r.id}`}>Смотреть</a>
                        </Td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </TableWrapper>
            ) : (
              <p>У вас ещё нет заявок</p>
            )}
          </>
        )}
      </PageWrapper>
    </AppLayout>
  );
});

export default UserPage;
