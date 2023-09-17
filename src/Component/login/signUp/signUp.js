import React, {useContext, useState} from "react";
import TextField from '@mui/material/TextField';
import {Button, Paper} from "@mui/material";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {app} from "../../firebase/firebase";
import validator from 'validator';
import {useNavigate} from "react-router-dom";
import MyContext from "../../../myContext";

export const SignUp = () => {
    const navigate = useNavigate()
    const {setUser, user} = useContext(MyContext);
    const [values, setValues] = useState({
        email: "",
        password: ""
    })

    const handleAdd = () => {
        // if (!validator.isEmail(values.email)) {
        //     console.log("to nie email")
        //     return
        // } else if (!validator.isStrongPassword(values.password)) {
        //     console.log("słabe hasło")
        //     return;
        // }
        // console.log("dobry mail i hasło")
        const auth = getAuth(app);
        const {email, password} = values
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                setUser(userCredential.user)
                navigate("/")
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
            {user && <h1 onClick={()=> console.log(user.email)}>
                Success
            </h1>}
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