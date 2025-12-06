import { createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext();

const THEME_KEY = "cineprism_theme";

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    return savedTheme || "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (theme === "light") {
      root.classList.remove("dark");
      root.classList.add("light");
      body.classList.remove("dark-mode");
      body.classList.add("light-mode");
    } else {
      root.classList.remove("light");
      root.classList.add("dark");
      body.classList.remove("light-mode");
      body.classList.add("dark-mode");
    }
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
