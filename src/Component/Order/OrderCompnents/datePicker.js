import * as React from 'react';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function FirstComponent({order, setOrder}) {
    const handleDateChange = (newDate) => {
        const date = new Date(newDate.$d);

        const day = date.getDate(); // Pobieramy dzień (1-31)
        const month = date.toLocaleString('default', { month: 'long' }); // Pobieramy nazwę miesiąca
        const year = date.getFullYear(); // Pobieramy rok

        const formattedDate = `${day} ${month} ${year}`;
        console.log(formattedDate); // Wyświetli sformatowaną datę: "28 September 2023"

        setOrder({
            ...order,
            timeToMake: formattedDate
        });
    };

    const minDate = dayjs().add(1, 'day').startOf('day');

    const monthNames = [
        'Styczeń',
        'Luty',
        'Marzec',
        'Kwiecień',
        'Maj',
        'Czerwiec',
        'Lipiec',
        'Sierpień',
        'Wrzesień',
        'Październik',
        'Listopad',
        'Grudzień',
    ];

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker value={order.timeToMake}
                        onChange={e => handleDateChange(e)}
                        disablePast
                        minDate={minDate}
                        dateFormat="DD/MM/YYYY"
                        monthNames={monthNames}
            />
        </LocalizationProvider>
    );
}
