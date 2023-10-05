import React, {useEffect} from 'react';
import Box from "@mui/material/Box";
import Grid from '@mui/material/Unstable_Grid2';
import {Button, Checkbox, FormControlLabel, MenuItem, Paper, Select} from "@mui/material";
import Typography from "@mui/material/Typography"; // Grid version 2
import Modal from '@mui/material/Modal';
import {useContext, useState} from "react";
import TextField from "@mui/material/TextField";
import "./order.scss"
import pic from "../../assets/kwiatek1.png";
import pic2 from "../../assets/kwiatek2.png";
import med from "../../assets/medium.jpg"
import Autocomplete from '@mui/material/Autocomplete';
import MyContext from "../../myContext";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import MyDatePicker from "./OrderCompnents/DatePicker"
import Alert from "@mui/material/Alert";
import dayjs from "dayjs";
import {colRefCompanies} from "../Firebase/Firebase";
import {getDocs} from "firebase/firestore";

export const Order = () => {
    const [flowerShopName, setFlowerShopName] = useState("");
    const [size, setSize] = useState("")
    const [suma, setSuma] = useState(0)
    const [roses, setRoses] = useState(0)
    const [tulips, setTulips] = useState(0)
    const [checked, setChecked] = useState([false, false, false]);
    const [isCustom, setIsCustom] = useState(false);
    const [error, setError] = useState(false);
    const [open, setOpen] = useState(false);
    const [order, setOrder] = useState({
        size: "",
        price: "",
        extras: {
            green: checked[0],
            adding: checked[1],
            homeDelivery: checked[2],
            color: "Kolorystyka",
            address: ""
        },
        timeToMake: dayjs().add(1, 'day').format("D MMMM YYYY"),
        flowerShopName: "",
        roses: "",
        tulips: "",
    })
    const {owners, setOwners, setMessage} = useContext(MyContext)

    useEffect(()=>{
        getDocs(colRefCompanies)
            .then((snapshot) => {
                let ownersData = [];
                snapshot.docs.forEach((doc) => {
                    ownersData.push({...doc.data(), id: doc.id});
                });

                setOwners(ownersData); // Ustaw dane w stanie komponentu
            })
            .catch((err) => {
                console.error(err.message);
            });
    }, [setOwners])

    // Pobierz istniejącą tablicę z localStorage lub inicjuj jako pustą tablicę
    const existingOrdersJSON = localStorage.getItem('myObject');
    const existingOrders = existingOrdersJSON ? JSON.parse(existingOrdersJSON) : [];
    const handleOpen = () => {
        setOpen(true);
        setError(false)
    }
    const handleClose = () => {
        setSize("")
        setOpen(false);
        setChecked([false, false, false])
        setIsCustom(false)
        setFlowerShopName("")
        setRoses(0)
        setTulips(0)
        setOrder({
            size: "",
            price: "",
            extras: {
                green: checked[0],
                adding: checked[1],
                homeDelivery: checked[2],
                color: "Kolorystyka",
                address: ""
            },
            timeToMake: dayjs().add(1, 'day').format("D MMMM YYYY"),
            flowerShopName: "",
            roses: "",
            tulips: "",
        })
    }

    const values = [5, 2, 20]

    const handlePop = (price, siz) => {
        handleOpen()
        setSize(siz)
        setChecked([false, false, false])
        setIsCustom(false)
        setFlowerShopName("")
        setRoses(0)
        setTulips(0)
        setSuma(price)
        setOrder({
            size: siz,
            price,
            extras: {
                green: checked[0],
                adding: checked[1],
                homeDelivery: checked[2],
                color: "Kolorystyka",
                address: ""
            },
            timeToMake: dayjs().add(1, 'day').format("D MMMM YYYY"),
            flowerShopName: "",
            roses: "",
            tulips: "",
        })
    }

    const handleChange = (event, i) => {
        const {value, checked: isChecked} = event.target;

        // Skopiuj tablicę checked, aby nie modyfikować oryginalnej tablicy bezpośrednio
        const updatedChecked = [...checked];

        // Aktualizuj stan odpowiedniego pola wyboru na podstawie jego wartości
        updatedChecked[i] = isChecked;
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
                homeDelivery,
            },
            price: newSuma
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

    // const handleRemove = () => {
    //     console.log(bouquetContent)
    //     setBouquetContent(prevState => {
    //             return prevState.slice(0, -1);
    //         }
    //     )
    // };

    const styl = (angle, reverse) => {
        const an = reverse ? -1 * angle : 1 * angle
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
        const newArr = new Array(e.target.value).fill(pic);
        const s = shuffleArray(newArr);
        setTulips(e.target.value)
        setBouquetContent(s)
    }
    const handleRose = e => {
        const newArr = new Array(e.target.value).fill(pic2);
        const s = shuffleArray(newArr);
        setRoses(e.target.value)
        setBouquetContent(s)
    }

    const handleAdd = () => {
        console.log(order.extras.color)
        if (checked[2] === false) {
            if (order.timeToMake.length !== 0
                && order.extras.color !== "Kolorystyka"
                && order.flowerShopName.length !== 0) {
                // Dodaj nowy obiekt (Order) do tablicy
                existingOrders.push(order);

                // Zapisz zaktualizowaną tablicę z powrotem do localStorage
                localStorage.setItem('myObject', JSON.stringify(existingOrders));

                setMessage("Bukiet dodano do koszyka!")
                setOpen(false);
            } else {
                setError(true)
            }
        } else {
            if (order.timeToMake.length !== 0
                && order.extras.color !== "Kolorystyka"
                && order.flowerShopName.length !== 0
                && order.extras.address.length !== 0) {
                // Dodaj nowy obiekt (Order) do tablicy
                existingOrders.push(order);

                // Zapisz zaktualizowaną tablicę z powrotem do localStorage
                localStorage.setItem('myObject', JSON.stringify(existingOrders));

                setMessage("Bukiet dodano do koszyka!")
                setOpen(false);
            } else {
                setError(true)
            }
        }
    }

    return (
        <Box sx={{mt: 1}} className="container">
            <Grid container spacing={1} className="container__grid">
                <Grid xs={12} sm={6} md={4} className="container__grid__item scale">
                    <Paper className={"container__grid__item__paper scale"} elevation={5}
                           onClick={() => handlePop(40, "Mały Bukiet")}>
                        <img className={"container__grid__item__paper__img paper__img"}
                             src={"https://i.pinimg.com/564x/d2/24/ff/d224ffe28275212011f7ee3a70d117fd.jpg"}
                             alt={"flower"}/>
                        <Typography variant="h6" component="h6" className={"container__grid__item__paper__text"}
                                    sx={{textAlign: "center", pb: 2}}>
                            Mały Bukiet
                        </Typography>
                    </Paper>
                </Grid>
                <Grid xs={12} sm={6} md={4} className={"container__grid__item scale"}>
                    <Paper className={"container__grid__item__paper scale"} elevation={5}
                           onClick={() => handlePop(80, "Średni Bukiet")}>
                        <img className={"container__grid__item__paper__img paper__img"} src={med} alt={"flower"}/>
                        <Typography variant="h6" component="h6" className={"container__grid__item__paper__text"}
                                    sx={{textAlign: "center", pb: 2}}>
                            Średni Bukiet
                        </Typography>
                    </Paper>
                </Grid>
                <Grid xs={12} sm={6} md={4} className={"container__grid__item scale"}>
                    <Paper className={"container__grid__item__paper scale"} elevation={5}
                           onClick={() => handlePop(120, "Duży Bukiet")}>
                        <img className={"container__grid__item__paper__img paper__img"}
                             src={"https://i.pinimg.com/564x/90/1e/82/901e8203d0fc06a9b05b6ea97d1817a1.jpg"}
                             alt={"flower"}/>
                        <Typography variant="h6" component="h6" className={"container__grid__item__paper__text"}
                                    sx={{textAlign: "center", pb: 2}}>
                            Duży Bukiet
                        </Typography>
                    </Paper>
                </Grid>
                {/*<Grid xs={12} sm={6} md={4} className={"scale"}>*/}
                {/*    <Paper elevation={5}*/}
                {/*        // onClick={() => {*/}
                {/*        //     setIsCustom(true)*/}
                {/*        //     handlePop(0)*/}
                {/*        // }}*/}
                {/*           className={"inProgress"}*/}
                {/*    >*/}
                {/*        /!*<img className={"paper__img"}*!/*/}
                {/*        /!*     src={"https://i.pinimg.com/564x/be/c2/06/bec206fd20dfa9c33efaf444f0b733d4.jpg"}*!/*/}
                {/*        /!*     alt={"flower"}/>*!/*/}
                {/*        <img className={"inProgress--img"}*/}
                {/*             src={"https://cdn-icons-png.flaticon.com/512/5229/5229377.png"}*/}
                {/*             alt={"flower"}/>*/}
                {/*        <Typography variant="h6" component="h6" sx={{textAlign: "center", pb: 2}}>*/}
                {/*            Custom*/}
                {/*        </Typography>*/}
                {/*    </Paper>*/}
                {/*</Grid>*/}
            </Grid>
            {/*////////////// Modal*/}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="modal"
            >
                <Box className="modal__content" sx={{width: {xs: "90vw", md: "70vw"}}}>
                    <Box className={"modal__content__header flex"}>
                        <IconButton onClick={handleClose} className="modal__content__header__close-button">
                            <CloseIcon/>
                        </IconButton>
                        <Typography className={"modal__content__header__text align highlight"} variant="h6" component="h3"
                                    sx={{textAlign: "center"}}>
                            {size}
                        </Typography>
                    </Box>
                    <Autocomplete
                        disablePortal
                        className="modal__content__autocomplete"
                        id="combo-box-demo"
                        options={owners.map(item => item.company)}
                        renderInput={(params) => <TextField className={"width"} {...params} label="Kwiaciarnia"/>}
                        value={flowerShopName}
                        onChange={(e, newValue) => {
                            setFlowerShopName(newValue); // Aktualizuj wartość flowerShopName
                            setOrder({
                                ...order,
                                flowerShopName: newValue // Aktualizuj stan Order
                            });
                        }}
                    />
                    <Select
                        labelId="demo-simple-select-label"
                        className="modal__content__select"
                        id="demo-simple-select"
                        value={order.extras.color}
                        onChange={e => {
                            setOrder({
                                ...order,
                                extras: {
                                    ...order.extras,
                                    color: e.target.value
                                }
                            })
                        }}>
                        <MenuItem disabled value="Kolorystyka" className="modal__content__select-option">Kolorystyka</MenuItem>
                        <MenuItem value={"różowy"} className="modal__content__select-option">różowy</MenuItem>
                        <MenuItem value={"czerwony"} className="modal__content__select-option">czerwony</MenuItem>
                        <MenuItem value={"fioletowy"} className="modal__content__select-option">fioletowy</MenuItem>
                    </Select>
                    <Box sx={{fontSize: {xs: "14px", sm: "inherit"}}} className="modal__content__options">
                        <Grid container alignItems="center" className="modal__content__options__grid">
                            <Grid item className="modal__content__options__grid__item_checkbox">
                                <FormControlLabel className="modal__content__options__grid__item_checkbox__form"
                                    control={<Checkbox checked={checked[0]} className="modal__content__options__grid__item_checkbox__form__ckeckbox" onChange={(event) => handleChange(event, 0)}
                                                       value={values[0]}/>}
                                />
                            </Grid>
                            <Grid item className="modal__content__options__grid__item_text">
                                <label>+5 zł przybranie</label>
                            </Grid>
                        </Grid>
                        <Grid container alignItems="center" className="modal__content__options__grid">
                            <Grid item className="modal__content__options__grid__item_checkbox">
                                <FormControlLabel className="modal__content__options__grid__item_checkbox__form"
                                    control={<Checkbox checked={checked[1]} className="modal__content__options__grid__item_checkbox__form__ckeckbox" onChange={(event) => handleChange(event, 1)}
                                                       value={values[1]}/>}/>
                            </Grid>
                            <Grid item className="modal__content__options__grid__item_text">
                                <label className="modal__content__options__grid__item_text__label">+2 zł wstążka</label>
                            </Grid>
                        </Grid>
                        <Grid container alignItems="center" className="modal__content__options__grid">
                            <Grid item className="modal__content__options__grid__item_checkbox">
                                <FormControlLabel className="modal__content__options__grid__item_checkbox__form"
                                    control={<Checkbox checked={checked[2]} className="modal__content__options__grid__item_checkbox__form__ckeckbox" onChange={(event) => handleChange(event, 2)}
                                                       value={values[2]}/>}/>
                            </Grid>
                            <Grid item className="modal__content__options__grid__item_text">
                                <label className="modal__content__options__grid__item_text__label">+20zł Dostawa do domu</label>
                            </Grid>
                        </Grid>
                    </Box>
                    {checked[2] && <TextField id="outlined-basic"
                                              className="modal__address-input"
                                              label="Na jaki adres ma być dostawa?"
                                              variant="outlined"
                                              value={order.extras.address}
                                              onChange={e => {
                                                  setOrder({
                                                      ...order,
                                                      extras: {
                                                          ...order.extras,
                                                          address: e.target.value
                                                      }
                                                  })
                                              }}/>}
                    <MyDatePicker order={order} setOrder={setOrder} className="modal__date-picker"/>
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
                                <div key={i} style={{position: "relative"}}>
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
                    {error && <Alert severity="error">Popraw puste pola!</Alert>}
                    <Box className={"modal__content__footer flexa"}>
                        <span>
                            <span>Suma: </span>
                            <span className={"highlight"}>{suma} zł</span>
                         </span>
                        <Button variant="contained" onClick={handleAdd}
                        >Dodaj do koszyka</Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}