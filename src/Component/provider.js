import React, {useState} from 'react';
import MyContext from "../myContext";

const MyProvider = ({children}) => {
    const [items, setItems] = useState(["Zamów bukiet!", 'Home', 'About', 'Contact']);

    const flowers = []

    for (let i = 1; i < 14; i++) {
        flowers[i] = require(`../assets/${i}.jpg`);
    }

    const values = {
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