import React from 'react';

const Square = ({ value, onClick, className, disabled }) => {
  return (
    <div
      className={`
        border border-[var(--text-color)] text-[10vmin]
        font-['Gill_Sans','Gill_Sans_MT','Calibri','Trebuchet_MS',sans-serif]
        flex justify-center items-center board-square-hover
        ${className || ''}
        ${disabled ? 'pointer-events-none opacity-60' : 'cursor-pointer'}
      `}
      onClick={onClick}
    >
      <span className="text-current bg-transparent">{value}</span>
    </div>
  );
};

export default Square;