import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/pl';
import TextField from '@mui/material/TextField';
import {useEffect} from "react";

export default function MyDatePicker({ order, setOrder }) {
    dayjs.locale('pl');

    useEffect(() => {
        dayjs.locale('pl');
    }, []);

    const [selectedDate, handleDateChange] = React.useState(dayjs().add(1, 'day'));

    const handleDateChangeWrapper = (date) => {
        handleDateChange(date);

        const formattedDate = date.format('DD/MM/YYYY');

        setOrder({
            ...order,
            timeToMake: formattedDate,
        });
    };

    const minDate = dayjs().add(1, 'day').startOf('day');

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label="Na kiedy chcesz swoje zamówienie?"
                value={selectedDate}
                onChange={handleDateChangeWrapper}
                format="DD/MM/YYYY"
                minDate={minDate}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}
