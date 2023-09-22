import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Review from './Review';
import {PaymentForm} from "./PaymentForm";
import {AddressForm} from "./AddressForm";
import {addDoc} from "firebase/firestore";
import {colRefOrders} from "../../Firebase/Firebase";
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import MyContext from "../../../myContext";
import validator from 'validator';
import "./checkout.scss"

const steps = ['Dane kontaktowe', 'Metoda płatności', 'Podsumowanie'];

function getStepContent(step) {

    switch (step) {
        case 0:
            return <AddressForm/>;
        case 1:
            return <PaymentForm/>;
        case 2:
            return <Review/>;
        default:
            throw new Error('Unknown step');
    }
}

export const Checkout = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [error, setError] = useState(false)
    const {payment, address} = useContext(MyContext)
    const navigate = useNavigate()

    const handleNext = () => {
        console.log(activeStep)
        if (activeStep === 0) {
            if (address.name.length !== 0
                && address.lastname.length !== 0
                && address.address.length !== 0
                && address.city.length !== 0
                && address.state.length !== 0
                && address.postal.length !== 0
                && address.country.length !== 0
            ) {
                setError(false)
                setActiveStep(activeStep + 1);
            } else {
                setError(true)
            }
        }
        if (activeStep === 1) {
            if (payment.name.length !== 0
                && payment.cardNumber.length !== 0
                && validator.isNumeric(payment.cardNumber)
                && payment.expirationDate.length !== 0
                && payment.cvv.length !== 0
                && validator.isNumeric(payment.cvv)
            ) {
                setError(false)
                setActiveStep(activeStep + 1);
            } else {
                setError(true)
            }
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleSend = () => {
        let data = [];
        try {
            data = JSON.parse(localStorage.getItem('myObject')) || []
            addDoc(colRefOrders, {data})
                .then(() => {
                    alert(`Zamówienie złożono`);
                    localStorage.clear();
                    navigate("/")
                })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <React.Fragment>
            <Paper variant="outlined"
                   sx={{my: {xs: 1, md: 2}, p: {xs: 2, md: 3}}}
            >
                <Stepper activeStep={activeStep} sx={{pt: 3, pb: 5}}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <React.Fragment>
                    {getStepContent(activeStep)}
                    {error && <h1 className={"error"}>Uzupełnij/Popraw puste pola!</h1>}
                    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                        {activeStep !== 0 && (
                            <Button onClick={handleBack} sx={{mt: 3, ml: 1}}>
                                Cofnij
                            </Button>
                        )}
                        {activeStep === steps.length - 1 ?
                            <Button
                                variant="contained"
                                onClick={handleSend}
                                sx={{mt: 3, ml: 1}}
                            >
                                Zamów
                            </Button>
                            :
                            <Button
                                variant="contained"
                                onClick={handleNext}
                                sx={{mt: 3, ml: 1}}
                            >
                                Dalej
                            </Button>
                        }
                    </Box>
                </React.Fragment>
            </Paper>
        </React.Fragment>
    );
}