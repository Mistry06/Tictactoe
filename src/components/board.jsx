// src/components/Board.jsx

import React from 'react';
import Square from './Square'; // Ensure Square.jsx (or Square.js) is correctly named and located

const Board = ({ squares, onClick, disabled, darkMode, winningLine }) => {
    // Helper function to apply borders to create the grid lines
    const getBorderClasses = (i) => {
        let classes = '';
        // Apply borders between cells
        if (i % 3 !== 2) classes += ' border-r-2'; // All but the rightmost column
        if (i < 6) classes += ' border-b-2';      // All but the bottom row
        return classes;
    };

    // Prepare inline styles for the winning line using the winningLine array
    // This will now dynamically change the line's properties based on the win
    const lineStyle = winningLine ? {
        top: `${winningLine[3]}%`,      // 'top' percentage from WINNING_CONDITIONS
        left: `${winningLine[4]}%`,     // 'left' percentage from WINNING_CONDITIONS
        width: `${winningLine[5]}%`,    // 'width' percentage from WINNING_CONDITIONS
        transform: `translate(-50%, -50%) rotate(${winningLine[6]}deg)`, // Center and rotate
        opacity: 1, // Ensure the line is visible when active
        // You might want to make the line thicker based on design
        height: '12px', // Increased thickness for better visibility
    } : {
        // When no win, ensure the line is completely hidden and reset
        width: '0%',
        opacity: 0,
        // Keep other properties reset for smooth transitions
        height: '0px',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) rotate(0deg)',
    };

    return (
        <div className="relative w-[60vmin] h-[60vmin] md:w-[30vw] md:h-[30vw]
                        grid grid-cols-3 grid-rows-3
                        max-w-[400px] max-h-[400px] mx-auto
                        border-none overflow-hidden rounded-lg shadow-xl"> {/* Added overflow-hidden and shadow */}

            {/* Map through the squares array to render individual Square components */}
            {squares.map((square, i) => (
                <Square
                    key={i} // Unique key for each square
                    value={square} // 'X', 'O', or null
                    onClick={() => onClick(i)} // Handler for clicks
                    darkMode={darkMode} // Pass dark mode state for styling
                    // Disable click if game is over, or square is already filled (value is not null)
                    disabled={disabled || square !== null}
                    className={`
                        ${getBorderClasses(i)}
                        ${darkMode ? 'border-gray-600' : 'border-gray-300'}
                        ${(disabled || square !== null) ? 'cursor-not-allowed' : 'cursor-pointer'}
                    `}
                />
            ))}

            {/* The winning line element - positioned absolutely within the Board container */}
            <div
                className={`
                    line absolute
                    bg-gradient-to-r from-yellow-300 to-amber-500
                    dark:from-blue-300 dark:to-blue-600
                    shadow-glow-lg
                    transition-all duration-700 ease-in-out
                    rounded-full z-10
                `}
                style={lineStyle} // Apply the calculated line styles
            ></div>
        </div>
    );
};

export default Board;