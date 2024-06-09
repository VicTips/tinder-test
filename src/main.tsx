import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";
import { ThemeContextProvider } from "./context/ThemeContext.tsx";
import { SportContextProvider } from "./context/SportsContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeContextProvider>
      <SportContextProvider>
        <App />
      </SportContextProvider>
    </ThemeContextProvider>
  </Provider>
);
