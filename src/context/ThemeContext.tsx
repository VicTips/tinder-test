import { createContext, useState } from "react";

const ThemeContext = createContext(null);

function ThemeContextProvider({ children }: any) {
  const [theme, setTheme] = useState(
    !localStorage.getItem("theme") ? "dark" : localStorage.getItem("theme")
  );

  const toggleTheme = () => {
    setTheme((prevState) => {
      return prevState === "light" ? "dark" : "light";
    });
  };

  localStorage.setItem("theme", theme);

  const values = {
    theme: theme,
    toggleTheme: toggleTheme,
  };

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
}

export { ThemeContextProvider, ThemeContext };
