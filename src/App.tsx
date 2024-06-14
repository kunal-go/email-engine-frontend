import { MantineProvider, createTheme } from "@mantine/core";
import { AppRouter } from "./AppRouter";

const theme = createTheme({});

function App() {
  return (
    <MantineProvider theme={theme}>
      <AppRouter />
    </MantineProvider>
  );
}

export default App;
