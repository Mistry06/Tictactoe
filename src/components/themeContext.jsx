import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// 1. Create the ThemeContext
// This will hold the theme state and the function to update it.
const ThemeContext = createContext();

// 2. Custom hook to easily use the theme context
// This makes it cleaner to consume the context in your components.
export const useTheme = () => useContext(ThemeContext);

// 3. ThemeProvider Component
// This component will wrap your entire application, managing the theme state
// and applying the appropriate class to the <html> element.
export const ThemeProvider = ({ children }) => {
    // State to store the current theme.
    // It tries to load the theme from localStorage first,
    // otherwise, it defaults to 'light'.
    const [theme, setTheme] = useState(() => {
        // Ensure this runs only in a browser environment
        if (typeof window !== 'undefined') {
            return localStorage.getItem('gameOptionsTheme') || 'light';
        }
        return 'light'; // Default for server-side rendering (SSR) if applicable
    });

    // useCallback memoizes the applyTheme function.
    // This prevents it from being recreated on every render,
    // which can be useful for performance optimization and dependency arrays in useEffect.
    const applyTheme = useCallback((newTheme) => {
        if (typeof document !== 'undefined') {
            // Remove all possible theme classes from the <html> element
            // to ensure only the currently selected theme is active.
            document.documentElement.classList.remove('light', 'dark', 'colorful-rgb');

            // Add the new theme class if a theme is selected.
            if (newTheme) {
                document.documentElement.classList.add(newTheme);
            }

            // Save the selected theme to localStorage so it persists across sessions.
            localStorage.setItem('gameOptionsTheme', newTheme);
        }
    }, []); // Empty dependency array means this function is created once

    // useEffect hook to apply the theme.
    // This runs once when the ThemeProvider mounts (initial load)
    // and whenever the 'theme' state or 'applyTheme' function changes.
    // 'applyTheme' is included as a dependency because it's a callback,
    // though in this specific case, it doesn't change.
    useEffect(() => {
        applyTheme(theme);
    }, [theme, applyTheme]);

    // The value provided by the context to any consuming components.
    // It includes the current `theme` and the `setTheme` function to change it.
    const contextValue = {
        theme, // The current theme string ('light', 'dark', 'colorful-rgb')
        // The function components will call to change the theme.
        // It updates the internal state and also immediately applies the theme to the DOM.
        setTheme: (newTheme) => {
            setTheme(newTheme);       // Update React state
            applyTheme(newTheme);      // Immediately apply to HTML element
        },
    };

    return (
        // ThemeContext.Provider makes the `contextValue` available
        // to all components nested within it.
        <ThemeContext.Provider value={contextValue}>
            {children} {/* Renders all the child components */}
        </ThemeContext.Provider>
    );
};