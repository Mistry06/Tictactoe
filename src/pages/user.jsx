import React, { useEffect, useState } from 'react'; // Added useEffect and useState for image loading
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../components/themeContext.jsx'; // Corrected path to utiles/themeContext.jsx

// Re-importing background5.avif for the page's main background
import backgroundImage from '../assets/images/background5.avif'; 
// Keep imports for images specifically used WITHIN the component's elements
import backgroundImage2 from "../assets/images/pngtree-creative-vs-player-design-vector-and-png-png-image_2959254.png"; // Image for User vs User card
import backgroundImage3 from "../assets/images/computer2.jpg"; // Image for User vs Computer card

const UserProfilePage = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();

    // State to track if the main page background image has loaded
    const [pageImageLoaded, setPageImageLoaded] = useState(false);

    // Effect to pre-load the main page background image
    useEffect(() => {
        const img = new Image();
        img.src = backgroundImage;
        img.onload = () => {
            setPageImageLoaded(true);
        };
        img.onerror = () => {
            console.error("Failed to load page background image:", backgroundImage);
            setPageImageLoaded(true); // Still allow content to show even if image fails
        };
    }, []); // Runs once on mount

    const handleBackClick = () => {
        navigate('/main-menu');
    };

    const handleUserVsUserClick = () => {
        navigate('/game-play-duo');
    };

    const handleUserVsComputerClick = () => {
        navigate('/game-play-vs-computer');
    };

    return (
        // Outermost div: Now applies the specific background image for this page
        // and controls its own fade-in based on image loading.
        <div
            className={`min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8
                        font-sans transition-all duration-700 ease-in-out
                        ${pageImageLoaded ? 'animate-fade-in' : 'opacity-0'} /* Controls fade-in after image loads */
                        text-[var(--page-text)]`}
            style={{ // <-- Inline style to apply background5.avif to this page
                backgroundImage: `url('${backgroundImage}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
            }}
        >
            {/* Back button: Themed colors for background, text, hover, and focus (UNCHANGED from last version) */}
            <button
                onClick={handleBackClick}
                className="absolute top-4 left-4 md:top-8 md:left-8 px-5 py-2
                           rounded-lg shadow-md transition duration-300 z-10
                           bg-[var(--button-secondary-bg)] text-[var(--button-secondary-text)]
                           hover:bg-[var(--button-secondary-hover-bg)]
                           focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring-color)] focus:ring-opacity-75"
            >
                Back to Main Menu
            </button>

            <div className="text-center w-full max-w-7xl mx-auto p-4 md:p-8">
                <div className="mb-10 mt-20 md:mt-24">
                    {/* Main Title: Themed colors for text, border, and background overlay (UNCHANGED) */}
                    <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg text-center
                                   font-['Open_Sans'] p-4 border-b-4 animate-fade-in
                                   bg-[var(--panel-bg)] bg-opacity-30 rounded-lg inline-block px-8 py-4
                                   text-[var(--color-primary)] border-[var(--color-secondary)]">
                        Choose Your Gameplay
                    </h1>
                </div>

                {/* Main container for the cards (UNCHANGED) */}
                <div className="flex flex-wrap justify-center gap-16 md:gap-24 text-center max-w-5xl mx-auto items-stretch">

                    {/* User vs User Card (UNCHANGED, uses backgroundImage2) */}
                    <div
                        onClick={handleUserVsUserClick}
                        className="flex flex-col rounded-2xl shadow-xl animate-fade-in cursor-pointer
                                   transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl
                                   w-80 h-[28rem] sm:w-96 sm:h-[32rem] overflow-hidden group relative
                                   bg-[var(--panel-bg)] border-4 border-[var(--panel-border)] hover:border-[var(--color-secondary)]"
                    >
                        {/* Image section: uses backgroundImage2 */}
                        <div
                            className="relative w-full h-3/4 bg-cover bg-center rounded-t-xl"
                            style={{ backgroundImage: `url('${backgroundImage2}')` }}
                        >
                            <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-opacity duration-300"></div>
                        </div>

                        {/* Button section: themed background and text */}
                        <div
                            id="user-vs-user"
                            className="relative z-10 flex-shrink-0 w-full h-1/4 py-3 text-xl
                                       rounded-b-xl opacity-100 font-semibold shadow-md flex items-center justify-center
                                       tracking-normal normal-case transition-colors duration-300
                                       bg-[var(--button-primary-bg)] text-[var(--button-primary-text)]
                                       group-hover:bg-[var(--button-primary-hover-bg)]"
                        >
                            User vs User
                        </div>
                    </div>

                    {/* User vs Computer Card (UNCHANGED, uses backgroundImage3) */}
                    <div
                        onClick={handleUserVsComputerClick}
                        className="flex flex-col rounded-2xl shadow-xl animate-fade-in cursor-pointer
                                   transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl
                                   w-80 h-[28rem] sm:w-96 sm:h-[32rem] overflow-hidden group relative
                                   bg-[var(--panel-bg)] border-4 border-[var(--panel-border)] hover:border-[var(--color-secondary)]"
                    >
                        {/* Image section: uses backgroundImage3 */}
                        <div
                            className="relative w-full h-3/4 bg-cover bg-center rounded-t-xl"
                            style={{ backgroundImage: `url('${backgroundImage3}')` }}
                        >
                            <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-opacity duration-300"></div>
                        </div>

                        {/* Button section: themed background and text */}
                        <div
                            id="user-vs-computer"
                            className="relative z-10 flex-shrink-0 w-full h-1/4 py-3 text-xl
                                       rounded-b-xl opacity-100 font-semibold shadow-md flex items-center justify-center
                                       tracking-normal normal-case transition-colors duration-300
                                       bg-[var(--button-primary-bg)] text-[var(--button-primary-text)]
                                       group-hover:bg-[var(--button-primary-hover-bg)]"
                        >
                            User vs Computer
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;