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
import {Logo} from "../../Logo/Logo";
import "./navigation.scss"
import {Link, useNavigate} from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import {useContext, useEffect, useState} from "react";
import MyContext from "../../myContext";
import {getAuth, signOut} from "firebase/auth";
import {app} from "../Firebase/Firebase";
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const drawerWidth = 240;
const navItems = ["Zamów bukiet!", 'Home', 'O nas', 'kontakt'];

function ElevationScroll(props) {
    const {children, window} = props;
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
    const navigate = useNavigate()
    const {user, setUser, owners} = useContext(MyContext);
    const [content, setContent] = useState(null)
    const {window} = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignOut = () => {
        const auth = getAuth(app);
        signOut(auth).then(() => {
            setUser(null)
            setAnchorEl(null);
            navigate("/")
        }).catch((error) => {
            console.log(error.message)
        });
    }

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    useEffect(() => {
        setContent(null)
        if (user) {
            owners.forEach(owner => {
                if (user.displayName === owner) {
                    setContent(<Link className={"nav__btn"} to={`/orders`}>Zamówienia</Link>)
                }
            })
        }
    }, [user, owners])

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
                            <Link to={`/${item}`} style={{color: "inherit", textDecoration: "none", margin: "0 auto"}}>
                                <ListItemText primary={item}/>
                            </Link>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <React.Fragment>
            <CssBaseline/>
            <ElevationScroll {...props}>
                <AppBar component="nav" position={"sticky"} style={{borderRadius: "10px", marginTop: "10px"}}>
                    <Toolbar>
                        {/*Mobile DOWN*/}
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{mr: 2, display: {sm: 'none'}}}
                        >
                            {mobileOpen ? <CloseIcon/> : <MenuIcon/>}
                        </IconButton>
                        <IconButton
                            aria-label="open drawer"
                            edge="start"
                            sx={{display: {sm: 'none'}}}
                        >
                            {user ? <Typography
                                                id="basic-button"
                                                aria-controls={open ? 'basic-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={handleClick}>
                                    Hej, {user.displayName}!
                                </Typography> :
                                <AccountCircleIcon onClick={() => navigate("/Login")}/>}
                        </IconButton>
                        <Menu
                            id="basic-button"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'mobileMenu',
                            }}
                        >
                            <MenuItem onClick={handleSignOut}>Wyloguj</MenuItem>
                        </Menu>
                        <IconButton sx={{display: {sm: 'none'}}}>
                            <LocalGroceryStoreIcon onClick={() => navigate("/Summary")}/>
                        </IconButton>
                        {/*Mobile UP*/}
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{flexGrow: 1, display: {xs: 'none', sm: 'flex'}}}
                        >
                            <Tooltip title="Home" placement="bottom">
                                <Link className={"nav__logo"} to={"/"}>
                                    <Logo/>
                                </Link>
                            </Tooltip>
                            <Box className={"nav__login"} onClick={() => {
                                navigate("/Login")
                            }}>
                                <Tooltip title="Zaloguj" placement="bottom">
                                    <IconButton>
                                        {!user && <AccountCircleIcon sx={{width: "40px", height: "40px"}}/>}
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            {user &&
                                <Tooltip title="wyloguj" placement="bottom">
                                    <IconButton sx={{borderRadius: "20px", m: "10px"}}
                                                id="basic-button"
                                                aria-controls={open ? 'basic-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={handleClick}>
                                        Hej, {user.displayName}!
                                    </IconButton>
                                </Tooltip>
                            }
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleSignOut}>Wyloguj</MenuItem>
                            </Menu>
                            <Tooltip title="Koszyk" placement="bottom">
                                <Link to={"/Summary"} className={"nav__login"}>
                                    <IconButton>
                                        <LocalGroceryStoreIcon sx={{width: "40px", height: "40px"}}/>
                                    </IconButton>
                                </Link>
                            </Tooltip>
                        </Typography>
                        <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                            {navItems.map((item) => (
                                <Link key={item} className={"nav__btn"} to={`/${item}`}>
                                    {item}
                                </Link>
                            ))}
                            {content}
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