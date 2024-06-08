import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import styled from "styled-components";

const ToggleBtn = styled.button`
  cursor: pointer;
  font-size: 26px;
  line-height: 38.49px;
  background-color: ${(props) => props.theme.colors.togglebtn};
  border: none;
  width: 62px;
  height: 63px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 18px;
`;

function Home() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <>
      <ToggleBtn onClick={toggleTheme}>
        {theme === "light" ? "🌙" : "🌤️"}
      </ToggleBtn>
      <h1>Home</h1>
    </>
  );
}
export default Home;
