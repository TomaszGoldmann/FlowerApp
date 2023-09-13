import React, {useContext} from 'react';
import {motion} from 'framer-motion';
import MyContext from "../../myContext";
import Grid from '@mui/material/Unstable_Grid2';
import {Button, Paper} from "@mui/material";
import {Tilt} from "react-tilt";
import ScrollCarousel from 'scroll-carousel-react';
import "./home.scss"
import Box from "@mui/material/Box";
import {Link} from "react-router-dom";
import {NewsletterSection} from "./newsletter";

export const Home = () => {
    const {items, flowers} = useContext(MyContext);
    const pics = ["https://i.pinimg.com/564x/cf/cd/a3/cfcda3e5999bc356bc679d0bdda7bcd0.jpg",
        "https://i.pinimg.com/564x/26/9b/91/269b91e9f54cf7fa7c9d8e7b9d8bcdd2.jpg",
        "https://images.pexels.com/photos/1458282/pexels-photo-1458282.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/16901383/pexels-photo-16901383/free-photo-of-woman-buying-flowers-in-shop.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"]

    const tiltOptions = {
        reverse: false,  // reverse the tilt direction
        max: 20,     // max tilt rotation (degrees)
        perspective: 1000,   // Transform perspective, the lower the more extreme the tilt gets.
        scale: 1.1,    // 2 = 200%, 1.5 = 150%, etc..
        speed: 1000,   // Speed of the enter/exit transition
        transition: true,   // Set a transition on enter/exit.
        axis: null,   // What axis should be disabled. Can be X or Y.
        reset: true,    // If the tilt effect has to be reset on exit.
        easing: "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
    }

    return (
        <div style={{marginTop: "10px"}}>
            <Box sx={{display: {xs: "none", md: "block"}}}>
                <ScrollCarousel
                    autoplay
                    autoplaySpeed={1}
                    speed={1}
                >
                    {flowers.map((flower) => (
                        <img key={flower} src={flower} alt={"bukiet"} className={"img"}/>
                    ))}
                </ScrollCarousel>
            </Box>
            <Grid container spacing={3} sx={{mt: "0px"}}>
                <Grid xs={12} sm={6} md={4}>
                    <NewsletterSection/>
                </Grid>
                {items.map((item, i) => (
                    <Grid key={item} xs={12} sm={6} md={4}>
                        <Tilt options={tiltOptions}>
                            <Paper>
                                <Link to={`/${item}`} className={"mid"}>
                                    <img className={"paper__img"} src={`${pics[i]}`} alt={"flower"}/>
                                    <motion.div className={"paper"}>
                                        <Button>{item}</Button>
                                    </motion.div>
                                </Link>
                            </Paper>
                        </Tilt>
                    </Grid>
                ))}
            </Grid>
            <footer className="footer">
                <p className="footer__copy">Flower App by Tomasz Goldmann &copy; 2023</p>
            </footer>
        </div>
    );
};
