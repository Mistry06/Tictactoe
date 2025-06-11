// src/components/ScoreBoard.jsx - DYNAMIC OPPONENT LABEL & PROFESSIONAL STRUCTURE

import React from 'react';

// Added 'isAgainstCPU' prop to determine the opponent's label
const ScoreBoard = ({ userScore, compScore, tieScore, onReset, currentPlayerMark, nextPlayerMark, isAgainstCPU }) => {
    // Dynamically set the opponent's label based on the 'isAgainstCPU' prop
    const opponentLabel = isAgainstCPU ? 'CPU' : 'PLAYER 2';

    return (
        <div className="w-full flex flex-col sm:flex-row items-center justify-between
                        rounded-lg shadow-xl p-4 sm:p-6 md:p-8 mt-4
                        bg-[var(--panel-bg)] border border-[var(--panel-border)]
                        text-[var(--panel-text)] font-semibold text-center
                        gap-4 sm:gap-6">

            {/* Score Cards Container */}
            <div className="flex flex-1 w-full justify-around sm:justify-between items-center
                            gap-4 sm:gap-2 md:gap-4">

                {/* Player 1 Score Card (User) */}
                <div className="flex flex-col items-center flex-1 min-w-[70px] p-2 sm:p-3 rounded-md
                                border border-[var(--page-text-muted)]
                                hover:border-[var(--color-primary)] transition-colors duration-200
                                bg-[var(--panel-bg)]/50">
                    <span className="text-sm sm:text-base font-bold mb-1 text-[var(--player-x-color)]">
                        YOU ({currentPlayerMark || 'X'})
                    </span>
                    <span className="text-3xl sm:text-4xl font-extrabold text-[var(--player-x-color)]">
                        {userScore}
                    </span>
                </div>

                {/* Tie Score Card */}
                <div className="flex flex-col items-center flex-1 min-w-[70px] p-2 sm:p-3 rounded-md
                                border border-[var(--page-text-muted)]
                                hover:border-[var(--color-secondary)] transition-colors duration-200
                                bg-[var(--panel-bg)]/50">
                    <span className="text-sm sm:text-base font-bold mb-1 text-[var(--page-text-muted)]">
                        TIES
                    </span>
                    <span className="text-3xl sm:text-4xl font-extrabold text-[var(--page-text-muted)]">
                        {tieScore}
                    </span>
                </div>

                {/* Player 2 / Computer Score Card (Opponent) */}
                <div className="flex flex-col items-center flex-1 min-w-[70px] p-2 sm:p-3 rounded-md
                                border border-[var(--page-text-muted)]
                                hover:border-[var(--player-o-color)] transition-colors duration-200
                                bg-[var(--panel-bg)]/50">
                    <span className="text-sm sm:text-base font-bold mb-1 text-[var(--player-o-color)]">
                        {opponentLabel} ({nextPlayerMark || 'O'}) {/* Dynamic label */}
                    </span>
                    <span className="text-3xl sm:text-4xl font-extrabold text-[var(--player-o-color)]">
                        {compScore}
                    </span>
                </div>
            </div>

            {/* Reset Button */}
            <div className="w-full sm:w-auto mt-2 sm:mt-0">
                <button
                    onClick={onReset}
                    className="w-full sm:w-auto p-3 sm:p-4 rounded-full transition-all duration-200 ease-in-out
                               bg-[var(--button-secondary-bg)] hover:bg-[var(--button-secondary-hover-bg)]
                               text-[var(--button-secondary-text)] shadow-md
                               flex items-center justify-center mx-auto sm:mx-0"
                    aria-label="Reset Game"
                    title="Reset Game"
                >
                    {/* Reset Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 6V2L7 7l5 5V8c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ScoreBoard;