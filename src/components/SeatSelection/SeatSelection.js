import React, { useState, useRef, useEffect } from 'react';
import { Button, Container, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  confirmationContainer: {
    border: '2px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    marginTop: '16px',
  },
  confirmationTitle: {
    marginBottom: '16px',
  },
  confirmationInfo: {
    marginBottom: '8px',
  },
  confirmationMessage: {
    fontWeight: 'bold',
  },
}));

const SeatSelection = ({ selectedFlight }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengerName, setPassengerName] = useState('');
  const [passengerEmail, setPassengerEmail] = useState('');
  const seatSelectionRef = useRef(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const classes = useStyles();

  const handleSeatSelection = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((selectedSeat) => selectedSeat !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleBookingConfirmation = () => {
    setBookingConfirmed(true);
  };

  useEffect(() => {
    if (seatSelectionRef.current) {
      seatSelectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedSeats]);

  if (bookingConfirmed) {
    return (
      <Container maxWidth="sm" className={classes.confirmationContainer}>
        <h2 className={classes.confirmationTitle}>Booking Confirmation</h2>
        <p className={classes.confirmationInfo}>
          Flight: {selectedFlight.from} to {selectedFlight.to}
        </p>
        <p className={classes.confirmationInfo}>Departure: {selectedFlight.departure}</p>
        <p className={classes.confirmationInfo}>Selected Seats: {selectedSeats.join(', ')}</p>
        <p className={classes.confirmationInfo}>Passenger Name: {passengerName}</p>
        <p className={classes.confirmationInfo}>Passenger Email: {passengerEmail}</p>
        <p className={classes.confirmationMessage}>
          Booking confirmed! Thank you for your reservation.
        </p>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <h2>Seat Selection</h2>
      <p>
        Flight: {selectedFlight.from} to {selectedFlight.to}
      </p>
      <p>Departure: {selectedFlight.departure}</p>
      <p>Select your seats:</p>
      <Grid container spacing={2}>
        {selectedFlight.seats.map((seat) => (
          <Grid item key={seat.number}>
            <Button
              onClick={() => handleSeatSelection(seat.number)}
              variant="contained"
              color={selectedSeats.includes(seat.number) ? 'primary' : 'default'}
              disabled={!seat.available || selectedSeats.length >= 4}
              fullWidth
            >
              {seat.number}
            </Button>
          </Grid>
        ))}
      </Grid>
      <TextField
        label="Passenger Name"
        value={passengerName}
        onChange={(e) => setPassengerName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Passenger Email"
        value={passengerEmail}
        onChange={(e) => setPassengerEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        onClick={handleBookingConfirmation}
        disabled={selectedSeats.length === 0 || !passengerName || !passengerEmail}
        variant="contained"
        color="primary"
        fullWidth
      >
        Book Seats
      </Button>
      <div ref={seatSelectionRef} />
    </Container>
  );
};

export default SeatSelection;
