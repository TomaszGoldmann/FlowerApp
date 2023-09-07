import React, {useContext, useEffect, useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import MyContext from "../../myContext";
import Grid from '@mui/material/Unstable_Grid2';
import {Paper} from "@mui/material";
import {Tilt} from "react-tilt";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "./home.scss"
// import { Tilt } from 'react-tilt'
import small from "../../assets/ -2.jpg"
import medium from "../../assets/ -3.jpg"
import big from "../../assets/ -4.jpg"

export const Home = () => {
    const [selectedId, setSelectedId] = useState(null);

    const itemsObj = useContext(MyContext);
    const items = Object.values(itemsObj);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [isSticky, setIsSticky] = useState(false);
    const [pics, setPics] = useState([small, medium, big])

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

    const tiltOptions = {
        reverse:        false,  // reverse the tilt direction
        max:            20,     // max tilt rotation (degrees)
        perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
        scale:          1.1,    // 2 = 200%, 1.5 = 150%, etc..
        speed:          1000,   // Speed of the enter/exit transition
        transition:     true,   // Set a transition on enter/exit.
        axis:           null,   // What axis should be disabled. Can be X or Y.
        reset:          true,    // If the tilt effect has to be reset on exit.
        easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
    }

    return (
        <div style={{marginTop: "100px"}}>
            {/*<AnimatePresence>*/}
            {/*    {selectedId !== null && (*/}
            {/*        <Modal*/}
            {/*            open={open}*/}
            {/*            onClose={handleClose}*/}
            {/*            aria-labelledby="modal-modal-title"*/}
            {/*            aria-describedby="modal-modal-description"*/}
            {/*        >*/}
            {/*        <motion.div*/}
            {/*            key={selectedId}*/}
            {/*            layoutId={selectedId}*/}
            {/*            exit={{opacity: 0}}*/}
            {/*            className="centered-div"*/}
            {/*            style={style}*/}
            {/*        >*/}
            {/*            <motion.h5>{items[selectedId]}</motion.h5>*/}
            {/*            <motion.button onClick={() => {*/}
            {/*                setSelectedId(null)*/}
            {/*                setOpen(false)*/}
            {/*            }}>Zamknij</motion.button>*/}
            {/*        </motion.div>*/}
            {/*        </Modal>*/}
            {/*    )}*/}
            {/*</AnimatePresence>*/}

            <Grid container spacing={3}>
                {items.map((item, i) => (
                    <Grid xs={12} sm={6} md={4}>
                        <Tilt options={tiltOptions}>
                            <Paper>
                                <motion.div onClick={() => {
                                    setSelectedId(`${i}`)
                                    setOpen(true)
                                }} className={"paper"}>
                                    <div>
                                        <img src={pics[i]} alt={small} className={"img"}/>
                                    </div>
                                    <span>{items[i]}</span>
                                </motion.div>
                            </Paper>
                        </Tilt>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};
