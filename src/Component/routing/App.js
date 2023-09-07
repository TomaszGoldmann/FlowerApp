import React from "react";
import './App.scss';
import Container from '@mui/material/Container';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import {Home} from "../home/home";
import {Order} from "../order/order";
import {About} from "../aboout/about";
import {Contact} from "../contact/contact";
import ElevateAppBar from "../navigation/navigation";
import MyProvider from "../provider";
import {Login} from "../login/login";
import {SignUp} from "../login/signUp/signUp";

function App() {
    return (
        <Router>
            <MyProvider>
                <Container className="App">
                    <ElevateAppBar/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/order" element={<Order/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/contact" element={<Contact/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/login/signup" element={<SignUp/>}/>
                        <Route path="/*" element={<Home/>}/> {/* Domyślna ścieżka */}
                    </Routes>
                </Container>
            </MyProvider>
        </Router>
    );
}

export default App;
