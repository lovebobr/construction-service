import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { authStore } from "../app/store/auth.store";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  uploadFile,
  createRequest,
  getObjects,
  getRequestsByUserId,
} from "../api/requestsApi";
import {
  PageWrapper,
  Form,
  Input,
  TextArea,
  Select,
  Button,
  LinkContainer,
  Inputs,
} from "./UserPage.styles";
import { Tab, Tabs } from "./Tabs.styles";
import AppLayout from "../app/components/AppLayout";
import {
  PageButton,
  PageInfo,
  PaginationWrapper,
  StatusBadge,
  Td,
  Th,
  Table,
} from "./RequestTab.styles";
import { Link } from "react-router-dom";
const REQUESTS_PER_PAGE = 5;
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
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(
    1,
    Math.ceil(userRequests.length / REQUESTS_PER_PAGE)
  );

  useEffect(() => {
    getObjects().then(setObjects);

    if (authStore.isAuthenticated && authStore.user?.id) {
      getRequestsByUserId(authStore.user.id).then(setUserRequests);
    }
  }, [authStore.isAuthenticated, authStore.user?.id]);

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
      setUserRequests((prev) => [newRequest, ...prev]);
      setStatusLink(`/status/${newRequest.id}`);
      setTitle("");
      setDescription("");
      setObjectId("");
      setEmail("");
      setStatusLink("");
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const displayedRequests = userRequests.slice(
    (currentPage - 1) * REQUESTS_PER_PAGE,
    currentPage * REQUESTS_PER_PAGE
  );

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
              ref={fileInputRef}
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
            {displayedRequests.length > 0 ? (
              <div>
                <Table>
                  <thead>
                    <tr>
                      <Th>Название</Th>
                      <Th>Статус</Th>
                      <Th>Ссылка</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedRequests.map((r) => (
                      <tr key={r.id}>
                        <Td>{r.title}</Td>
                        <Td>
                          <StatusBadge $status={r.status}>
                            {r.status}
                          </StatusBadge>
                        </Td>
                        <Td>
                          <Link to={`/status/${r.id}`}>Смотреть</Link>
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
                    {currentPage} из {totalPages}
                  </PageInfo>
                  <PageButton
                    disabled={currentPage >= totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                  >
                    <ArrowRight size={18} />
                  </PageButton>
                </PaginationWrapper>
              </div>
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
