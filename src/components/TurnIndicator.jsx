import React, { useEffect } from 'react';

const TurnIndicator = ({ activePlayerTurn, player1Mark, player2Mark, currentTheme }) => {

    const isPlayer1Turn = activePlayerTurn === player1Mark;

    // Optional: Keep debugging logs for now, remove them once confirmed working
    // useEffect(() => {
    //     console.group('TurnIndicator Debug Info');
    //     console.log('1. Raw Props Received:', { activePlayerTurn, player1Mark, player2Mark, currentTheme });
    //     console.log('2. `isPlayer1Turn` calculated as:', isPlayer1Turn);
    //     console.log('3. Resulting State for Player X (Mark 1):', isPlayer1Turn ? 'VIBRANT/GLOWING' : 'MUTED (opacity-30)');
    //     console.log('4. Resulting State for Player O (Mark 2):', !isPlayer1Turn ? 'VIBRANT/GLOWING' : 'MUTED (opacity-30)');
    //     console.groupEnd();
    // }, [activePlayerTurn, player1Mark, player2Mark, isPlayer1Turn, currentTheme]);


    const playerMarkBaseClasses = "flex items-center justify-center h-full text-5xl font-extrabold bg-transparent z-10 transition-all duration-300 ease-in-out";

    // Use the custom .player-mark-glowing class defined in index.css
    const activeMarkClasses = "opacity-100 player-mark-glowing"; // Apply the custom class
    const mutedMarkClasses = "opacity-30"; // Make them distinctly muted when not active

    return (
        <div className="w-64 h-32 mx-auto relative overflow-hidden rounded-xl
                             border-2 border-[var(--panel-border)] bg-[var(--panel-bg)]
                             shadow-xl transform transition-all duration-300 ease-in-out
                             pt-12">

            {/* Top "Turn For" Text */}
            <div className="absolute top-0 left-0 w-full h-12 flex items-center justify-center
                             text-base font-semibold text-[var(--panel-text)]
                             bg-[var(--turn-indicator-bg)] border-b-2 border-[var(--panel-border)]
                             transition-colors duration-300">
                Turn For
            </div>

            {/* Player Marks (X and O) */}
            <div className="grid grid-cols-2 h-[calc(100%-3rem)] absolute bottom-0 left-0 w-full">
                {/* Player 1 Mark Display (X) - X glows if it's X's turn (isPlayer1Turn) */}
                <div
                    className={`${playerMarkBaseClasses} ${isPlayer1Turn ? `text-[var(--player-x-color)] ${activeMarkClasses}` : `text-[var(--page-text-muted)] ${mutedMarkClasses}`}`}
                >
                    {player1Mark}
                </div>

                {/* Player 2 Mark Display (O) - O glows if it's O's turn (!isPlayer1Turn) */}
                <div
                    className={`${playerMarkBaseClasses} ${!isPlayer1Turn ? `text-[var(--player-o-color)] ${activeMarkClasses}` : `text-[var(--page-text-muted)] ${mutedMarkClasses}`}`}
                >
                    {player2Mark}
                </div>
            </div>

            {/* Sliding Background Indicator - Moves to highlight the active player */}
            <div
                className="absolute bottom-0 h-[calc(100%-3rem)] w-1/2 bg-[var(--turn-indicator-slider)] z-0 rounded-b-xl
                               transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(${isPlayer1Turn ? '0%' : '100%'})` }} // Slider moves to X (0%) if it's X's turn, or to O (100%) if it's O's turn
            ></div>
        </div>
    );
};

export default TurnIndicator;