import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css'; // Make sure this is the only style tree file loaded here!

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);