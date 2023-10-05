import React, {useContext} from 'react';
import {Typography, Paper} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import {useUser} from "../Provider";
import MyContext from "../../myContext";
import {getDocs} from "firebase/firestore";
import {colRefOrders} from "../Firebase/Firebase";

export const Orders = () => {
    const {user} = useUser()
    const {orders, setOrders} = useContext(MyContext);

    getDocs(colRefOrders)
        .then((snapshot) => {
            let ordersData = [];
            snapshot.docs.forEach((doc) => {
                ordersData.push({...doc.data(), id: doc.id});
            });

            setOrders(ordersData); // Ustaw dane w stanie komponentu
        })
        .catch((err) => {
            console.error(err.message);
        });

    const Display = () => {
        return orders.flatMap((order) =>
            order.data.map((el, i) => (
                <>
                    {user.displayName === el.flowerShopName && (
                        <Grid key={i}>
                            <Paper sx={{p: "30px", m: "0 auto"}}>
                                <Typography variant="h4" gutterBottom>
                                    {el.price} zł
                                </Typography>
                                {el.extras.color && <Typography variant="h4">Kolor: {el.extras.color}</Typography>}
                                {el.extras.green && <Typography variant="h4">przybranie</Typography>}
                                {el.extras.adding && <Typography variant="h4">wstążka</Typography>}
                                <Typography variant="h4">Data realizacji: {el.timeToMake}</Typography>
                                {el.extras.homeDelivery && <Typography variant="h4">Adres dostawy: {el.extras.address}</Typography>}
                            </Paper>
                        </Grid>
                    )}
                </>
            )));
    };


    return (
        <div style={{marginTop: "10px"}}>
            <Grid container spacing={3} sx={{mt: "0px"}}>
                <Display/>
            </Grid>
        </div>
    )
}