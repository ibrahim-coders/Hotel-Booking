import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Router from './router/Router.jsx';
import { Toaster } from 'react-hot-toast';
import AuthProvider from './components/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" />
      <AuthProvider />
      <Router />
    </QueryClientProvider>
  </StrictMode>
);
