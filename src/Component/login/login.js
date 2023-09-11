import React from "react";
import TextField from '@mui/material/TextField';
import {Button, Paper} from "@mui/material";
import "./login.scss"
import Box from "@mui/material/Box";
import {Link} from "react-router-dom";

export const Login = () => {
    return (
        <Paper elevation={3} className={"login__window"}>
            <h1>Zaloguj</h1>
            <Box>
                <TextField
                    // required
                    id="outlined-required"
                    label="E-mail"
                    placeholder={"...@gmail.com"}
                    className={"login__login"}
                />
            </Box>
            <Box>
                <TextField
                    id="outlined-password-input"
                    label="Hasło"
                    type="password"
                    autoComplete="Hasło"
                    placeholder={"B4n4n!"}
                />
            </Box>
            <Box>
                <Link to={"/login/signup"} className={"signup__button"}>
                    <Button variant="outlined">Utwórz konto</Button>
                </Link>
                <Button variant="contained">Zaloguj</Button>
            </Box>
        </Paper>
    )
}