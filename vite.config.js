import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // You imported it correctly!

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss() // <--- Add this line!
  ],
})
