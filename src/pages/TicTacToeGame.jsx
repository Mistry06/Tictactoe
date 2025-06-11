import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Import components
import Board from '../components/board.jsx';
import TurnIndicator from '../components/TurnIndicator.jsx';
import ScoreBoard from '../components/ScoreBoard.jsx';
import WinDrawModal from '../components/winModal.jsx';
import Navbar from '../components/navbar.jsx';

// Import utilities
import { WINNING_CONDITIONS } from '../utiles/constants.js';
import { playSound, muteAllAudio, tingAudio, gameOverAudio, victoryAudio } from '../utiles/audio.js';

// Import image assets for Navbar
import dropdownIcon from '../assets/icons/dropdow5.webp';
import volumeOnIcon from '../assets/icons/volume2.webp';
import themeIcon from '../assets/icons/theme2.png';
import volumeOffIcon from '../assets/icons/volumeoff.png';

// Import the useTheme hook from your ThemeProvider file
// IMPORTANT: Adjust the path below if your ThemeProvider is in a different location.
import { useTheme } from '../components/themeContext.jsx'; // Assuming ThemeProvider is in ThemeContext.jsx, adjust as needed

function TicTacToeGame() {
    const navigate = useNavigate();

    // Game state for DUO MODE
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [playerTurn, setPlayerTurn] = useState('X');
    const [xScore, setXScore] = useState(0);
    const [oScore, setOScore] = useState(0);
    const [tieScore, setTieScore] = useState(0);

    // UI & Game Flow State
    const [winnerMessage, setWinnerMessage] = useState(null);
    const [winningLine, setWinningLine] = useState(null);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    // --- INTEGRATION START: Use the global theme context ---
    // Use the custom useTheme hook to access the current theme and the setTheme function.
    // This replaces the local `currentTheme` state.
    const { theme, setTheme } = useTheme();
    // --- INTEGRATION END ---


    // The turnBgRef and its related useEffect were removed as TurnIndicator handles its own animation

    // --- REMOVED: Theme Effect is now handled globally by ThemeProvider ---
    // The previous useEffect block for applying theme classes to <html> and <body>
    // has been removed because the ThemeProvider component (from your theme-app artifact)
    // already handles this logic when the theme state changes.
    // --- END REMOVED ---


    // --- Game Logic: Check Win/Tie ---
    const checkWin = useCallback((board, player) => {
        for (let i = 0; i < WINNING_CONDITIONS.length; i++) {
            const [a, b, c] = WINNING_CONDITIONS[i];
            if (board[a] === player && board[b] === player && board[c] === player) {
                setWinningLine(WINNING_CONDITIONS[i]);
                return true;
            }
        }
        setWinningLine(null);
        return false;
    }, []);

    const checkTie = useCallback((board) => {
        return board.every(square => square !== null) && !checkWin(board, 'X') && !checkWin(board, 'O');
    }, [checkWin]);

    // --- Player Move Logic ---
    const handleClick = useCallback((i) => {
        if (isGameOver || squares[i] !== null) {
            return;
        }

        const newSquares = squares.slice();
        newSquares[i] = playerTurn;
        setSquares(newSquares);
        playSound(tingAudio, isMuted);

        const currentPlayerWon = checkWin(newSquares, playerTurn);
        const gameTied = checkTie(newSquares);

        if (currentPlayerWon) {
            setIsGameOver(true);
        } else if (gameTied) {
            setIsGameOver(true);
            setWinningLine(null); // Ensure no line is highlighted for a draw
        } else {
            setPlayerTurn(playerTurn === 'X' ? 'O' : 'X');
        }
    }, [squares, playerTurn, isGameOver, isMuted, checkWin, checkTie]);


    // --- Game End Effect: Score Update & Modal Display Timing ---
    useEffect(() => {
        let timer;
        if (isGameOver) {
            const currentWinner = checkWin(squares, playerTurn);
            const currentTie = checkTie(squares);

            if (currentWinner) {
                timer = setTimeout(() => {
                    if (playerTurn === 'X') {
                        setXScore(prev => prev + 1);
                    } else {
                        setOScore(prev => prev + 1);
                    }
                    playSound(victoryAudio, isMuted);
                    setWinnerMessage(`${playerTurn} is the Winner!`);
                }, 1000);
            } else if (currentTie) {
                timer = setTimeout(() => {
                    setTieScore(prev => prev + 1);
                    playSound(gameOverAudio, isMuted);
                    setWinnerMessage('DRAW');
                }, 1500);
            }
        }

        return () => clearTimeout(timer);
    }, [isGameOver, squares, playerTurn, isMuted, checkWin, checkTie]);


    // --- Game Control Actions ---
    const handleRestartRound = useCallback(() => {
        setSquares(Array(9).fill(null));
        setWinnerMessage(null);
        setWinningLine(null);
        setPlayerTurn('X');
        setIsGameOver(false);
    }, []);

    const handleNewGame = useCallback(() => {
        setXScore(0);
        setOScore(0);
        setTieScore(0);
        setSquares(Array(9).fill(null));
        setWinnerMessage(null);
        setWinningLine(null);
        setPlayerTurn('X');
        setIsGameOver(false);
    }, []);

    // --- Navbar Functionality ---
    const toggleVolume = useCallback(() => {
        setIsMuted(prev => {
            const newState = !prev;
            if (newState) {
                muteAllAudio();
            }
            return newState;
        });
    }, []);

    // --- INTEGRATION START: Update toggleTheme to use setTheme from context ---
    // Theme toggle function now uses the setTheme from the global context
    const toggleTheme = useCallback(() => {
        setTheme(prevTheme => { // Use setTheme from context
            console.log('DEBUG: toggleTheme called. Previous theme:', prevTheme); // Log previous theme
            let nextTheme;
            switch (prevTheme) {
                case 'light': // Changed from '' to 'light' for initial state consistency
                    nextTheme = 'dark';
                    break;
                case 'dark':
                    nextTheme = 'colorful-rgb'; // This corresponds to the third theme class in CSS
                    break;
                case 'colorful-rgb':
                    nextTheme = 'light'; // Changed from '' to 'light' for cycling
                    break;
                default:
                    nextTheme = 'light'; // Fallback to 'light'
            }
            console.log('DEBUG: toggleTheme will set next theme to:', nextTheme); // Log next theme
            return nextTheme;
        });
    }, [setTheme]); // Depend on setTheme
    // --- INTEGRATION END ---

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
                    onSoloMode={() => {
                        console.log("Navbar: Navigating to Solo Mode (TicTacToeVSPage) from TicTacToeGame (Duo)");
                        navigate('/game-play-vs-computer');
                    }}
                    onHowToPlay={() => navigate('/how-to-play')}
                    onStartMenu={() => navigate('/')}
                    onHelp={() => navigate('/help')}
                    dropdownIcon={dropdownIcon}
                    volumeOnIcon={volumeOnIcon}
                    themeIcon={themeIcon}
                    volumeOffIcon={volumeOffIcon}
                    isDuoModePage={true}
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
                                   text-[var(--panel-text)]
                                   transform transition-transform duration-300 hover:scale-103">
                        Tic-Tac-Toe
                    </h1>
                </div>

                {/* Game elements container (Board, TurnIndicator, ScoreBoard reside here) */}
                <div className="flex flex-col items-center justify-center w-full gap-4 flex-shrink-0
                                 bg-[var(--panel-bg)] bg-opacity-95 rounded-lg shadow-lg p-6 md:p-8">
                    {/* DEBUG LOG: See what theme is before passing to TurnIndicator */}
                    {console.log('DEBUG: TicTacToeGame passing theme to TurnIndicator:', theme)}
                    <TurnIndicator
                        activePlayerTurn={playerTurn}
                        player1Mark={'X'}
                        player2Mark={'O'}
                        currentTheme={theme}
                    />
                    {/* Game Board area */}
                    <div className="game flex flex-col items-center justify-center relative w-[60vmin] h-[60vmin] max-w-[400px] max-h-[400px]">
                        <Board
                            squares={squares}
                            onClick={handleClick}
                            winningLine={winningLine}
                            disabled={isGameOver}
                            currentTheme={theme}
                        />
                    </div>

                    {/* Score Board Component */}
                    <ScoreBoard
                        userScore={xScore}
                        compScore={oScore}
                        tieScore={tieScore}
                        onReset={handleNewGame}
                        currentPlayerMark={'X'}
                        nextPlayerMark={'O'}
                        currentTheme={theme}
                        isAgainstCPU={false} // <-- This is for Duo Mode
                    />
                </div>
            </div>

            {/* Win/Draw Modals - Now controlled by winnerMessage being set after a delay */}
            {winnerMessage && (
                <div className="fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-70 z-50 transition-opacity duration-300">
                    <WinDrawModal
                        message={winnerMessage}
                        onPlayAgain={handleRestartRound}
                        type={winnerMessage.includes('Winner') ? 'winner' : 'draw'}
                        currentTheme={theme}
                    />
                </div>
            )}
        </div>
    );
}

export default TicTacToeGame;
