import {createTheme} from "@mui/material";
import "./theme.scss"

export const theme = createTheme({
    palette: {
        primary: {
            light: '#aabcb2',
            main: '#718c7f',
            dark: '#3E4D45',
            contrastText: "#DEDABD",
        },
        secondary: {
            light: '#FAF3D5',
            main: '#DEDABD',
            dark: '#F5F5DC',
            contrastText: '#3E4D45',
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