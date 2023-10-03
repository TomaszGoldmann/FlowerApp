import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import {useContext} from "react";
import MyContext from "../../../myContext";

export default function Review() {
    const {address, payment} = useContext(MyContext)
    const addressArr = Object.values(address);
    const paymentArr = Object.values(payment);

    const order = JSON.parse(localStorage.getItem('myObject')); // Załóżmy, że to Twoja tablica obiektów
    const total = order.reduce((sum, obj) => sum + obj.price, 0);

    const payments = [
        { name: 'Właściciel karty', detail: paymentArr[0] },
        { name: 'Numer karty', detail: paymentArr[1] },
        { name: 'Data ważności', detail: paymentArr[2] },
    ];

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Zamówienie
            </Typography>
            <List disablePadding>
                {order.map(product => (
                    <ListItem key={product.flowerShopName} sx={{ py: 1, px: 0 }}>
                        <ListItemText primary={<span className={"highlight"}>{product.flowerShopName}</span>} secondary={"Nazwa kwiaciarni"} />
                        <Typography variant="body2">cena bukietu: {product.price} zł</Typography>
                        {/*<Typography variant="body2">kolor {product.extras.color}</Typography>*/}
                    </ListItem>
                ))}
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Suma" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        <span className={"highlight"}>{total} zł</span>
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Dane kupującego
                    </Typography>
                    <Typography gutterBottom>{addressArr.join(', ')}</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Dane karty
                    </Typography>
                    <Grid container>
                        {payments.map((payment) => (
                            <React.Fragment key={payment.name}>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.name}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.detail}</Typography>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}