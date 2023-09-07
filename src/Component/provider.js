import React, {useState} from 'react';
import MyContext from "../myContext";
// import small from "../assets/ -2.jpg"
// import medium from "../assets/ -3.jpg"
// import big from "../assets/ -4.jpg"

const MyProvider = ({children}) => {
    const [items, setItems] = useState(["Zamów bukiet!", 'Home', 'About', 'Contact']);

    const values = {
        ...items
    }

    return (
        <MyContext.Provider value={values}>
            {children}
        </MyContext.Provider>
    );
};

export default MyProvider;