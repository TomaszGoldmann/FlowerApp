import React, {useContext, useEffect, useState} from 'react';
import {
    Typography,
    Button, Grid
} from '@mui/material';
import {Paper} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";
// import MyContext from "../../myContext";
import IconButton from '@mui/material/IconButton';

export const Store = () => {
    const [storedArr, setStoredArr] = useState([])
    // const [error, setError] = useState(null)
    // const {user} = useContext(MyContext)
    const navigate = useNavigate()

    useEffect(() => {
        let data
        try {
            data = JSON.parse(localStorage.getItem('myObject')) || []
        } catch (e) {
            console.log(e)
            data = []
        }

        setStoredArr(data)
    }, [])

    // console.log(user)
    // Obliczanie całkowitej sumy zakupów
    // const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

    const handleSend = async () => {
        console.log("Send")
        // const res = await db.collection('Zamówienia').doc("new").set(storedObj);
        // console.log(res)

        // if (user) {
        //     navigate('/login');
        // } else {
        //     setError("Zaloguj się");
        // }
        navigate("/cashout/checkout")
    }

    return (
        <Box sx={{mt: "20px"}}>
            <Grid container spacing={2}>
                {storedArr.map((storedObj, i) => (
                    <Grid xs={12} md={6} xl={4} key={i}>
                        <Paper sx={{p: "30px"}}>
                            <Typography variant="h4" gutterBottom>
                                Cena: {storedObj.price}
                            </Typography>
                            <Typography variant="h4" gutterBottom>
                                kolor: {storedObj.extras.color}
                            </Typography>
                            {storedObj.extras.green &&
                                <Typography variant="h6" gutterBottom>
                                    Zielenina
                                </Typography>
                            }
                            {storedObj.extras.adding &&
                                <Typography variant="h6" gutterBottom>
                                    Wstążka
                                </Typography>
                            }
                            {storedObj.extras.homeDelivery &&
                                <Typography variant="h6" gutterBottom>
                                    Dostawa do domu
                                </Typography>
                            }
                            <Typography variant="h4" gutterBottom>
                                Nazwa Kwiaciarni: {storedObj.flowerShopName}
                            </Typography>
                            <IconButton>
                                <DeleteIcon onClick={() => {
                                    const updatedArr = [...storedArr];
                                    // Usuń element o podanym indeksie
                                    updatedArr.splice(i, 1);
                                    // Zaktualizuj tablicę w lokalnym magazynie przeglądarki
                                    localStorage.setItem('myObject', JSON.stringify(updatedArr));
                                    // Zaktualizuj stan komponentu (jeśli jest to komponent funkcyjny, możesz użyć hooka useState)
                                    setStoredArr(updatedArr);
                                }}/>
                            </IconButton>
                        </Paper>
                    </Grid>
                ))}
            < /Grid>
            {
                storedArr.length ?
                    <>

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleSend(storedArr)}
                            style={{
                                backgroundColor: error ? 'red' : "", // Kolor tła w zależności od błędu
                                color: 'white', // Kolor tekstu
                                // Inne stylowanie według potrzeb
                            }}
                        >
                            Przejdź do płatności
                        </Button>
                        {/* Wyświetl komunikat błędu, jeśli istnieje */}
                        {error && <p style={{color: 'red'}}>{error}</p>}
                    </>
                    :
                    <p>Twój koszyk jest pusty</p>
            }
        </Box>
    )
}
