import { Button, Container, Text, Title } from "@mantine/core";
import { AccountListView } from "./AccountListView";
import { useNavigate } from "react-location";

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <Container className="mt-10">
      <div className="flex flex-col gap-4 max-w-lg mx-auto">
        <div>
          <Title>Email Accounts</Title>
          <Text className="text-gray-600">
            Manage all your linked email accounts
          </Text>
          <div className="mt-2 flex flex-row justify-between">
            <Button>Add Email Account</Button>
            <Button
              variant="light"
              color="red"
              onClick={() => navigate({ to: "/logout" })}
            >
              Logout
            </Button>
          </div>
        </div>
        <AccountListView />
      </div>
    </Container>
  );
};
