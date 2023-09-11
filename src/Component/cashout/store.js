import React, { useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Button } from '@mui/material';
import {Paper} from "@mui/material";
export const Store = () => {
    // Przykładowe dane produktów w koszyku
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Produkt 1', price: 10 },
        { id: 2, name: 'Produkt 2', price: 20 },
        { id: 3, name: 'Produkt 3', price: 15 },
    ]);

    // Funkcja do usuwania produktu z koszyka
    const removeFromCart = (productId) => {
        const updatedCart = cartItems.filter((item) => item.id !== productId);
        setCartItems(updatedCart);
    };

    // Obliczanie całkowitej sumy zakupów
    const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

    return (
        <Paper sx={{p: "30px", mt: "10px"}}>
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Koszyk zakupów
            </Typography>
            <List>
                {cartItems.map((item) => (
                    <ListItem key={item.id}>
                        <ListItemText primary={item.name} secondary={`${item.price} zł`} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="Usuń" onClick={() => removeFromCart(item.id)}>
                                {/*<DeleteIcon />*/}
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            <Typography variant="h5" gutterBottom>
                Całkowita suma: {totalAmount} zł
            </Typography>
            <Button variant="contained" color="primary" onClick={() => alert('Przejdź do płatności')}>
                Przejdź do płatności
            </Button>
        </Container>
        </Paper>
    );
}
