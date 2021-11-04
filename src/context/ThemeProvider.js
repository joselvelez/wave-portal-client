import { useLayoutEffect, useState } from "react";
import ThemeContext from "./ThemeContext";

export const ThemeProvider = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState(false);

    useLayoutEffect(() => {
        if (currentTheme === JSON.parse(window.localStorage.getItem('theme'))) {
            document.body.setAttribute('theme', currentTheme);
        } else {
            setCurrentTheme(JSON.parse(window.localStorage.getItem('theme')));
            document.body.setAttribute('theme', window.localStorage.getItem('theme'));
        }
    }, [currentTheme]);

    function setTheme(_newTheme) {
        window.localStorage.setItem('theme', _newTheme)
        setCurrentTheme('bad');
    }

    const value = {setTheme, currentTheme};

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}