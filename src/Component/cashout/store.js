import React from 'react';
import {
    Container,
    Typography,
    // List,
    // ListItem,
    // ListItemText,
    // ListItemSecondaryAction,
    // IconButton,
    Button
} from '@mui/material';
import {Paper} from "@mui/material";
import { db } from '../firebase/firebase'

export const Store = () => {
    // Przykładowe dane produktów w koszyku
    // const [cartItems, setCartItems] = useState([
    //     { id: 1, name: 'Produkt 1', price: 10 },
    //     { id: 2, name: 'Produkt 2', price: 20 },
    //     { id: 3, name: 'Produkt 3', price: 15 },
    // ]);

    // Funkcja do usuwania produktu z koszyka
    // const removeFromCart = (productId) => {
    //     const updatedCart = cartItems.filter((item) => item.id !== productId);
    //     setCartItems(updatedCart);
    // };

    const storedObj = JSON.parse(localStorage.getItem('myObject'));

    // Obliczanie całkowitej sumy zakupów
    // const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

    const handleSend = async () => {
        console.log("Send")
        const res = await db.collection('Zamówienia').doc("new").set(storedObj);
    }

    return (
        <Paper sx={{p: "30px", mt: "10px"}}>
            <Container maxWidth="md">
                <Typography variant="h4" gutterBottom>
                    Cena: {storedObj.whatOrdered.price}
                </Typography>
                <Typography variant="h4" gutterBottom>
                    kolor: {storedObj.whatOrdered.extras.color}
                </Typography>
                <Typography variant="h4" gutterBottom>
                    zielenina: {storedObj.whatOrdered.extras.green}
                </Typography>
                <Typography variant="h4" gutterBottom>
                    wstążka:{storedObj.whatOrdered.extras.adding}
                </Typography>
                <Typography variant="h4" gutterBottom>
                    Dostawa do domu: {storedObj.whatOrdered.extras.homeDelivery}
                </Typography>
                <Typography variant="h4" gutterBottom>
                    Nazwa Kwiaciarni: {storedObj.whatOrdered.flowerShopName}
                </Typography>
                {/*<List>*/}
                {/*    {cartItems.map((item) => (*/}
                {/*        <ListItem key={item.id}>*/}
                {/*            <ListItemText primary={item.name} secondary={`${item.price} zł`} />*/}
                {/*            <ListItemSecondaryAction>*/}
                {/*                <IconButton edge="end" aria-label="Usuń" onClick={() => removeFromCart(item.id)}>*/}
                {/*                    /!*<DeleteIcon />*!/*/}
                {/*                </IconButton>*/}
                {/*            </ListItemSecondaryAction>*/}
                {/*        </ListItem>*/}
                {/*    ))}*/}
                {/*</List>*/}
                {/*<Typography variant="h5" gutterBottom>*/}
                {/*    Całkowita suma: {totalAmount} zł*/}
                {/*</Typography>*/}
                <Button variant="contained" color="primary" onClick={() => handleSend(storedObj)}>
                    Przejdź do płatności
                </Button>
            </Container>
        </Paper>
    );
}
