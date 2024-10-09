import React, { useEffect } from 'react';
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { selectThemeMode } from "./appSlice";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import AppRoutes from "./routes";
import { useAppSelector } from "./store/hooks";

import "./App.css";

function App() {
  const themeMode = useAppSelector(selectThemeMode);

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAjmXiD-nVEaLyalBEB8mUDtLkvCtjID6I&libraries=places`;
      script.async = true;
      script.onload = () => console.log('maploaded');
      document.head.appendChild(script);
    } else {
      console.log('maploaded error');
    }
  }, []);

  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });
  
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <BrowserRouter>
          <div className="App">
            <CssBaseline />
            <AppRoutes />
          </div>
        </BrowserRouter>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
