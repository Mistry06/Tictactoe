// src/utiles/constants.js

export const WINNING_CONDITIONS = [
    // [pos1, pos2, pos3, line-top-percentage, line-left-percentage, line-width-percentage, rotation-Deg]
    // These percentages are relative to the parent container's width/height (your Board component)
    // The line will be centered on these top/left percentages due to translate(-50%, -50%) CSS transform
    // Line width is approximately 90% for rows/columns, 127% for diagonals (calculated as sqrt(2) * 90)

    // Rows
    [0, 1, 2, 16.6, 50, 90, 0],   // Row 1 (center Y of 1st row, center X, 90% width, 0 deg rotation)
    [3, 4, 5, 50, 50, 90, 0],     // Row 2 (center Y, center X, 90% width, 0 deg rotation)
    [6, 7, 8, 83.3, 50, 90, 0],   // Row 3 (center Y of 3rd row, center X, 90% width, 0 deg rotation)

    // Columns
    [0, 3, 6, 50, 16.6, 90, 90],  // Col 1 (center Y, center X of 1st col, 90% length, 90 deg rotation)
    [1, 4, 7, 50, 50, 90, 90],    // Col 2 (center Y, center X, 90% length, 90 deg rotation)
    [2, 5, 8, 50, 83.3, 90, 90],  // Col 3 (center Y, center X of 3rd col, 90% length, 90 deg rotation)

    // Diagonals
    [0, 4, 8, 50, 50, 127, 45],  // Diagonal (top-left to bottom-right, centered, longer, 45 deg)
    [2, 4, 6, 50, 50, 127, 135], // Diagonal (top-right to bottom-left, centered, longer, 135 deg)
];