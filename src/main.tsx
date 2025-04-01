import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { PWAProvider } from './components/PWAProvider';
import { theme } from './theme';
import App from './App';
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import { TempoDevtools } from "tempo-devtools";
TempoDevtools.init();

const basename = import.meta.env.BASE_URL;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PWAProvider>
        <BrowserRouter basename={basename}>
          <App />
        </BrowserRouter>
      </PWAProvider>
    </ThemeProvider>
  </React.StrictMode>
);
