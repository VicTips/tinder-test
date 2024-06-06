import Auth from "./components/auth/Auth";
import { useAppSelector } from "./store/hooks";

function App() {
  const userId = useAppSelector((state) => state.user.id);
  return <>{userId ? <h1>User Id: {userId}</h1> : <Auth variant="login" />}</>;
}

export default App;
