import React, {useContext, useState} from "react";
import TextField from '@mui/material/TextField';
import {Button, Paper} from "@mui/material";
import "./login.scss"
import Box from "@mui/material/Box";
import {Link} from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import MyContext from "../../myContext";

export const Login = () => {
    const [values, setValues] =useState({
        email: "",
        password: ""
    })
    const {setUser, user} = useContext(MyContext);
    const handleLogin = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                // Signed in
                setUser(userCredential.user)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    return (
        <Paper elevation={3} className={"login__window"}>
            <h1 onClick={()=>console.log(user)}>Zaloguj</h1>
            {user && <h1>
                {user.email}
            </h1>}
            <Box className={"login__window__input"}>
                <TextField
                    // required
                    id="outlined-required"
                    label="E-mail"
                    placeholder={"...@gmail.com"}
                    value={values.email}
                    onChange={(e) => setValues({ ...values, email: e.target.value })}
                />
            </Box>
            <Box className={"login__window__input"}>
                <TextField
                    id="outlined-password-input"
                    label="Hasło"
                    type="password"
                    autoComplete="current-password" // Poprawiamy autoComplete na "current-password"
                    placeholder="B4n4n!" // Poprawiamy placeholder
                    value={values.password}
                    onChange={(e) => setValues({ ...values, password: e.target.value })}
                />
            </Box>
            <Box>
                <Link to={"/login/signup"} className={"signup__button"}>
                    <Button variant="outlined">Utwórz konto</Button>
                </Link>
                <Button variant="contained" onClick={handleLogin}>Zaloguj</Button>
            </Box>
        </Paper>
    )
}