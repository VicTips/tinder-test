import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeContextProvider } from "./context/ThemeContext.tsx";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeContextProvider>
    <Container>
      <App />
    </Container>
  </ThemeContextProvider>
);
