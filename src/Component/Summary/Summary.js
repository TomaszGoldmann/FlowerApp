import React, {useEffect, useState} from 'react';
import {
    Typography,
    Button
} from '@mui/material';
import {Paper} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import "./summary.scss"

export const Summary = () => {
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

    const handleSend = () => {
        navigate("/Summary/Checkout")
    }

    return (
        <Box sx={{mt: "20px"}}>
            <Grid container spacing={2}>
                {storedArr.map((storedObj, i) => (
                    <Grid xs={12} md={6} xl={4} key={i}>
                        <Paper sx={{p: "30px"}}>
                            <Typography variant="h4" gutterBottom>
                                Nazwa Kwiaciarni: {storedObj.flowerShopName}
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                kolor: {storedObj.extras.color}
                            </Typography>
                            {storedObj.extras.green &&
                                <Typography variant="h6" gutterBottom>
                                    Przybranie + 5 zł
                                </Typography>
                            }
                            {storedObj.extras.adding &&
                                <Typography variant="h6" gutterBottom>
                                    Wstążka + 5 zł
                                </Typography>
                            }
                            {storedObj.extras.homeDelivery &&
                                <Typography variant="h6" gutterBottom>
                                    Dostawa do domu {storedObj.extras.address &&
                                    <Typography variant="h6" gutterBottom>na adres:
                                        {storedObj.extras.address} + 20 zł
                                    </Typography>}
                                </Typography>
                            }
                            <Typography variant="h6" gutterBottom>
                                Data realizacji: {storedObj.timeToMake}
                            </Typography>
                            <Box className={"flex"}>
                                <Typography sx={{mb: "0"}} variant="h6" gutterBottom>
                                    Cena: <span className={"highlight"}>{storedObj.price} zł</span>
                                </Typography>
                                <IconButton onClick={() => {
                                    const updatedArr = [...storedArr];
                                    // Usuń element o podanym indeksie
                                    updatedArr.splice(i, 1);
                                    // Zaktualizuj tablicę w lokalnym magazynie przeglądarki
                                    localStorage.setItem('myObject', JSON.stringify(updatedArr));
                                    // Zaktualizuj stan komponentu (jeśli jest to komponent funkcyjny, możesz użyć hooka useState)
                                    setStoredArr(updatedArr);
                                }}>
                                    <DeleteIcon/>
                                </IconButton>
                            </Box>
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
                            style={{marginTop: "20px"}}
                        >
                            Przejdź do płatności
                        </Button>
                    </>
                    :
                    <Paper sx={{p: "30px"}}>
                        <Typography variant="h4" gutterBottom>
                            Koszyk jest pusty
                        </Typography>
                    </Paper>
            }
        </Box>
    )
}
