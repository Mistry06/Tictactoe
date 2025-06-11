import React from 'react';
import { useNavigate } from 'react-router-dom';
import SomnathImage from '../assets/images/somnath.jpg'; // Correctly imported image

// --- FIX IS HERE: Corrected import path for useTheme ---
// Assuming themeContext.jsx is in src/utiles/
import { useTheme } from '../components/themeContext';

const About = () => {
  const navigate = useNavigate();
  // Use the theme from the global context
  const { theme } = useTheme();

  const handleBackClick = () => {
    navigate('/main-menu');
  };

  return (
    <div className="font-sans min-h-screen flex flex-col items-center
                    transition-colors duration-500 ease-in-out p-4 sm:p-6 lg:p-8
                    bg-[var(--page-bg)] text-[var(--page-text)]">

      <button
        onClick={handleBackClick}
        className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-8
                   px-4 py-2 rounded-lg shadow-md
                   bg-[var(--button-primary-bg)] text-[var(--button-primary-text)]
                   hover:bg-[var(--button-primary-hover-bg)]
                   focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring-color)] focus:ring-opacity-75
                   transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        ← Back
      </button>

      <header className="w-full max-w-4xl text-center mb-10 mt-20 sm:mt-24 lg:mt-28">
        <h1 className="text-5xl sm:text-6xl font-extrabold drop-shadow-md
                       text-[var(--header-text)]">
          About Our Project
        </h1>
        <p className="text-xl sm:text-2xl mt-4 text-[var(--page-text-muted)]">
          Crafting delightful digital experiences.
        </p>
      </header>

      <section className="w-full max-w-3xl rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 mb-8
                           transform transition-transform duration-300 hover:scale-[1.01] hover:shadow-2xl
                           bg-[var(--panel-bg)] text-[var(--panel-text)]">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-[var(--panel-text)]">
          Our Vision
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          At the heart of our Tic-Tac-Toe project lies a simple yet profound vision: to deliver an engaging, intuitive, and universally accessible web-based game. We believe that classic games, when reimagined with modern technology, can offer unparalleled joy and a seamless user experience.
        </p>
        <p className="text-lg leading-relaxed">
          This game is meticulously designed with a user-first approach. From vibrant sound effects that add to the thrill, to intelligent score tracking, and instant game feedback for wins and draws, every feature is crafted to enhance player interaction. Its responsive layout ensures a perfect fit on any device, while the flexible light/dark mode option caters to individual preferences. Dive into a captivating blend of tradition and innovation, perfect for casual fun or a friendly challenge.
        </p>
      </section>

      <section className="w-full max-w-3xl rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 mb-8
                           transform transition-transform duration-300 hover:scale-[1.01] hover:shadow-2xl
                           bg-[var(--panel-bg)] text-[var(--panel-text)]">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-[var(--panel-text)]">
          Meet the Developer
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-8">
          <img
            src={SomnathImage}
            alt="Somnath Kar - Developer"
            className="rounded-full w-40 h-40 sm:w-48 sm:h-48 object-cover border-4 border-[var(--panel-border)] shadow-lg mb-6 sm:mb-0"
          />
          <div className="text-center sm:text-left">
            <h3 className="text-3xl font-semibold text-[var(--panel-text)] mb-2">Somnath Kar</h3>
            <p className="text-xl text-[var(--page-text-muted)] mb-4">Lead Developer & Creator</p>

            <div className="flex justify-center sm:justify-start space-x-4">
              <a
                href="https://github.com/Mistry06"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white
                           bg-gray-700 hover:bg-gray-800 transition-colors duration-300 shadow-md"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/sommath-kar-39a8b2292"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white
                           bg-blue-600 hover:bg-blue-700 transition-colors duration-300 shadow-md"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full max-w-4xl text-center mt-10 p-4 rounded-lg shadow-lg
                         bg-[var(--header-bg)] text-[var(--header-text)]">
        <p className="text-lg">For any queries, feel free to reach out:</p>
        <a href="mailto:somnathkar612005@gmail.com"
           className="hover:underline text-lg font-medium mt-2 block">
          somnathkar612005@gmail.com
        </a>
      </footer>
    </div>
  );
};

export default About;