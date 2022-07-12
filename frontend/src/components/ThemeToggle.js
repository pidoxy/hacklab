import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";

const Toggle = () => {
  const { theme, setTheme } = React.useContext(ThemeContext);

  return (
    <div className="transition duration-500 ease-in-out rounded-full p-2">
      <button
        id="theme-toggle"
        type="button"
        className="text-gray-500 dark:text-gray-400 bg-slate-200 dark:bg-slate-600 rounded-lg text-sm p-1.5"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? (
         <FaSun
                   onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                   className="dark:text-slate-400 text-2xl cursor-pointer"
                 />
        ) : (
                <FaMoon
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="text-slate-600 text-2xl cursor-pointer"
                /> 
                
        )}
      </button>
     </div>
  );
};

export default Toggle;