import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./components/auth/Auth";
import { AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import AnonymousRoute from "./components/routes/AnonymousRoute";
import UserInterface from "./components/UserInterface";

function App() {
  return (
    <AuthContext>
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
            <Route path="/home" element={<h1>Home</h1>} />
            <Route path="/history" element={<h1>History</h1>} />
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
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthContext>
  );
}

export default App;
