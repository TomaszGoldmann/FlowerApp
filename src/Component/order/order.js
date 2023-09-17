import * as React from 'react';
import Box from "@mui/material/Box";
import Grid from '@mui/material/Unstable_Grid2';
import {Button, Checkbox, FormControlLabel, MenuItem, Paper, Select} from "@mui/material";
import Typography from "@mui/material/Typography"; // Grid version 2
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import {useState} from "react";
import TextField from "@mui/material/TextField";
// import ComboBox from "./WhichFlowerShop";
// import {ModalCustom} from "./ModalCustom"
// import {Visualisation} from "./visualisation";
import pic from "../../assets/kwiatek1.png";
import pic2 from "../../assets/kwiatek2.png";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const Order = () => {
    const [checked, setChecked] = useState([false, false, false]);
    const [isCustom, setIsCustom] = useState(false);
    const [color, setColor] = useState("Kolor");
    const [flowerShopName, setFlowerShopName] = useState("");
    const [suma, setSuma] = useState(0)
    const [size, setSize] = useState("")
    const [roses, setRoses] = useState(0)
    const [tulips, setTulips] = useState(0)
    const [open, setOpen] = useState(false);
    // localStorage.clear(); // Wyczyści całą pamięć podręczną localStorage
    // Pobierz istniejącą tablicę z localStorage lub inicjuj jako pustą tablicę
    const existingOrdersJSON = localStorage.getItem('myObject');
    const existingOrders = existingOrdersJSON ? JSON.parse(existingOrdersJSON) : [];
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setSize("")
        setOpen(false);
        setChecked([false, false, false])
        setIsCustom(false)
        setColor("Kolor")
        setFlowerShopName("")
        setRoses(0)
        setTulips(0)
    }
    const [order, setOrder] = useState({
        size: "",
        price: "",
        extras: {
            green: checked[0],
            adding: checked[1],
            homeDelivery: checked[2],
            color: ""
        },
        timeToMake: "",
        flowerShopName: "",
        roses: "",
        tulips: ""
    })

    const values = [5, 2, 20]

    const handlePop = (price, siz) => {
        handleOpen()
        setOrder({
            ...order,
            siz,
            price
        })
        setSize(siz)
        setSuma(price)
    }

    const handleChange = (event, i) => {
        const {value, checked: isChecked} = event.target;

        // Skopiuj tablicę checked, aby nie modyfikować oryginalnej tablicy bezpośrednio
        const updatedChecked = [...checked];

        // Aktualizuj stan odpowiedniego pola wyboru na podstawie jego wartości
        updatedChecked[i] = isChecked;
        console.log(value)
        // Oblicz nową sumę na podstawie zaktualizowanego checked
        let newSuma = suma;

        if (isChecked) {
            newSuma += +values[i];
        } else {
            newSuma -= +values[i];
        }

        let green = order.extras.green;
        let adding = order.extras.adding;
        let homeDelivery = order.extras.homeDelivery;

        if (+value === 5) {
            green = isChecked;
        } else if (+value === 2) {
            adding = isChecked;
        } else if (+value === 20) {
            homeDelivery = isChecked;
        }

        setChecked(updatedChecked);
        setSuma(newSuma);
        setOrder({
            ...order,
            extras: {
                ...order.extras,
                green,
                adding,
                homeDelivery
            }
        })
    };

    const [bouquetContent, setBouquetContent] = useState([]);

    // const handleAdd = () => {
    //     shuffleArray(bouquetContent);
    //     if (bouquetContent.length % 2){
    //         setBouquetContent(prevState => [...prevState, pic2])
    //     } else {
    //         setBouquetContent(prevState => [...prevState, pic])
    //     }
    // }

    const handleRemove = () => {
        console.log(bouquetContent)
        setBouquetContent(prevState => {
                return prevState.slice(0, -1);
            }
        )
    };

    const styl = (angle, reverse) => {
        const an = reverse ? -1 *angle : 1 * angle
        return ({
            height: "150px",
            position: "absolute",
            top: "-20px",
            left: "80%",
            transform: `translate(-50%, -50%) rotate(${an}deg)`, // Obrót o zadany kąt względem środka
        });
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Losowy indeks od 0 do i

            // Zamiana elementów o indeksach i i j
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    const handleTulip = e => {
        setTulips(e.target.value)
        const newArr = new Array(e.target.value).fill(pic);
        const s = shuffleArray(newArr);
        setBouquetContent(s)
    }
    const handleRose = e => {
        setRoses(e.target.value)
        const newArr = new Array(e.target.value).fill(pic2);
        const s = shuffleArray(newArr);
        setBouquetContent(s)
    }

    return (
        <Box sx={{mt: 1}}>
            <Grid container spacing={1}>
                <Grid xs={12} sm={6} md={4}>
                    <Paper onClick={() => handlePop(40, "Mały Bukiet")}>
                        <Typography variant="h3" component="h3" sx={{textAlign: "center"}}>
                            Mały
                        </Typography>
                    </Paper>
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                    <Paper onClick={() => handlePop(80, "Średni Bukiet")}>
                        <Typography variant="h3" component="h3" sx={{textAlign: "center"}}>
                            Średni
                        </Typography>
                    </Paper>
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                    <Paper onClick={() => handlePop(120, "Duży Bukiet")}>
                        <Typography variant="h3" component="h3" sx={{textAlign: "center"}}>
                            Duży
                        </Typography>
                    </Paper>
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                    <Paper onClick={() => {
                        setIsCustom(true)
                        handlePop(0)
                    }}>
                        <Typography variant="h3" component="h3" sx={{textAlign: "center"}}>
                            Custom
                        </Typography>
                    </Paper>
                </Grid>
                {/*<Grid xs={12} sm={12} md={12}>*/}
                {/*    <Paper style={{height: "200px"}}>*/}
                {/*        <Visualisation/>*/}
                {/*    </Paper>*/}
                {/*</Grid>*/}
            </Grid>
            {/*{isCustom && <ModalCustom/>}*/}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h6" component="h3" sx={{textAlign: "center"}}>
                        {size}
                    </Typography>
                    <InputLabel id="demo-simple-select-label">Kolorystyka</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={color}
                        onChange={e => {

                            setColor(e.target.value)
                            setOrder({
                                ...order,
                                extras: {
                                    ...order.extras,
                                    color: e.target.value
                                }
                            })
                        }}>
                        <MenuItem disabled value="Kolor">Kolor</MenuItem>
                        <MenuItem value={"pink"}>pink</MenuItem>
                        <MenuItem value={"red"}>red</MenuItem>
                        <MenuItem value={"purple"}>purple</MenuItem>
                    </Select>
                    {/*<ComboBox/>*/}
                    <TextField id="outlined-basic"
                               label="Która kwiaciarnia"
                               variant="outlined"
                               value={flowerShopName}
                               onChange={e => {
                                   console.log(flowerShopName)
                                   console.log(order)
                                   setFlowerShopName(e.target.value)
                                   setOrder({
                                       ...order,
                                       flowerShopName: e.target.value
                                   })
                               }}/>
                    <FormControlLabel
                        control={<Checkbox checked={checked[0]} onChange={(event) => handleChange(event, 0)}
                                           value={values[0]}/>}
                        label="+5zł zielenina"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={checked[1]} onChange={(event) => handleChange(event, 1)}
                                           value={values[1]}/>}
                        label="+2zł wstążka"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={checked[2]} onChange={(event) => handleChange(event, 2)}
                                           value={values[2]}/>}
                        label="+20zł Dostawa do domu"
                    />
                    {isCustom ? <div>
                        <TextField
                            id="standard-number"
                            label="Róże"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="standard"
                            value={roses}
                            onChange={e => handleRose(e)}
                        />
                        <TextField
                            id="standard-number"
                            label="Tulipany"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="standard"
                            value={tulips}
                            onChange={e => handleTulip(e)}
                        />
                        {bouquetContent.length > 0 &&
                            bouquetContent.map((pic, i) => (
                                <div key={i} style={{ position: "relative" }}>
                                    <img
                                        key={i}
                                        src={pic}
                                        alt={"flower"}
                                        style={styl(10 * i, i % 2 !== 0)} // Tutaj przekazujemy kąt obrotu
                                    />
                                </div>
                            ))}
                        {/*<Button onClick={handleAdd} variant="contained">+</Button>*/}
                        {/*<Button onClick={handleRemove} variant="contained">-</Button>*/}
                    </div> : null}
                    <Button variant="contained">suma: {suma} zł</Button>
                    <Button variant="contained" onClick={() => {
                        // Dodaj nowy obiekt (order) do tablicy
                        existingOrders.push(order);
                        // Zapisz zaktualizowaną tablicę z powrotem do localStorage
                        localStorage.setItem('myObject', JSON.stringify(existingOrders));
                        setOpen(false)
                    }}>Dodaj do koszyka</Button>
                </Box>
            </Modal>
        </Box>
    );
}