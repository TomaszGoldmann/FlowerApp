import React, {useEffect, useState} from 'react';
import {Typography, Grid, Paper} from '@mui/material';
import {getDocs} from 'firebase/firestore';
import {colRefOrders} from "../firebase/firebase";
// import {useUser} from "../provider";

export const Orders = () => {
    const [orders, setOrders] = useState([]);
    // const {user} = useUser()

    useEffect(() => {
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
    }, []);

    const Display = () => {
        return orders.flatMap((order) =>
            order.data.map((el, i) => (
                // {user.email === el.flowerShopName}
                <Grid key={i}>
                    <Paper sx={{p: "30px", m: "0 auto"}}>
                        <Typography variant="h4" gutterBottom>
                            Nazwa kwiacirani: {el.flowerShopName}
                        </Typography>
                        <Typography variant="h4" gutterBottom>
                            {el.price} zł
                        </Typography>
                        {el.extras.green && <Typography variant="h4" gutterBottom>Zielenina</Typography>}
                        {el.extras.adding && <Typography variant="h4" gutterBottom>wstążka</Typography>}
                        {el.extras.homeDelivery && <Typography variant="h4" gutterBottom>Dostawa</Typography>}
                    </Paper>
                </Grid>
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