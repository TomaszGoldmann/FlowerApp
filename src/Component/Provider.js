import React, {useContext, useEffect, useState} from 'react';
import MyContext from "../myContext";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {app} from "./Firebase/Firebase";

// const UserContext = createContext(null)

const MyProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [owners, setOwners] = useState([])
    const [orders, setOrders] = useState([]);
    const [message, setMessage] = useState("")
    const [info, setInfo] = useState("")
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

    const items = ["Zamów bukiet!", 'About', 'Contact'];
    // const owners = ["Floris", "Kwiaty&Miut", "Dr.Bloom"];
    const flowers = []

    useEffect(() => {
        const auth = getAuth(app);
        onAuthStateChanged(auth, (userData) => {
            if (userData) {
                setUser(userData)
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
        message,
        setMessage,
        info,
        setInfo,
        owners,
        setOwners,
        orders,
        setOrders,
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