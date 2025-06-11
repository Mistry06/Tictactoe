// src/App.jsx

import React from 'react';
// Removed BrowserRouter from this import
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from "./components/themeContext.jsx"; // Corrected path to utiles

// Import all your pages
import GameMainMenu from './pages/menu.jsx';
import TicTacToeVSPage from './pages/TicTacToeVSPage.jsx';
import TicTacToeGame from './pages/TicTacToeGame.jsx';
import About from './pages/about.jsx';
import Help from './pages/help.jsx';
import HowToPlay from './pages/how.jsx';
import GameOptions from './pages/options.jsx';
import UserSelection from './pages/user.jsx'; // Renamed UserProfilePage to UserSelection based on your provided App.jsx

import './index.css';

function App() {
  return (
    // Wrap your entire application with the ThemeProvider.
    // This makes the theme context available to all components rendered within Routes.
    <ThemeProvider>
      {/* Removed <Router> wrapper here. It should exist only once in your app, usually in main.jsx */}
      <AnimatedRoutes /> {/* Use the new AnimatedRoutes component */}
    </ThemeProvider>
  );
}

// New component to handle animated routes
function AnimatedRoutes() {
  const location = useLocation();

  return (
    // The key prop forces React to re-mount the component when the location changes.
    // This makes the existing page animate out (implicitly by unmounting)
    // and the new page animate in with `animate-fade-in`.
    <div key={location.pathname} className="h-full w-full"> {/* Ensure it covers the full area */}
      <Routes location={location}> {/* Pass location to Routes */}
        {/* Main Menu / Start Page */}
        <Route path="/" element={<GameMainMenu />} />
        <Route path="/main-menu" element={<GameMainMenu />} />

        {/* Game Modes */}
        <Route path="/game-play-vs-computer" element={<TicTacToeVSPage />} />
        <Route path="/game-play-duo" element={<TicTacToeGame />} />

        {/* Info/Utility Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="/how-to-play" element={<HowToPlay />} />
        <Route path="/options" element={<GameOptions />} />
        <Route path="/user-profile" element={<UserSelection />} /> {/* Note: Ensure this path matches the navigate call from MainMenuPage */}
      </Routes>
    </div>
  );
}

export default App;