import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/pl';
import TextField from '@mui/material/TextField';

export default function MyDatePicker({ order, setOrder }) {
    const [selectedDate, setSelectedDate] = React.useState(dayjs().add(1, 'day'));

    const handleDateChangeWrapper = (date) => {
        const formattedDate = date.format("D MMMM YYYY");

        setSelectedDate(date);
        setOrder({
            ...order,
            timeToMake: formattedDate,
        });
    };

    const minDate = dayjs().add(1, 'day').startOf('day');

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
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
