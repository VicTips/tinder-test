import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import AnonymousRoute from "./components/routes/AnonymousRoute";
import UserInterface from "./components/UserInterface";
import Home from "./views/Home";
import History from "./views/History";
import PwdRecovery from "./views/PwdRecovery";
import { GlobalStyles } from "./components/styles/globalStyles";
import { ThemeProvider } from "styled-components";
import { light } from "./components/styles/themes/light";
import Auth from "./views/auth/Auth";
import { dark } from "./components/styles/themes/dark";
import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import { SportContextProvider } from "./context/SportsContextProvider";

const App = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <AuthContext>
      <SportContextProvider>
        <ThemeProvider theme={theme === "light" ? light : dark}>
          <GlobalStyles />
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <UserInterface />
                  </ProtectedRoute>
                }
              >
                <Route path="/home" element={<Home />} />
                <Route path="/history" element={<History />} />
              </Route>

              <Route
                path="/signup"
                element={
                  <AnonymousRoute>
                    <Auth variant="signup" />
                  </AnonymousRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <AnonymousRoute>
                    <Auth variant="login" />
                  </AnonymousRoute>
                }
              />
              <Route
                path="/reset"
                element={
                  <AnonymousRoute>
                    <PwdRecovery />
                  </AnonymousRoute>
                }
              />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </SportContextProvider>
    </AuthContext>
  );
};

export default App;
