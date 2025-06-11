import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
// Removed: import { BrowserRouter } from 'react-router-dom'; // Not supported in Canvas

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Removed: <BrowserRouter> */}
      <App />
    {/* Removed: </BrowserRouter> */}
  </React.StrictMode>,
);
