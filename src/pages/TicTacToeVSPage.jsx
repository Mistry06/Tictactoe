import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// Import components
import Board from '../components/board.jsx';
import TurnIndicator from '../components/TurnIndicator.jsx';
import ScoreBoard from '../components/scoreBoard.jsx';
import StartGameModal from '../components/StartGameModal.jsx'; // Only for VS mode
import WinDrawModal from '../components/winModal.jsx';
import Navbar from '../components/Navbar.jsx';

// Import utilities
import { WINNING_CONDITIONS } from '../utiles/constants.js';
import { playSound, muteAllAudio, tingAudio, gameOverAudio, victoryAudio } from '../utiles/audio.js';

// Import image assets for Navbar (ADJUST PATHS IF NECESSARY)
import dropdownIcon from '../assets/icons/dropdow5.webp';
import volumeOnIcon from '../assets/icons/volume2.webp';
import themeIcon from '../assets/icons/theme2.png';
import volumeOffIcon from '../assets/icons/volumeoff.png';

// --- INTEGRATION START: Import the useTheme hook ---
// IMPORTANT: Adjust the path below if your ThemeProvider is in a different location.
import { useTheme } from '../components/themeContext.jsx'; // Assuming ThemeContext.jsx is in the same directory as this file
// --- INTEGRATION END ---

function TicTacToeVSPage() {
    const navigate = useNavigate();

    // Game state for SOLO MODE
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [userScore, setUserScore] = useState(0);
    const [compScore, setCompScore] = useState(0);
    const [tieScore, setTieScore] = useState(0);
    const [currentPlayerMark, setCurrentPlayerMark] = useState(null);
    const [nextPlayerMark, setNextPlayerMark] = useState(null); // This is the CPU's mark
    const [activePlayerTurn, setActivePlayerTurn] = useState(null);

    // UI & Game Flow State
    const [showStartModal, setShowStartModal] = useState(true);
    const [winnerMessage, setWinnerMessage] = useState(null);
    const [winningLine, setWinningLine] = useState(null); // State to store winning line indices
    const [isGameOver, setIsGameOver] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    // --- INTEGRATION START: Use the global theme context ---
    // This replaces the local `currentTheme` state.
    const { theme, setTheme } = useTheme();
    // --- INTEGRATION END ---

    const turnBgRef = useRef(null);

    // --- REMOVED: Theme Effect is now handled globally by ThemeProvider ---
    // The previous useEffect block for applying theme classes to <html> and <body>
    // has been removed because the ThemeProvider component centrally manages this logic.
    // This ensures consistency and avoids redundant DOM manipulation.
    // --- END REMOVED ---

    // Effect for TurnIndicator background based on activePlayerTurn
    useEffect(() => {
        if (turnBgRef.current && currentPlayerMark !== null && activePlayerTurn !== null) {
            if (activePlayerTurn === currentPlayerMark) {
                turnBgRef.current.style.left = '0px';
            } else {
                turnBgRef.current.style.left = '85px';
            }
        }
    }, [activePlayerTurn, currentPlayerMark]);

    // --- Game Initialization & Player Choice ---
    const handleCharacterSelect = useCallback((char) => {
        setCurrentPlayerMark(char);
        setNextPlayerMark(char === 'X' ? 'O' : 'X'); // Next player is the computer
        setActivePlayerTurn(char);
        setShowStartModal(false);
        setSquares(Array(9).fill(null));
        setWinningLine(null);
        setWinnerMessage(null);
        setIsGameOver(false);
    }, []);

    // --- Game Logic: Check Win/Tie ---
    const checkWin = useCallback((board, player) => {
        for (let i = 0; i < WINNING_CONDITIONS.length; i++) {
            const [a, b, c] = WINNING_CONDITIONS[i];
            if (board[a] === player && board[b] === player && board[c] === player) {
                // IMPORTANT: Set winningLine here as soon as a win is detected
                setWinningLine(WINNING_CONDITIONS[i]);
                return true;
            }
        }
        setWinningLine(null); // Reset winningLine if no win found (important after a check)
        return false;
    }, []);

    const checkTie = useCallback((board) => {
        if (currentPlayerMark === null || nextPlayerMark === null) {
            return false;
        }
        // Ensure checkWin is called without side effects here, or pass true to avoid resetting winningLine
        return board.every(square => square !== null) && !checkWin(board, currentPlayerMark) && !checkWin(board, nextPlayerMark);
    }, [checkWin, currentPlayerMark, nextPlayerMark]);

    // --- Player Move Logic ---
    const handleClick = useCallback((i) => {
        if (isGameOver || squares[i] !== null || showStartModal || activePlayerTurn !== currentPlayerMark) {
            return;
        }

        const newSquares = squares.slice();
        newSquares[i] = currentPlayerMark;
        setSquares(newSquares);
        playSound(tingAudio, isMuted);

        const playerWon = checkWin(newSquares, currentPlayerMark);
        const gameTied = checkTie(newSquares);

        if (playerWon) {
            setIsGameOver(true);
            // DO NOT set winnerMessage here directly.
            // Let the useEffect below handle the delayed modal display and score update.
        } else if (gameTied) {
            setIsGameOver(true);
            setWinningLine(null); // Ensure no line is highlighted for a draw
            // DO NOT set winnerMessage here directly.
            // Let the useEffect below handle the delayed modal display and score update.
        } else {
            setActivePlayerTurn(nextPlayerMark); // Switch to computer's turn
        }
    }, [squares, isGameOver, showStartModal, activePlayerTurn, currentPlayerMark, nextPlayerMark, tingAudio, checkWin, checkTie, isMuted]);

    // --- Computer (Bot) Move Logic ---
    useEffect(() => {
        let botTimer;
        if (!isGameOver && !showStartModal && activePlayerTurn === nextPlayerMark) {
            const emptyCells = squares
                .map((sq, index) => (sq === null ? index : null))
                .filter(val => val !== null);

            if (emptyCells.length > 0) {
                botTimer = setTimeout(() => {
                    const randomIndex = Math.floor(Math.random() * emptyCells.length);
                    const computerMoveIndex = emptyCells[randomIndex];

                    const newSquares = squares.slice();
                    newSquares[computerMoveIndex] = nextPlayerMark;
                    setSquares(newSquares);
                    playSound(tingAudio, isMuted);

                    const botWon = checkWin(newSquares, nextPlayerMark);
                    const gameTied = checkTie(newSquares);

                    if (botWon) {
                        setIsGameOver(true);
                        // DO NOT set winnerMessage here directly.
                        // Let the useEffect below handle the delayed modal display and score update.
                    } else if (gameTied) {
                        setIsGameOver(true);
                        setWinningLine(null); // Ensure no line is highlighted for a draw
                        // DO NOT set winnerMessage here directly.
                        // Let the useEffect below handle the delayed modal display and score update.
                    } else {
                        setActivePlayerTurn(currentPlayerMark); // Switch back to player's turn
                    }
                }, 500); // Delay for computer's move (e.g., 1000ms)

                return () => clearTimeout(botTimer);
            }
        }
    }, [activePlayerTurn, squares, isGameOver, showStartModal, nextPlayerMark, currentPlayerMark, tingAudio, checkWin, checkTie, isMuted]);

    // --- Game End Effect: Score Update & Modal Display Timing ---
    useEffect(() => {
        let modalTimer;
        if (isGameOver) {
            // Re-evaluate game state to confirm winner/draw after final move
            const finalSquares = squares; // Use the most recent squares state
            const finalWinner = checkWin(finalSquares, currentPlayerMark) ? currentPlayerMark : (checkWin(finalSquares, nextPlayerMark) ? nextPlayerMark : null);
            const finalTie = checkTie(finalSquares);

            if (finalWinner) {
                modalTimer = setTimeout(() => {
                    if (finalWinner === currentPlayerMark) {
                        setUserScore(prev => prev + 1);
                        setWinnerMessage(`YOU (${currentPlayerMark}) WIN!`); // Message for user
                    } else {
                        setCompScore(prev => prev + 1);
                        setWinnerMessage(`CPU (${nextPlayerMark}) WINS!`); // Message for CPU
                    }
                    playSound(victoryAudio, isMuted);
                }, 1000); // Delay for winning line animation/display
            } else if (finalTie) {
                modalTimer = setTimeout(() => {
                    setTieScore(prev => prev + 1);
                    setWinnerMessage('DRAW');
                    playSound(gameOverAudio, isMuted);
                }, 1500); // Slightly shorter delay for draw as no line animation
            }
        }

        return () => clearTimeout(modalTimer);
    }, [isGameOver, squares, currentPlayerMark, nextPlayerMark, isMuted, checkWin, checkTie]); // Added squares, currentPlayerMark, nextPlayerMark

    // --- Game Control Actions ---
    const handleRestartRound = useCallback(() => {
        setSquares(Array(9).fill(null));
        setWinnerMessage(null);
        setWinningLine(null); // Clear winning line
        setActivePlayerTurn(currentPlayerMark); // Reset to user's turn for next round
        setIsGameOver(false);
    }, [currentPlayerMark]);

    const handleNewGame = useCallback(() => {
        setUserScore(0);
        setCompScore(0);
        setTieScore(0);
        setSquares(Array(9).fill(null));
        setWinnerMessage(null);
        setWinningLine(null); // Clear winning line
        setShowStartModal(true); // Show start modal again
        setCurrentPlayerMark(null);
        setNextPlayerMark(null);
        setActivePlayerTurn(null);
        setIsGameOver(false);
    }, []);

    // --- INTEGRATION START: Update toggleTheme to use setTheme from context ---
    // Theme toggle function now uses the setTheme from the global context
    const toggleTheme = useCallback(() => {
        setTheme(prevTheme => { // Use setTheme from context
            console.log('DEBUG: toggleTheme called. Previous theme:', prevTheme); // Log previous theme
            let nextTheme;
            switch (prevTheme) {
                case 'light': // Assuming 'light' is the base/default theme string
                    nextTheme = 'dark';
                    break;
                case 'dark':
                    nextTheme = 'colorful-rgb'; // This corresponds to the third theme class in CSS
                    break;
                case 'colorful-rgb':
                    nextTheme = 'light'; // Cycle back to 'light'
                    break;
                default:
                    nextTheme = 'light'; // Fallback to 'light'
            }
            console.log('DEBUG: toggleTheme will set next theme to:', nextTheme); // Log next theme
            return nextTheme;
        });
    }, [setTheme]); // Depend on setTheme
    // --- INTEGRATION END ---

    const toggleVolume = useCallback(() => {
        setIsMuted(prev => {
            const newState = !prev;
            if (newState) {
                muteAllAudio();
            }
            return newState;
        });
    }, []);

    const openExternalLink = useCallback((url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center
                         transition-colors duration-300 font-sans p-4">
            {/* Navbar fixed at the very top */}
            <div className="absolute top-0 left-0 right-0 z-20">
                <Navbar
                    isMuted={isMuted}
                    toggleVolume={toggleVolume}
                    toggleTheme={toggleTheme}
                    onNewGame={handleNewGame}
                    onDuoMode={() => {
                        console.log("Navbar: Navigating to Duo Mode (TicTacToeGame) from TicTacToeVSPage");
                        navigate('/game-play-duo');
                    }}
                    onHowToPlay={() => navigate('/how-to-play')}
                    onStartMenu={() => navigate('/')}
                    onHelp={() => navigate('/help')}
                    dropdownIcon={dropdownIcon}
                    volumeOnIcon={volumeOnIcon}
                    themeIcon={themeIcon}
                    volumeOffIcon={volumeOffIcon}
                    isDuoModePage={false} // Indicate this is the Solo Mode page
                    currentTheme={theme} 
                />
            </div>

            {/* Main game content wrapper */}
            <div className="pt-20 flex-grow flex flex-col items-center justify-center w-full max-w-2xl px-4 gap-6 mx-auto">

                {/* Main Game Title */}
                <div className="w-full pb-1 md:pb-2 text-center">
                    <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg inline-block
                                   font-['Inter'] p-4 border-b-4 border-[var(--panel-border)]
                                   bg-[var(--panel-bg)] bg-opacity-95 rounded-lg px-8 py-4 shadow-xl
                                   text-[var(--panel-text)]">
                        Tic-Tac-Toe
                    </h1>
                </div>

                {/* Game elements container (Board, TurnIndicator, ScoreBoard reside here) */}
                <div className="flex flex-col items-center justify-center w-full gap-4 flex-shrink-0
                                 bg-[var(--panel-bg)] bg-opacity-95 rounded-lg shadow-lg p-6 md:p-8">
                    {/* Turn Indicator Component */}
                    {currentPlayerMark && nextPlayerMark && activePlayerTurn && (
                        <TurnIndicator
                            activePlayerTurn={activePlayerTurn}
                            player1Mark={currentPlayerMark}
                            player2Mark={nextPlayerMark}
                            turnBgRef={turnBgRef}
                            currentTheme={theme}
                        />
                    )}
                    {/* Game Board area */}
                    <div className="game flex flex-col items-center justify-center relative w-[60vmin] h-[60vmin] max-w-[400px] max-h-[400px]">
                        <Board
                            squares={squares}
                            onClick={handleClick}
                            winningLine={winningLine} // Pass the winningLine state to Board
                            disabled={isGameOver || showStartModal || activePlayerTurn === nextPlayerMark}
                            currentTheme={theme} 
                        />
                    </div>

                    {/* Score Board Component */}
                    <ScoreBoard
                        userScore={userScore}
                        compScore={compScore}
                        tieScore={tieScore}
                        onReset={handleNewGame}
                        currentPlayerMark={currentPlayerMark}
                        nextPlayerMark={nextPlayerMark} // This represents the CPU
                        currentTheme={theme}
                        isAgainstCPU={true} // <-- This is for Solo Mode (VS CPU)
                    />
                </div>
            </div>

            {/* Start Game Window (Modal) */}
            {showStartModal && (
                <div className="fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-70 z-50 transition-opacity duration-300">
                    <StartGameModal
                        onSelectCharacterX={() => handleCharacterSelect('X')}
                        onSelectCharacterO={() => handleCharacterSelect('O')}
                        currentTheme={theme}
                    />
                </div>
            )}

            {/* Win/Draw Modals - Now controlled by winnerMessage being set after a delay */}
            {winnerMessage && (
                <div className="fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-70 z-50 transition-opacity duration-300">
                    <WinDrawModal
                        message={winnerMessage}
                        onPlayAgain={handleRestartRound}
                        type={winnerMessage.includes('WIN') ? 'winner' : 'draw'} // Adjusted check for WIN
                        currentTheme={theme} 
                    />
                </div>
            )}
        </div>
    );
}

export default TicTacToeVSPage;
