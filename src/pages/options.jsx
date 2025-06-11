// src/pages/options.jsx (or src/components/GameOptions.jsx, depending on your actual path)

import React, { useState } from 'react'; // useEffect is no longer needed here for theme management
import { useNavigate } from 'react-router-dom';

// Import the useTheme hook from your global ThemeContext
import { useTheme } from '../components/themeContext'; // Make sure this path is correct: ../utiles/themeContext.jsx

// The global index.css is now imported in App.jsx, so you don't need it here.
// import '../index.css';

const GameOptions = () => {
    const navigate = useNavigate();
    // Use the useTheme hook to get the current theme and the function to set it.
    // This is now the ONLY place in this component where theme state is managed.
    const { theme: selectedTheme, setTheme: setSelectedTheme } = useTheme();

    const [showThemeOptions, setShowThemeOptions] = useState(false);

    

    const handleHowToPlayClick = () => {
        navigate('/how-to-play');
    };

    const handleHelpClick = () => {
        navigate('/help');
    };

    const handleCancelClick = () => {
        navigate('/main-menu');
    };

    const toggleThemeOptions = () => {
        setShowThemeOptions(!showThemeOptions);
    };

    const handleThemeChange = (event) => {
        // Calling setSelectedTheme (which comes from useTheme) updates the theme
        // in the global context, which in turn updates the <html> class and localStorage.
        setSelectedTheme(event.target.value);
        setShowThemeOptions(false); // Close modal after selection
    };

    return (
        // The main container now relies solely on CSS variables for background and text,
        // which adjust automatically based on the theme class applied to the <html> element
        // by the global ThemeProvider.
        <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8
                        font-sans transition-all duration-700 ease-in-out animate-fade-in
                        text-[var(--page-text)]"> {/* Only text color set here; background handled by body/html */}

            {/* Header - A more refined, interactive gaming title */}
            <header className="w-full max-w-4xl py-8 text-center mb-12 rounded-3xl shadow-xl
                               bg-[var(--header-bg)] text-[var(--header-text)]
                               transform rotate-1
                               transition-all duration-500 ease-in-out
                               hover:scale-[1.01] hover:rotate-2 hover:shadow-2xl"> {/* Subtle rotate/scale on hover */}
                <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight
                               drop-shadow-[3px_3px_5px_rgba(0,0,0,0.4)] {/* Enhanced shadow for depth */}
                               text-[var(--header-text)] {/* Ensure text color is from theme */}
                               transform -rotate-1
                               transition-all duration-300 ease-in-out
                               hover:scale-105"> {/* Text also has a subtle hover effect */}
                    Game Options
                </h1>
            </header>

            {/* Main Content Area - Card-like container for options */}
            <div className="w-full max-w-md bg-[var(--panel-bg)] rounded-3xl shadow-2xl p-8 sm:p-10
                            transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl
                            flex flex-col items-center border-[var(--panel-border)] border-2"> {/* Added themeable border */}

                <nav className="w-full text-center space-y-6">
                    {[
                        { label: 'How To Play', onClick: handleHowToPlayClick },
                        { label: 'Help', onClick: handleHelpClick },
                        { label: 'Theme', onClick: toggleThemeOptions },
                    ].map((item, index) => (
                        <button
                            key={index}
                            onClick={item.onClick}
                            className="w-full py-4 px-8 rounded-full text-xl font-bold shadow-lg
                                       bg-[var(--button-primary-bg)] text-[var(--button-primary-text)]
                                       hover:bg-[var(--button-primary-hover-bg)]
                                       transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
                                       focus:outline-none focus:ring-4 focus:ring-[var(--focus-ring-color)] focus:ring-offset-2 focus:ring-offset-[var(--focus-ring-offset)]"
                        >
                            {item.label}
                        </button>
                    ))}

                    {/* Cancel Button - Uses theme-defined danger colors */}
                    <button
                        onClick={handleCancelClick}
                        className="w-full py-4 px-8 rounded-full text-xl font-bold shadow-lg
                                   bg-[var(--button-danger-bg)] text-[var(--button-danger-text)]
                                   hover:bg-[var(--button-danger-hover-bg)]
                                   transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
                                   focus:outline-none focus:ring-4 focus:ring-[var(--button-danger-bg)] focus:ring-opacity-50"
                    >
                        Cancel
                    </button>
                </nav>
            </div>

            {/* Theme selection modal - Overhauled design */}
            {showThemeOptions && (
                <>
                    {/* Darkened, blurred overlay */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40 animate-fade-in"
                        onClick={toggleThemeOptions} // Dismiss modal on overlay click
                    ></div>

                    {/* Modal Panel */}
                    <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 w-80 sm:w-96
                                     bg-[var(--modal-bg)] rounded-3xl shadow-2xl text-center z-50
                                     animate-fade-in-up transform transition-all duration-300 ease-out border-2 border-[var(--panel-border)]`}
                         style={{ animationDuration: '0.3s' }}
                    >
                        <h2 className="mb-8 text-3xl font-extrabold text-[var(--modal-text)]">
                            Customize Theme
                        </h2>
                        <div className="space-y-6">
                            {/* Theme names to match CSS class names and display text */}
                            {['light', 'dark', 'colorful-rgb'].map((themeName) => (
                                <label
                                    key={themeName}
                                    className={`group flex items-center justify-center p-3 rounded-full cursor-pointer
                                                transition-all duration-300 ease-in-out border border-[var(--dropdown-border)]
                                                hover:bg-[var(--button-secondary-hover-bg)] hover:shadow-md
                                                ${selectedTheme === themeName ? 'bg-[var(--button-secondary-bg)] shadow-inner border-[var(--button-primary-bg)] scale-[1.02]' : ''}`}
                                >
                                    <input
                                        type="radio"
                                        name="theme"
                                        value={themeName}
                                        checked={selectedTheme === themeName}
                                        onChange={handleThemeChange}
                                        className="h-6 w-6 mr-4 appearance-none rounded-full border-2 border-[var(--radio-accent)]
                                                   bg-white checked:bg-[var(--radio-accent)] checked:border-[var(--radio-accent)]
                                                   focus:outline-none focus:ring-3 focus:ring-[var(--focus-ring-color)] focus:ring-offset-1 focus:ring-offset-[var(--focus-ring-offset)]
                                                   transition-all duration-200"
                                    />
                                    <span className="text-xl font-semibold capitalize text-[var(--modal-text)]">
                                        {/* Display user-friendly name */}
                                        {themeName === 'colorful-rgb' ? 'Colorful RGB' : themeName}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default GameOptions;