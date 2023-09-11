import React, {useState} from "react";
import TextField from '@mui/material/TextField';
import {Button, Paper} from "@mui/material";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {app} from "../../firebase/firebase";
import validator from 'validator';

export const SignUp = () => {
    const [values, setValues] = useState({
        email: "",
        password: ""
    })

    const handleAdd = () => {
        if (!validator.isEmail(values.email)) {
            console.log("to nie email")
            return
        } else if (!validator.isStrongPassword(values.password)) {
            console.log("słabe hasło")
            return;
        }
        console.log("dobry mail i hasło")
        const auth = getAuth(app);
        const {email, password} = values
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }

    return (
        <Paper elevation={3} className={"login__window"}>
            <TextField
                required
                id="outlined-required"
                label="E-mail"
                placeholder={"...@gmail.com"}
                className={"login__login"}
                value={values.email}
                onChange={e => {
                    setValues({
                        ...values,
                        email: e.target.value
                    })
                }}/>
            <TextField
                required
                id="outlined-password-input"
                label="Hasło"
                type="password"
                autoComplete="Hasło"
                placeholder={"B4n4n!"}
                value={values.password}
                onChange={e => {
                    setValues({
                        ...values,
                        password: e.target.value
                    })
                }}/>
            <Button variant="contained"
                    onClick={handleAdd}
            >Utwórz konto</Button>
        </Paper>
    )
}