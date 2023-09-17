import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Review from './Review';
import {PaymentForm} from "./PaymentForm";
import {AddressForm} from "./AddressForm";

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

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleSend = () => {

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
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography variant="h5" gutterBottom>
                            Thank you for your order.
                        </Typography>
                        <Typography variant="subtitle1">
                            Your order number is #2001539. We have emailed your order
                            confirmation, and will send you an update when your order has
                            shipped.
                        </Typography>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        {getStepContent(activeStep)}
                        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                            {activeStep !== 0 && (
                                <Button onClick={handleBack} sx={{mt: 3, ml: 1}}>
                                    Back
                                </Button>
                            )}
                            {activeStep === steps.length - 1 ?
                                <Button
                                    variant="contained"
                                    onClick={handleSend}
                                    sx={{mt: 3, ml: 1}}
                                >
                                    Place order
                                </Button>
                                :
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{mt: 3, ml: 1}}
                                >
                                    Next
                                </Button>
                            }
                        </Box>
                    </React.Fragment>
                )}
            </Paper>
        </React.Fragment>
    );
}