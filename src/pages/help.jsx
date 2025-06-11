import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// --- INTEGRATION START: Import the useTheme hook ---
// IMPORTANT: Adjust the path below if your ThemeProvider is in a different location.
// Corrected path: Assuming ThemeContext.jsx is in a 'context' folder one level up.
import { useTheme } from '../components/themeContext'; 
// --- INTEGRATION END ---

const Help = () => {
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
                         bg-[var(--page-bg-start)] text-[var(--page-text)] relative"> {/* Added relative for button positioning */}

            {/* Back Button - Always visible, top-left */}
            <button
                onClick={handleBackClick}
                className="absolute top-4 left-4 px-6 py-2 rounded-full cursor-pointer z-20
                           bg-[var(--button-secondary-bg)] text-[var(--button-secondary-text)]
                           hover:bg-[var(--button-secondary-hover-bg)] transition duration-200
                           shadow-md hover:shadow-lg font-semibold"
            >
                &larr; Back
            </button>

            {/* Main Content Area - Wider and more open */}
            <div className="w-full max-w-5xl mx-auto my-12 /* Wider max-width */
                            flex flex-col items-center">

                {/* Main Heading - Central and prominent, slightly different from options page */}
                <h1 className="text-5xl sm:text-6xl font-extrabold text-center mb-12 drop-shadow-md
                               text-[var(--header-text)] /* Header text color from variable */
                               transition-colors duration-500">
                    Need Help?
                </h1>

                {/* Introduction/Welcome Section */}
                <section className="bg-[var(--panel-bg)] p-8 sm:p-10 rounded-3xl shadow-xl w-full text-center mb-12
                                     text-[var(--panel-text)] leading-relaxed">
                    <p className="text-xl sm:text-2xl font-medium mb-4">
                        Welcome to the Help Center! Find answers to common questions and understand the game's features better.
                    </p>
                    <p className="text-lg">
                        If you have further questions, feel free to explore our game or reach out through social media (links coming soon!).
                    </p>
                </section>

                {/* Grid of Feature Panels */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                    {[
                        {
                            title: '1. Click-to-Play',
                            description: 'The game board is a 3x3 grid. Click empty squares to place your mark ("X" or "O"). Your move updates instantly, and turns are tracked automatically.'
                        },
                        {
                            title: '2. Automatic Turn Switching',
                            description: 'After each valid move, the game seamlessly switches to the next player. "X" switches to "O", and vice versa, keeping the game flow smooth.'
                        },
                        {
                            title: '3. Win Detection',
                            description: 'The game continuously checks for a winner. Achieve three of your marks in a horizontal, vertical, or diagonal line to win. If all squares are filled without a winner, it\'s a draw.'
                        },
                        {
                            title: '4. Game Reset',
                            description: 'To start a new game, simply click the "Restart" button. This clears the board and resets any scores, allowing you to begin fresh.'
                        },
                        {
                            title: '5. End Game Alerts',
                            description: 'When a winner is determined or a draw occurs, a clear alert will pop up. This ensures you\'re always informed of the game\'s outcome immediately.'
                        },
                        {
                            title: '6. Sound Effects',
                            description: 'Engage your senses with interactive sound effects! Hear satisfying sounds when you make a move or when the game concludes, enhancing your play experience.'
                        },
                    ].map((feature, index) => (
                        <div key={index} className="bg-[var(--panel-bg)] p-6 rounded-2xl shadow-lg /* Consistent panel styling */
                                                     text-[var(--panel-text)] transform transition-all duration-300
                                                     hover:scale-[1.03] hover:shadow-xl hover:ring-2 hover:ring-[var(--button-primary-bg)] hover:ring-opacity-50">
                            <h3 className="text-2xl font-bold mb-3 text-[var(--button-primary-bg)]">{feature.title}</h3>
                            <p className="leading-relaxed text-lg">{feature.description}</p>
                        </div>
                    ))}
                </div> {/* End Feature Panels Grid */}

                {/* Call to Action / Footer */}
                <footer className="w-full text-center p-8 rounded-3xl mt-12 shadow-xl
                                     bg-[var(--header-bg)] text-[var(--header-text)]">
                    <p className="text-2xl font-semibold mb-2">Still stuck?</p>
                    <p className="text-lg">Don't worry, just play and have fun! You'll get the hang of it.</p>
                </footer>
            </div> {/* End Main Content Area */}
        </div>
    );
};

export default Help;
