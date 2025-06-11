import React from 'react';

const StartGameModal = ({ onSelectCharacterX, onSelectCharacterO, darkMode }) => {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-70 z-50 p-4">
      <div className={`
        relative flex flex-col justify-center items-center p-8 md:p-12 rounded-lg
        font-sans max-w-lg w-full shadow-xl transition-colors duration-300
        ${darkMode ? 'bg-gray-800 text-gray-100 border border-gray-600' : 'bg-white text-gray-800 border border-gray-300'}
      `}>
        <h1 className={`
          text-3xl md:text-4xl font-semibold mb-8 text-center
          pb-4 border-b border-solid
          ${darkMode ? 'text-gray-200 border-gray-600' : 'text-gray-700 border-gray-300'}
          transition-colors duration-300
        `}>
          Choose Your Mark
        </h1>
        <div className="mt-8 flex justify-center gap-10 w-full">
          {/* Character X Selection */}
          <button
            className={`
              flex items-center justify-center
              h-36 w-36 md:h-48 md:w-48 text-7xl md:text-8xl font-bold
              cursor-pointer rounded-lg shadow-md
              transition-all duration-200 ease-in-out transform hover:scale-105
              focus:outline-none focus:ring-2 focus:ring-offset-2
              ${darkMode
                ? 'bg-gray-700 text-blue-400 hover:bg-blue-700 hover:text-white focus:ring-blue-500 focus:ring-offset-gray-800'
                : 'bg-gray-100 text-blue-600 hover:bg-blue-500 hover:text-white focus:ring-blue-400 focus:ring-offset-white'
              }
            `}
            onClick={onSelectCharacterX}
            aria-label="Select X character"
          >
            X
          </button>
          {/* Character O Selection */}
          <button
            className={`
              flex items-center justify-center
              h-36 w-36 md:h-48 md:w-48 text-7xl md:text-8xl font-bold
              cursor-pointer rounded-lg shadow-md
              transition-all duration-200 ease-in-out transform hover:scale-105
              focus:outline-none focus:ring-2 focus:ring-offset-2
              ${darkMode
                ? 'bg-gray-700 text-red-400 hover:bg-red-700 hover:text-white focus:ring-red-500 focus:ring-offset-gray-800'
                : 'bg-gray-100 text-red-600 hover:bg-red-500 hover:text-white focus:ring-red-400 focus:ring-offset-white'
              }
            `}
            onClick={onSelectCharacterO}
            aria-label="Select O character"
          >
            O
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartGameModal;