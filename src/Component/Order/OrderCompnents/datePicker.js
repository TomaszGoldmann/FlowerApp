import * as React from 'react';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function FirstComponent({order, setOrder}) {
    const handleDateChange = (newDate) => {
        setOrder({
            ...order,
            timeToMake: newDate.$d
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
