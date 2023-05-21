import React from 'react'
import './index.css'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux';
import {createTheme, ThemeProvider} from "@mui/material";
import {store} from "./core/store/store.ts";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <Provider store={store}>
          <ThemeProvider theme={darkTheme}>
              <App/>
          </ThemeProvider>
      </Provider>
  </React.StrictMode>,
)
