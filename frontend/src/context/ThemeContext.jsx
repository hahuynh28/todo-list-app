import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

// Create a context to share the theme across the entire app
export function ThemeProvider({ children }) {
  // State theme
  // Get the value from localStorage if available, otherwise the default is "light"
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // Run whenever the theme changes
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      // If it's dark mode, add the class "dark"
      root.classList.add("dark");
    } else {
      // If it's light mode, delete the "dark" class.
      root.classList.remove("dark");
    }
    // Save the theme to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Theme switching function
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    // Provide theme and toggleTheme for all child components
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
