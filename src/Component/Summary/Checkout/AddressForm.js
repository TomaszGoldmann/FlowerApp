import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {Paper} from "@mui/material";
import * as React from "react";
import {useContext} from "react";
import MyContext from "../../../myContext";

export const AddressForm = () => {
    const {address, setAddress} = useContext(MyContext)

    return (
        <Paper sx={{p: "30px", mt: "10px"}}>
            <Typography variant="h6" gutterBottom>
                Adres kupującego
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="Imię"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        value={address.name}
                        onChange={e => setAddress({...address, name: e.target.value})}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Nazwisko"
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                        value={address.lastname}
                        onChange={e => setAddress({...address, lastname: e.target.value})}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="address1"
                        name="address1"
                        label="Adres"
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant="standard"
                        value={address.address}
                        onChange={e => setAddress({...address, address: e.target.value})}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        label="Miasto"
                        fullWidth
                        autoComplete="shipping address-level2"
                        variant="standard"
                        value={address.city}
                        onChange={e => setAddress({...address, city: e.target.value})}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="state"
                        name="state"
                        label="Województwo"
                        fullWidth
                        variant="standard"
                        value={address.state}
                        onChange={e => setAddress({...address, state: e.target.value})}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="zip"
                        name="zip"
                        label="kod pocztowy"
                        fullWidth
                        autoComplete="shipping postal-code"
                        variant="standard"
                        value={address.postal}
                        onChange={e => setAddress({...address, postal: e.target.value})}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="country"
                        name="country"
                        label="Kraj"
                        fullWidth
                        autoComplete="shipping country"
                        variant="standard"
                        value={address.country}
                        onChange={e => setAddress({...address, country: e.target.value})}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveAddress" value="yes"/>}
                        label="Użyj tego adresu do płatności"
                    />
                </Grid>
            </Grid>
        </Paper>
    )
}
