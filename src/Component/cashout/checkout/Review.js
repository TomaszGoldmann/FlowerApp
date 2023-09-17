import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import {useContext} from "react";
import MyContext from "../../../myContext";

// const products = [
//     {
//         name: 'Product 1',
//         desc: 'A nice thing',
//         price: '$9.99',
//     },
//     {
//         name: 'Product 2',
//         desc: 'Another thing',
//         price: '$3.45',
//     },
//     {
//         name: 'Product 3',
//         desc: 'Something else',
//         price: '$6.51',
//     },
//     {
//         name: 'Product 4',
//         desc: 'Best thing of all',
//         price: '$14.11',
//     },
//     { name: 'Shipping', desc: '', price: 'Free' },
// ];

const products = JSON.parse(localStorage.getItem('myObject'))

export default function Review() {
    const {address, payment} = useContext(MyContext)
    const addressArr = Object.values(address);
    const paymentArr = Object.values(payment);

    const order = JSON.parse(localStorage.getItem('myObject')); // Załóżmy, że to Twoja tablica obiektów
    const total = order.reduce((sum, obj) => sum + obj.price, 0);

    console.log(total); // Suma wartości z klucza "price"

    const payments = [
        // { name: 'Card type', detail: paymentArr[0] },
        { name: 'Card holder', detail: paymentArr[0] },
        { name: 'Card number', detail: paymentArr[1] },
        { name: 'Expiry date', detail: paymentArr[2] },
    ];

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Zamówienie
            </Typography>
            <List disablePadding>
                {products.map((product, i) => (
                    <ListItem key={product.flowerShopName} sx={{ py: 1, px: 0 }}>
                        <ListItemText primary={product.flowerShopName} secondary={product.extras.green} />
                        <Typography variant="body2">{product.price} zł</Typography>
                        <Typography variant="body2">kolor {product.extras.color}</Typography>
                    </ListItem>
                ))}
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Cena" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {total} zł
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