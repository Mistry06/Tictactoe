// src/components/Navbar.jsx

import React, { useState, useCallback } from 'react';

// Import image assets from src/assets/icons/
import dropdownIcon from '../assets/icons/dropdow5.webp'; 
import volumeOnIcon from '../assets/icons/volume2.webp'; 
import themeIcon from '../assets/icons/theme2.png'; 
import volumeOffIcon from '../assets/icons/volumeoff.png'; 


const Navbar = ({
    isMuted,
    toggleVolume,
    toggleTheme,
    onNewGame,
    onDuoMode,
    onSoloMode,
    onHowToPlay,
    onStartMenu,
    onHelp,
    isDuoModePage,
    currentTheme 
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleDropdownClick = useCallback((actionCallback) => {
        return (e) => {
            e.preventDefault();
            actionCallback();
            setIsDropdownOpen(false);
        };
    }, []);

    // >>> IMPORTANT ICON FILTERING LOGIC <<<
    // This assumes your ORIGINAL ICONS (like dropdow5.webp) are DARK (e.g., black) on a transparent background.
    // If they are dark, 'filter invert' will make them light for the dark theme.
    // If your ORIGINAL ICONS are LIGHT (e.g., white), then CHANGE THIS LINE to:
    // const iconFilterClass = currentTheme === 'light' ? 'filter invert' : 'filter-none';
    const iconFilterClass = currentTheme === 'dark' ? 'filter invert' : 'filter-none';

    return (
        <nav className="flex items-center justify-between h-16 w-full px-4 md:px-8 relative z-20
                        bg-[var(--navbar-bg)] border-b border-[var(--navbar-border)]
                        transition-colors duration-300">

            {/* Left side: Dropdown Menu */}
            <div className="relative">
                <button
                    className="flex items-center justify-center w-10 h-10 rounded-full
                               bg-[var(--button-secondary-bg)]
                               text-[var(--button-secondary-text)] // The 'text' variable influences the icon color if it's an SVG or via filter
                               border border-[var(--button-border)]
                               shadow-md
                               transition-all duration-200 ease-in-out
                               hover:bg-[var(--button-secondary-hover-bg)] hover:shadow-lg
                               focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring-color)] focus:ring-offset-2 focus:ring-offset-[var(--focus-ring-offset)]"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    aria-label="Toggle Menu"
                >
                    <img src={dropdownIcon} alt="Menu" className={`h-6 w-6 object-contain ${iconFilterClass}`} />
                </button>
                {isDropdownOpen && (
                    <div className="absolute top-full left-0 mt-3
                                     bg-[var(--dropdown-bg)]
                                     min-w-[240px] shadow-2xl z-50 rounded-lg py-2
                                     overflow-hidden border border-[var(--dropdown-border)]
                                     origin-top-left animate-fade-in-scale">
                        
                        <a href="#" className="block px-6 py-2.5 text-[var(--dropdown-text)] no-underline text-base font-medium
                                              hover:bg-[var(--dropdown-hover-bg)]
                                              hover:border-l-4 hover:border-[var(--color-primary)]
                                              transition-all duration-150 ease-in-out"
                            onClick={handleDropdownClick(onNewGame)}>New Game</a>

                        {isDuoModePage ? (
                            <a href="#" className="block px-6 py-2.5 text-[var(--dropdown-text)] no-underline text-base font-medium
                                                  hover:bg-[var(--dropdown-hover-bg)]
                                                  hover:border-l-4 hover:border-[var(--color-primary)]
                                                  transition-all duration-150 ease-in-out"
                               onClick={handleDropdownClick(onSoloMode)}>Solo Mode</a>
                        ) : (
                            <a href="#" className="block px-6 py-2.5 text-[var(--dropdown-text)] no-underline text-base font-medium
                                                  hover:bg-[var(--dropdown-hover-bg)]
                                                  hover:border-l-4 hover:border-[var(--color-primary)]
                                                  transition-all duration-150 ease-in-out"
                               onClick={handleDropdownClick(onDuoMode)}>Duo Mode</a>
                        )}

                        <a href="#" className="block px-6 py-2.5 text-[var(--dropdown-text)] no-underline text-base font-medium
                                              hover:bg-[var(--dropdown-hover-bg)]
                                              hover:border-l-4 hover:border-[var(--color-primary)]
                                              transition-all duration-150 ease-in-out"
                            onClick={handleDropdownClick(onHowToPlay)}>How To Play</a>
                        
                        <a href="#" className="block px-6 py-2.5 text-[var(--dropdown-text)] no-underline text-base font-medium
                                              hover:bg-[var(--dropdown-hover-bg)]
                                              hover:border-l-4 hover:border-[var(--color-primary)]
                                              transition-all duration-150 ease-in-out"
                            onClick={handleDropdownClick(onStartMenu)}>Start Menu</a>
                        
                        <a href="#" className="block px-6 py-2.5 text-[var(--dropdown-text)] no-underline text-base font-medium
                                              hover:bg-[var(--dropdown-hover-bg)]
                                              hover:border-l-4 hover:border-[var(--color-primary)]
                                              transition-all duration-150 ease-in-out"
                            onClick={handleDropdownClick(onHelp)}>Help</a>
                        
                        <hr className="my-2 border-[var(--dropdown-border-strong)]" />
                        
                        <a href="#" className="block px-6 py-2.5 text-[var(--color-danger)] no-underline text-base font-medium
                                              hover:bg-[var(--color-danger)]/10
                                              hover:border-l-4 hover:border-[var(--color-danger)]
                                              transition-all duration-150 ease-in-out"
                            onClick={(e) => { e.preventDefault(); setIsDropdownOpen(false); }}>Close Menu</a>
                    </div>
                )}
            </div>

            {/* Right side: Theme and Volume Toggles */}
            <div className="flex items-center gap-3 md:gap-4">
                {/* Theme Toggle Button */}
                <button
                    className="flex items-center justify-center w-10 h-10 rounded-full
                               bg-[var(--button-secondary-bg)]
                               text-[var(--button-secondary-text)]
                               border border-[var(--button-border)]
                               shadow-md
                               transition-all duration-200 ease-in-out
                               hover:bg-[var(--button-secondary-hover-bg)] hover:shadow-lg
                               focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring-color)] focus:ring-offset-2 focus:ring-offset-[var(--focus-ring-offset)]"
                    onClick={toggleTheme}
                    aria-label="Toggle Theme"
                >
                    <img src={themeIcon} alt="Theme" className={`h-6 w-6 object-contain ${iconFilterClass}`} />
                </button>

                {/* Volume Toggle Button */}
                <button
                    className="flex items-center justify-center w-10 h-10 rounded-full
                               bg-[var(--button-secondary-bg)]
                               text-[var(--button-secondary-text)]
                               border border-[var(--button-border)]
                               shadow-md
                               transition-all duration-200 ease-in-out
                               hover:bg-[var(--button-secondary-hover-bg)] hover:shadow-lg
                               focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring-color)] focus:ring-offset-2 focus:ring-offset-[var(--focus-ring-offset)]"
                    onClick={toggleVolume}
                    aria-label={isMuted ? "Unmute Volume" : "Mute Volume"}
                >
                    <img src={isMuted ? volumeOffIcon : volumeOnIcon} alt={isMuted ? "Volume Off" : "Volume On"} className={`h-6 w-6 object-contain ${iconFilterClass}`} />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;