import React, {useContext, useState} from "react";
import TextField from '@mui/material/TextField';
import {Button} from "@mui/material";
import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {app} from "../../Firebase/Firebase";
import validator from 'validator';
import {useNavigate} from "react-router-dom";
import MyContext from "../../../myContext";
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Link} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export const SignUp = () => {
    const navigate = useNavigate()
    const {setUser, setMessage} = useContext(MyContext);
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [values, setValues] = useState({
        email: "",
        password: "",
        name: "",
        lastName: ""
    })

    const handleSignUp = () => {
        if (!validator.isEmail(values.email)) {
            setEmailError(true)
            return
        } else {
            setEmailError(false)
        }

        if (!validator.isStrongPassword(values.password)) {
            setPasswordError(true)
            return;
        } else {
            setPasswordError(false)
        }
        console.log("dobry mail i hasło")
        const auth = getAuth(app);
        const {email, password} = values
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in

                /////////////// Zmiana nazwy
                updateProfile(auth.currentUser, {
                    displayName: values.name
                }).then(() => {
                    setUser(userCredential.user)
                }).catch((error) => {
                    console.log(error.message)
                });
                ///////////////

                setMessage("Pomyślnie utworzono konto i zalogowano!")
                setEmailError(false)
                setPasswordError(false)
                navigate("/")
            })
            .catch((error) => {
                console.log(error.message)
            });
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 4,
                    marginBottom: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Zapisz się
                </Typography>
                <Box component="form" noValidate sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="Imię"
                                autoFocus
                                value={values.name}
                                onChange={(e) => setValues({...values, name: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Nazwisko"
                                name="lastName"
                                autoComplete="family-name"
                                value={values.lastName}
                                onChange={(e) => setValues({...values, lastName: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={emailError}
                                helperText={emailError ? "Nie prawidłowy adres E-mail" : ""}
                                required
                                fullWidth
                                id="email"
                                label="E-mail"
                                name="email"
                                autoComplete="email"
                                value={values.email}
                                onChange={(e) => setValues({...values, email: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={passwordError}
                                helperText={passwordError ? `Twoje hasło powinno zawierać:
                                dużą literę, znak specjalny, cyfrę ` : ""}
                                required
                                fullWidth
                                name="password"
                                label="Hasło"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="new-password"
                                value={values.password}
                                onChange={(e) => setValues({...values, password: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox checked={showPassword}
                                                   onChange={() => setShowPassword(!showPassword)} color="primary"/>}
                                label="Pokaż hasło"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary"/>}
                                label="Chcę otrzymywać inspiracje, promocje marketingowe i aktualizacje drogą mailową."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        onClick={handleSignUp}
                    >
                        Utwórz konto
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to={"/Login"} variant="body2">
                                Masz już konto? zaloguj się!
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}