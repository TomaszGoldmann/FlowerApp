import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './Component/Routing/App.js';
import {theme} from "./Theme/CreateTheme";
import {ThemeProvider} from "@mui/material";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    </React.StrictMode>
);