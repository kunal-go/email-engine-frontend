import { MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppRouter } from "./AppRouter";

const theme = createTheme({});

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <Notifications />
        <AppRouter />
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
