import { createContext, useState } from "react";
const ThemeContext = createContext(null);

function ThemeContextProvider(props: any) {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((prevState) => {
      return prevState === "light" ? "dark" : "light";
    });
  };
  return (
    <ThemeContext.Provider value={{ theme: theme, toggleTheme: toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export { ThemeContextProvider, ThemeContext };
