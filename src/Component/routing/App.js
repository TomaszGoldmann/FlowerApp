import React from "react";
import './App.scss';
import Container from '@mui/material/Container';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import {Home} from "../home/home";
import {Order} from "../order/order";
import {Contact} from "../contact/contact";
import ElevateAppBar from "../navigation/navigation";
import MyProvider from "../provider";
import {Login} from "../login/login";
import {SignUp} from "../login/signUp/signUp";
import {Store} from "../cashout/store";
import {About} from "../about/about";

function App() {
    return (
        <Router>
            <MyProvider>
                <Container className="App">
                    <ElevateAppBar/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/Zamów bukiet!" element={<Order/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/contact" element={<Contact/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/cashout" element={<Store/>}/>
                        <Route path="/login/signup" element={<SignUp/>}/>
                        <Route path="/*" element={<Home/>}/> {/* Domyślna ścieżka */}
                    </Routes>
                </Container>
            </MyProvider>
        </Router>
    );
}

export default App;
