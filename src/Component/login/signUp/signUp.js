import React, {useState} from "react";
import TextField from '@mui/material/TextField';
import {Button, Paper} from "@mui/material";
import Box from "@mui/material/Box";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {app} from "../../firebase/firebase";

export const SignUp = () => {
    const [values, setValues] = useState({
        email: "wkmckmwe",
        password: "mckenmcke"
    })

    const handleAdd = () => {
        const auth = getAuth(app);
        const {email, password} = values
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                console.log(auth)
                console.log(email)
                console.log(password)
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }

    return (
        <Paper elevation={3} className={"login__window"}>
            {/*<Box>*/}
            {/*    <p>Imię</p>*/}
            {/*    <TextField*/}
            {/*        required*/}
            {/*        id="outlined-required"*/}
            {/*        label="Imię"*/}
            {/*        placeholder={"Jan"}*/}
            {/*        value={values.name}*/}
            {/*        onChange={e => {*/}
            {/*            setValues({*/}
            {/*                ...values,*/}
            {/*                name: e.target.value*/}
            {/*            })*/}
            {/*        }}/>*/}
            {/*</Box>*/}
            <Box>
                <p>Login</p>
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
            </Box>
            <Box>
                <p>Hasło</p>
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
                        })}}/>
            </Box>
            <Box>
                <Button variant="contained"
                onClick={handleAdd}
                >Utwórz konto</Button>
            </Box>
        </Paper>
    )
}