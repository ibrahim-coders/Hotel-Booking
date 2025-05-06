import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Router from './router/Router.jsx';
import { Toaster } from 'react-hot-toast';
import AuthProvider from './components/AuthProvider.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster position="top-center" />
    <AuthProvider />
    <Router />
  </StrictMode>
);
