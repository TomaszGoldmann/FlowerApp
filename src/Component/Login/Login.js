import React, {useContext, useState} from "react";
import TextField from '@mui/material/TextField';
import {Button} from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";
import {Link, useNavigate} from "react-router-dom";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MyContext from "../../myContext";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import "./login.scss"

export const Login = () => {
    const [values, setValues] = useState({
        email: "",
        password: ""
    })
    const {setUser, user} = useContext(MyContext);
    const navigate = useNavigate()
    const handleLogin = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                // Signed in
                setUser(userCredential.user)
                navigate("/")
                // ...
            })
            .catch((error) => {
                console.log(error.message)
            });
    }

    return (
        <Container component="main" maxWidth="xs">
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
                {user && <h1>
                    Zalogowany: {user.email}
                </h1>}
                <Typography component="h1" variant="h5">
                    Logowanie
                </Typography>
                <Box component="form" noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="E-mail"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={values.email}
                        onChange={(e) => setValues({...values, email: e.target.value})}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Hasło"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={values.password}
                        onChange={(e) => setValues({...values, password: e.target.value})}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Zapamiętaj mnie"
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        onClick={handleLogin}
                    >
                        Zaloguj
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to={""} variant="body2">
                                Przypomnij hasło
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to={"/Login/signup"} variant="body2">
                                Nie masz konta? Zapisz się!
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}