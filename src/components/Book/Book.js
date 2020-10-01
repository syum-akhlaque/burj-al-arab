import React, { useContext, useState } from 'react';
//import 'date-fns';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import { Button } from '@material-ui/core';
import Bookings from '../Bookings/Bookings';

const Book = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [selectedDate, setSelectedDate] = useState({
        checkIN : new Date(),
        checkOut: new Date(),
     
    });
    console.log(selectedDate.checkIN);
    console.log(selectedDate.checkOut);


    const handleCheckInDate = (date) => {
        const newDate = {...selectedDate};
        newDate.checkIN = date;
        setSelectedDate(newDate);
    };
    const handleCheckOutDate = (date) => {
        const newDate = {...selectedDate};
        newDate.checkOut = date;
        setSelectedDate(newDate);
    };
    const handleBooking = ()=> {
        const newBooking = {...loggedInUser, ...selectedDate}
        fetch('http://localhost:5000/addBooking', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newBooking)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
    }
    
    const {bedType} = useParams();

    return (
        <div style={{textAlign: 'center'}}>
            <h1>Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
                <KeyboardDatePicker
                
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Check In Date"
                value={selectedDate.checkIN}
                onChange={handleCheckInDate}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                />
                <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Check Out Date"
                format="MM/dd/yyyy"
                value={selectedDate.checkOut}
                onChange={handleCheckOutDate}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                />
             
            </Grid>
            <Button onClick = {handleBooking} variant="contained" color="primary"> Book Now </Button>
            </MuiPickersUtilsProvider>
            <Bookings></Bookings>
        </div>
    );
};

export default Book;