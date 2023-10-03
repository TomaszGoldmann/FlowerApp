import React, {useContext, useState} from 'react';
import {Typography, TextField, Button} from "@mui/material";
import "./newsletter.scss"
import {addDoc, collection} from "firebase/firestore";
import {db} from "../../Firebase/Firebase";
import MyContext from "../../../myContext";

export const NewsletterSection = () => {
    const [email, setEmail] = useState('');
    const {setMessage} = useContext(MyContext)

    const colRefNewsletter = collection(db, 'newsletter')

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubscribe = () => {
        addDoc(colRefNewsletter, {email})
            .then(() => {
                setEmail("")
                setMessage("Pomyślnie zapisano do newsletter'a!")
            })
    };

    return (
        <section className={"newsletterSection"}>
            <Typography variant="h4" className={"heading"} gutterBottom>
                Zapisz się do newslettera
            </Typography>
            <Typography variant="body1" gutterBottom>
                Bądź na bieżąco z naszymi aktualnościami i ofertami specjalnymi. Zapisz się do newslettera, aby
                otrzymywać najnowsze informacje bezpośrednio na swój adres e-mail.
            </Typography>
            <TextField
                className={"inputField"}
                variant="outlined"
                fullWidth
                label="Adres e-mail"
                value={email}
                onChange={handleEmailChange}
                sx={{m: "15px 0"}}
            />
            <Button
                variant="contained"
                className={"subscribeButton"}
                onClick={handleSubscribe}
                sx={{m: "0 auto"}}
            >
                Subskrybuj
            </Button>
        </section>
    )
}