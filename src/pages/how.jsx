import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// --- INTEGRATION START: Import the useTheme hook ---
// IMPORTANT: Adjusted path. This assumes ThemeContext.jsx is two levels up from this file (e.g., from src/pages/ to src/).
import { useTheme } from '../components/themeContext';
// --- INTEGRATION END ---

const HowToPlay = () => {
    const navigate = useNavigate();

    // --- INTEGRATION START: Use the global theme context ---
    // Access the current theme from the global ThemeProvider.
    const { theme } = useTheme();
    // --- INTEGRATION END ---

    // --- REMOVED: Local Theme Effect ---
    // The previous useEffect block that manually applied CSS variables to document.documentElement
    // has been removed. The global ThemeProvider (from `ThemeContext.jsx`) now manages
    // the application of theme classes ('light', 'dark', 'colorful-rgb') to the `<html>` element.
    // Your global CSS (e.g., in `index.css` or Tailwind config) should define
    // the `--var` properties (like `--page-bg-start`, `--panel-bg`) based on these classes.
    // This ensures consistent theming across your entire application.
    // --- END REMOVED ---

    const handleBackClick = useCallback(() => {
        navigate('/main-menu');
    }, [navigate]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8
                         font-sans transition-all duration-700 ease-in-out animate-fade-in
                         bg-[var(--page-bg-start)] text-[var(--page-text)]">

            {/* Back Button - Positioned absolutely at the top-left */}
            <button
                onClick={handleBackClick}
                className="absolute top-4 left-4 px-6 py-2 rounded-full cursor-pointer z-20
                           bg-[var(--button-secondary-bg)] text-[var(--button-secondary-text)]
                           hover:bg-[var(--button-secondary-hover-bg)] transition duration-200
                           shadow-md hover:shadow-lg font-semibold"
            >
                &larr; Back
            </button>

            {/* Main Content Container - Elevated card-like structure */}
            <div className="w-full max-w-4xl mx-auto my-12 p-8 sm:p-10 lg:p-12
                            bg-[var(--panel-bg)] rounded-3xl shadow-2xl
                            transform transition-all duration-500 hover:scale-[1.01] hover:shadow-3xl
                            flex flex-col items-center text-center">

                {/* Header - Matches GameOptions for consistency */}
                <header className="w-full py-8 text-center mb-12 rounded-3xl shadow-xl
                                     bg-[var(--header-bg)] text-[var(--header-text)]
                                     transform skew-y-1 -rotate-1 perspective-1000
                                     transition-all duration-500 ease-in-out">
                    <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight
                                     drop-shadow-[3px_3px_5px_rgba(0,0,0,0.5)]
                                     transform -skew-y-1 rotate-1">
                        How to Play
                    </h1>
                </header>

                {/* Main Instructions Area - Structured for readability */}
                <div className="w-full text-left space-y-8 lg:space-y-10">
                    {/* Game Overview Section */}
                    <section className="bg-[var(--button-secondary-bg)] bg-opacity-30 p-6 rounded-xl shadow-inner">
                        <h2 className="text-3xl font-bold mb-4 text-[var(--button-primary-bg)]">Game Overview</h2>
                        <p className="leading-relaxed text-[var(--panel-text)] text-lg">
                            Tic-Tac-Toe is a classic two-player game played on a **3x3 grid**. Players take turns marking a space with their symbol, either an "X" or an "O". The goal is simple: be the first to get **three of your marks in a row** – horizontally, vertically, or diagonally.
                        </p>
                    </section>

                    {/* Rules & Winning Condition - Potentially side-by-side on larger screens */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                        <section className="bg-[var(--button-secondary-bg)] bg-opacity-30 p-6 rounded-xl shadow-inner">
                            <h3 className="text-2xl font-bold mb-4 text-[var(--button-primary-bg)]">Rules:</h3>
                            <ul className="list-disc ml-6 space-y-3 leading-relaxed text-[var(--panel-text)] text-lg">
                                <li>The game is played on a grid of 9 empty spaces.</li>
                                <li>**Player 1** uses "X" and **Player 2** uses "O".</li>
                                <li>Players alternate turns, placing one mark per turn in an empty space.</li>
                                <li>The game ends when a player achieves a winning line or all spaces are filled.</li>
                                <li>If all spaces are filled and no one has won, it's a **draw**!</li>
                            </ul>
                        </section>

                        <section className="bg-[var(--button-secondary-bg)] bg-opacity-30 p-6 rounded-xl shadow-inner">
                            <h3 className="text-2xl font-bold mb-4 text-[var(--button-primary-bg)]">Winning Condition:</h3>
                            <p className="leading-relaxed text-[var(--panel-text)] text-lg">
                                Victory is achieved by getting **three of your symbols in a continuous line**. This line can be:
                            </p>
                            <ul className="list-disc ml-6 space-y-3 leading-relaxed text-[var(--panel-text)] text-lg mt-4">
                                <li>**Horizontal:** Across any of the three rows.</li>
                                <li>**Vertical:** Down any of the three columns.</li>
                                <li>**Diagonal:** Across either of the two main diagonals.</li>
                                </ul>
                        </section>
                    </div>
                </div>

                {/* Footer - Consistent with other pages */}
                <footer className="w-full text-center p-6 rounded-xl mt-12 shadow-xl
                                     bg-[var(--header-bg)] text-[var(--header-text)]">
                    <p className="text-xl font-bold">Good Luck and Have Fun!</p>
                </footer>
            </div>
        </div>
    );
};

export default HowToPlay;
