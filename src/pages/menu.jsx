import React, { useEffect, useState } from 'react'; // Added useEffect and useState for image loading
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../components/themeContext.jsx'; // Corrected path to utiles/themeContext.jsx

import backgroundImage from '../assets/images/background5.avif'; // <-- RE-IMPORTED THE BACKGROUND IMAGE

const MainMenuPage = () => {
    const navigate = useNavigate();
    // Destructure theme, though we don't directly use 'theme' for styling here,
    // its presence confirms we're connected to the global theme context.
    const { theme } = useTheme();

    // *** RE-ADDED: imageLoaded state and useEffect for background image loading ***
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = backgroundImage;
        img.onload = () => {
            setImageLoaded(true);
        };
        img.onerror = () => {
            console.error("Failed to load background image:", backgroundImage);
            setImageLoaded(true); // Still allow content to show even if image fails
        };
    }, []); // Runs once on mount

    const handleStartGame = () => {
        navigate('/user-profile');
    };

    const handleOptions = () => {
        navigate('/options');
    };

    const handleAboutUs = () => {
        navigate('/about');
    };

    return (
        // The outermost div now applies the custom background image via inline style
        // and controls its own fade-in based on image loading.
        <div
            className={`min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8
                        font-sans transition-all duration-700 ease-in-out
                        ${imageLoaded ? 'animate-fade-in' : 'opacity-0'} /* Controls fade-in after image loads */
                        text-[var(--page-text)]`} // Uses theme's page text color
            style={{ // <-- ADDED INLINE STYLE FOR BACKGROUND IMAGE
                backgroundImage: `url('${backgroundImage}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed', // Keeps background fixed during potential scrolling
            }}
        >
            {/* The central content panel. THIS SECTION'S CLASSES ARE UNCHANGED. */}
            <div className="text-center p-12 rounded-3xl shadow-2xl
                             bg-[var(--panel-bg)] bg-opacity-95 /* Slightly less transparent for better contrast */
                             transform scale-100 transition-all duration-300 hover:scale-[1.01] hover:shadow-3xl
                             border-2 border-[var(--panel-border)]"> {/* Keeps the themeable border */}

                {/* Header for the main menu. THIS SECTION'S CLASSES ARE UNCHANGED. */}
                <h1 className="text-5xl sm:text-6xl font-extrabold font-['Open_Sans'] text-center my-5 pb-3 border-b-4
                               text-[var(--color-primary)] border-[var(--color-secondary)]">
                    Welcome to Tic Tac Toe
                </h1>

                {/* Buttons, using theme's primary button colors. THIS SECTION'S CLASSES ARE UNCHANGED. */}
                <button
                    onClick={handleStartGame}
                    className="block w-64 py-4 mx-auto my-4 text-xl rounded-full cursor-pointer
                               transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none
                               bg-[var(--button-primary-bg)] text-[var(--button-primary-text)]
                               hover:bg-[var(--button-primary-hover-bg)] focus:ring-2 focus:ring-[var(--focus-ring-color)] focus:ring-offset-2 focus:ring-offset-[var(--focus-ring-offset)]"
                >
                    Start Game
                </button>
                <button
                    onClick={handleOptions}
                    className="block w-64 py-4 mx-auto my-4 text-xl rounded-full cursor-pointer
                               transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none
                               bg-[var(--button-primary-bg)] text-[var(--button-primary-text)]
                               hover:bg-[var(--button-primary-hover-bg)] focus:ring-2 focus:ring-[var(--focus-ring-color)] focus:ring-offset-2 focus:ring-offset-[var(--focus-ring-offset)]"
                >
                    Options
                </button>
                <button
                    onClick={handleAboutUs}
                    className="block w-64 py-4 mx-auto my-4 text-xl rounded-full cursor-pointer
                               transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none
                               bg-[var(--button-primary-bg)] text-[var(--button-primary-text)]
                               hover:bg-[var(--button-primary-hover-bg)] focus:ring-2 focus:ring-[var(--focus-ring-color)] focus:ring-offset-2 focus:ring-offset-[var(--focus-ring-offset)]"
                >
                    About Us
                </button>
            </div>
        </div>
    );
};

export default MainMenuPage;