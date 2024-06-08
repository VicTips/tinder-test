import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Home() {
  const { toggleTheme } = useContext(ThemeContext);
  return (
    <>
      <button onClick={toggleTheme}>Switch Theme</button>
      <h1>Home</h1>
    </>
  );
}
export default Home;
