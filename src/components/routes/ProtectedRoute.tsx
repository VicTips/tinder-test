import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/AuthContext";

const ProtectedRoute = ({ children }: any) => {
  const { user }: any = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
