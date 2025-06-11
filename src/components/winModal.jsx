// src/components/WinDrawModal.jsx (No changes needed)

import React from 'react';

const WinDrawModal = ({ message, onPlayAgain, type }) => {
    const isWinner = type === 'winner';
    const buttonText = isWinner ? 'Restart' : 'Play Again';

    return (
        <div className="fixed inset-0 flex flex-col justify-center items-center z-50
                        bg-black bg-opacity-70 backdrop-blur-sm">

            <div className="bg-[var(--modal-bg)] text-[var(--modal-text)]
                            p-8 md:p-10 rounded-lg shadow-2xl text-center
                            border-2 border-[var(--panel-border)]
                            max-w-sm md:max-w-md w-full mx-4
                            transform transition-all duration-300 ease-out scale-100 opacity-100
                            animate-fade-in-scale">

                <h1 className={`text-5xl md:text-6xl font-bold mb-6
                                ${isWinner ? 'text-[var(--color-accent)]' : 'text-[var(--color-primary)]'}
                                transition-colors duration-300`}
                >
                    {message}
                </h1>

                <button
                    className="py-3 px-8 rounded-full text-lg font-semibold uppercase tracking-wider
                                bg-[var(--button-primary-bg)] text-[var(--button-primary-text)]
                                border-2 border-[var(--button-border)]
                                hover:bg-[var(--button-primary-hover-bg)]
                                focus:outline-none focus:ring-4 focus:ring-[var(--focus-ring-color)] focus:ring-offset-2 focus:ring-offset-[var(--focus-ring-offset)]
                                transition-all duration-300 ease-in-out transform hover:scale-105"
                    onClick={onPlayAgain}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export default WinDrawModal;