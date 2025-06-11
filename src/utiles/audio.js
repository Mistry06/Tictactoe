// src/utiles/audio.js

// Ensure these paths are correct relative to your public folder
// For example, if your audio files are directly in the 'public' folder, these paths are correct.
export const tingAudio = new Audio('/ting.mp3');
export const gameOverAudio = new Audio('/gameover.mp3');
export const victoryAudio = new Audio('/victory.mp3');

// Function to play sound: It takes the audio instance and the global isMuted state from React.
export const playSound = (audioInstance, isMuted) => {
    if (!isMuted) {
        audioInstance.currentTime = 0; // Rewind to start for immediate playback
        audioInstance.play().catch(e => console.error("Error playing audio:", e));
    }
};

// Function to stop and reset all audio (useful when muting or starting a new game)
export const muteAllAudio = () => {
    tingAudio.pause();
    gameOverAudio.pause();
    victoryAudio.pause();
    tingAudio.currentTime = 0;
    gameOverAudio.currentTime = 0;
    victoryAudio.currentTime = 0;
};

// No need for 'export { ... };' here as 'export const' already exports them.