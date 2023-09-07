import {createTheme} from "@mui/material";
import "./theme.scss"

export const theme = createTheme({
    palette: {
        primary: {
            light: '#aabcb2',
            main: '#718c7f',
            dark: '#4f6a5c',
            contrastText: '#d2b06b',
        },
        secondary: {
            light: '#e3e787',
            main: '#dac476',
            dark: '#c4915a',
            contrastText: '#aabcb2',
        },
    },
    typography: {
        fontFamily: "Quicksand",
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        fontWeightBold: 700,
    }
})