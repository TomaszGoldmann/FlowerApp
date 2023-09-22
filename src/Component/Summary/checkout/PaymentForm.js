import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Paper} from "@mui/material";
import {useContext} from "react";
import MyContext from "../../../myContext";

export const PaymentForm = () => {
    const {payment, setPayment} = useContext(MyContext)

    return (
        <React.Fragment>
            <Paper sx={{p: "30px", mt: "10px"}}>
                <Typography variant="h6" gutterBottom>
                    Metoda płatności
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            id="cardName"
                            label="Imię i Nazwisko"
                            fullWidth
                            autoComplete="cc-name"
                            variant="standard"
                            value={payment.name}
                            onChange={e => setPayment({...payment, name: e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            id="cardNumber"
                            label="Numer karty"
                            fullWidth
                            autoComplete="cc-number"
                            variant="standard"
                            value={payment.cardNumber}
                            onChange={e => setPayment({...payment, cardNumber: e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            id="expDate"
                            label="Data ważności"
                            fullWidth
                            autoComplete="cc-exp"
                            variant="standard"
                            value={payment.expirationDate}
                            onChange={e => setPayment({...payment, expirationDate: e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            id="cvv"
                            label="CVV"
                            helperText="Ostatnie trzy cyfry na pasku podpisu"
                            fullWidth
                            autoComplete="cc-csc"
                            variant="standard"
                            value={payment.cvv}
                            onChange={e => setPayment({...payment, cvv: e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox color="secondary" name="saveCard" value="yes"/>}
                            label="Zapamiętaj szczegóły tej karty do przyszłych płatności"
                        />
                    </Grid>
                </Grid>
            </Paper>
        </React.Fragment>
    );
}
