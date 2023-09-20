import React, {createContext, useContext, useEffect, useState} from 'react';
import MyContext from "../myContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {app} from "./firebase/firebase";

// const UserContext = createContext(null)

const MyProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [payment, setPayment] = useState({
        name: "",
        cardNumber: "",
        expirationDate: "",
        cvv: "",
    })
    const [address, setAddress] = useState({
        name: "",
        lastname: "",
        address: "",
        city: "",
        state: "",
        postal: "",
        country: "",
    })

    const items = ["Zamów bukiet!", 'Home', 'About', 'Contact'];
    const flowers = []

    useEffect(() => {
        const auth = getAuth(app);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
        });
    }, [])

    for (let i = 1; i < 14; i++) {
        flowers[i] = require(`../assets/${i}.jpg`);
    }

    const values = {
        user,
        setUser,
        payment,
        setPayment,
        address,
        setAddress,
        items,
        flowers
    }

    return (
        <MyContext.Provider value={values}>
            {children}
        </MyContext.Provider>
    );
};

export default MyProvider;
export const useUser = () => useContext(MyContext)