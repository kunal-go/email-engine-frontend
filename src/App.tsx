import { MantineProvider, createTheme } from "@mantine/core";

const theme = createTheme({});

function App() {
  return (
    <MantineProvider theme={theme}>
      <h1>Email Engine Web</h1>
    </MantineProvider>
  );
}

export default App;
