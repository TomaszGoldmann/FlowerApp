import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import {Logo} from "../../Logo/logo";
import "./navigation.scss"
import {Link} from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const drawerWidth = 240;
const navItems = ["Zamów bukiet!", 'Home', 'About', 'Contact'];

function ElevationScroll(props) {
    const {children, window} = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default function ElevateAppBar(props) {
    const {window} = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{textAlign: 'center'}}>
            <Typography variant="h6" sx={{py: 2, backgroundColor: "#718c7f"}}>
                Menu
            </Typography>
            <Divider sx={{backgroundColor: "#718c7f"}}/>
            <List
                sx={{
                    background: 'linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(113,140,127,1) 100%)',
                    padding: 0, // Usuń domyślny padding dla List
                }}
            >
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{textAlign: 'center', padding: "20px"}}>
                            <ListItemText primary={item}/>
                        </ListItemButton>
                    </ListItem>
                ))}
                <ListItem disablePadding>
                    <ListItemButton sx={{textAlign: 'center', padding: "20px"}}>
                        <Link to={"/login"} className={"nav__login"}>
                            <ListItemText>
                                <AccountCircleIcon/>
                            </ListItemText>
                        </Link>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <React.Fragment>
            <CssBaseline/>
            <ElevationScroll {...props}>
                <AppBar component="nav">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{mr: 2, display: {sm: 'none'}}}
                        >
                            {mobileOpen ? <CloseIcon/> : <MenuIcon/>}
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{flexGrow: 1, display: {xs: 'none', sm: 'flex'}}}
                        >
                            <Link className={"nav__logo"} to={"/"}>
                                <Logo/>
                            </Link>
                            <Link to={"/login"} className={"nav__login"}>
                                <AccountCircleIcon/>
                            </Link>
                        </Typography>
                        <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                            {navItems.map((item) => (
                                <Link key={item} className={"nav__btn"} to={"/"}>
                                    {item}
                                </Link>
                            ))}
                        </Box>
                    </Toolbar>
                    <nav className={"nav"}>
                        <Drawer
                            container={container}
                            variant="temporary"
                            open={mobileOpen}
                            anchor={"right"}
                            onClose={handleDrawerToggle}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                            sx={{
                                display: {xs: 'block', sm: 'none'},
                                '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </nav>
                </AppBar>
            </ElevationScroll>
        </React.Fragment>
    );
}