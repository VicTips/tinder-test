import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/AuthContext";

function AnonymousRoute({ children }: any) {
  const { user }: any = useContext(Context);

  if (user) {
    return <Navigate to="/home" replace />;
  } else {
    return children;
  }
}

export default AnonymousRoute;
