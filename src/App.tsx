import { MantineProvider, createTheme } from "@mantine/core";
import { AppRouter } from "./AppRouter";
import { Notifications } from "@mantine/notifications";

const theme = createTheme({});

function App() {
  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <AppRouter />
    </MantineProvider>
  );
}

export default App;
