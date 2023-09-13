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
import {Visualisation} from "./visualisation";

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
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [order, setOrder] = useState({
        whatOrdered:
            {
                price: "",
                extras: {
                    green: checked[0],
                    adding: checked[1],
                    homeDelivery: checked[2],
                    color: ""
                },
                timeToMake: "",
                flowerShopName: "test",
            }
    })

    const values = [5, 2, 20]

    const handlePop = price => {
        handleOpen()
        setOrder({
            ...order,
            whatOrdered: {
                ...order.whatOrdered,
                price
            }
        })
        setSuma(price)
    }

    // const handleAdd = num => {
    //     setSuma(num)
    // }

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
            if (value === 5) {
                setOrder({
                    whatOrdered: {
                        ...order.whatOrdered,
                        extras: {
                            ...order.whatOrdered.extras,
                            green: isChecked
                        }
                    }
                })
            }
            if (value === 2) {
                setOrder({
                    whatOrdered: {
                        ...order.whatOrdered,
                        extras: {
                            ...order.whatOrdered.extras,
                            adding: isChecked
                        }
                    }
                })
            }
            if (value === 5) {
                setOrder({
                    whatOrdered: {
                        ...order.whatOrdered,
                        extras: {
                            ...order.whatOrdered.extras,
                            homeDelivery: isChecked
                        }
                    }
                })
            }
        } else {
            newSuma -= +values[i];
            if (value === 5) {
                setOrder({
                    whatOrdered: {
                        ...order.whatOrdered,
                        extras: {
                            ...order.whatOrdered.extras,
                            green: isChecked
                        }
                    }
                })
            }
            if (value === 2) {
                setOrder({
                    whatOrdered: {
                        ...order.whatOrdered,
                        extras: {
                            ...order.whatOrdered.extras,
                            adding: isChecked
                        }
                    }
                })
            }
            if (value === 5) {
                setOrder({
                    whatOrdered: {
                        ...order.whatOrdered,
                        extras: {
                            ...order.whatOrdered.extras,
                            homeDelivery: isChecked
                        }
                    }
                })
            }
        }

        setChecked(updatedChecked);
        setSuma(newSuma);
    };

    return (
        <Box sx={{mt: 1}}>
            <Grid container spacing={1}>
                <Grid xs={12} sm={6} md={4}>
                    <Paper onClick={() => handlePop(40)}>
                        <Typography variant="h3" component="h3" sx={{textAlign: "center"}}>
                            Mały
                        </Typography>
                    </Paper>
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                    <Paper onClick={() => handlePop(80)}>
                        <Typography variant="h3" component="h3" sx={{textAlign: "center"}}>
                            Średni
                        </Typography>
                    </Paper>
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                    <Paper onClick={() => handlePop(120)}>
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
                <Grid xs={12} sm={12} md={12}>
                    <Paper style={{height: "200px"}}>
                        <Visualisation/>
                    </Paper>
                </Grid>
            </Grid>
            {/*{isCustom && <ModalCustom/>}*/}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <InputLabel id="demo-simple-select-label">Kolorystyka</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={color}
                        onChange={e => {
                            setColor(e.target.value)
                            setOrder({
                                whatOrdered: {
                                    ...order.whatOrdered,
                                    extras: {
                                        ...order.whatOrdered.extras,
                                        color: e.target.value
                                    }
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
                                       whatOrdered: {
                                           ...order.whatOrdered,
                                           flowerShopName: e.target.value
                                       }
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
                        />
                        <TextField
                            id="standard-number"
                            label="Tulipany"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="standard"
                        />
                    </div> : null}
                    <Button variant="contained" onClick={handleClose}>suma: {suma}</Button>
                    <Button variant="contained" onClick={() => {
                        localStorage.setItem('myObject', JSON.stringify(order))
                        setOpen(false)
                    }}>Dodaj do koszyka</Button>
                </Box>
            </Modal>
        </Box>
    );
}