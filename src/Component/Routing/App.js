import React from "react";
import './app.scss';
import Container from '@mui/material/Container';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import {Home} from "../Home/Home";
import {Order} from "../Order/Order";
import {Contact} from "../Contact/Contact";
import ElevateAppBar from "../Navigation/Navigation";
import MyProvider from "../Provider";
import {Login} from "../Login/Login";
import {SignUp} from "../Login/SignUp/SignUp";
import {Store} from "../Summary/store";
import {About} from "../About/About";
import {Checkout} from "../Summary/checkout/Checkout";
import {PaymentForm} from "../Summary/checkout/PaymentForm";
import {Orders} from "../Orders/Orders";
import {PrivateRoute} from "./PrivateRoute";

function App() {
    return (
        <Router>
            <MyProvider>
                <Container className="App">
                    <ElevateAppBar/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/Zamów bukiet!" element={<Order/>}/>
                        <Route path="/o nas" element={<About/>}/>
                        <Route path="/kontakt" element={<Contact/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/orders" element={<Orders/>}/>
                        <Route path="/cashout" element={<Store/>}/>
                        <Route path="/cashout/checkout" element={<PrivateRoute><Checkout/></PrivateRoute>}/>
                        <Route path="/cashout/paymentForm" element={<PaymentForm/>}/>
                        <Route path="/login/signup" element={<SignUp/>}/>
                        <Route path="/*" element={<Home/>}/> {/* Domyślna ścieżka */}
                    </Routes>
                    <footer className="footer">
                        <p className="footer__copy">Flower App by Tomasz Goldmann &copy; 2023</p>
                    </footer>
                </Container>
            </MyProvider>
        </Router>
    );
}

export default App;
