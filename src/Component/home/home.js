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
                {items.map((item) => (
                    <Grid key={item} xs={12} sm={6} md={4}>
                        <Tilt options={tiltOptions}>
                            <Paper>
                                <Link to={`/${item}`} className={"mid"}>
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
