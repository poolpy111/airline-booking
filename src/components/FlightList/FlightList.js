import React, { useContext, useState } from 'react';
import { FlightsContext } from '../../context/FlightsContext';
import SeatSelection from '../../components/SeatSelection/SeatSelection';
import { Button, Container, Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  flightCard: {
    border: '1px solid #ccc',
    borderRadius: theme.spacing(2),
    padding: theme.spacing(2),
  },
  selectButton: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
  },
}));

const FlightList = () => {
  const { flights, filteredFlights } = useContext(FlightsContext);
  const displayFlights = filteredFlights.length > 0 ? filteredFlights : flights;
  const [selectedFlight, setSelectedFlight] = useState(null);
  const classes = useStyles();

  const handleFlightSelection = (flight) => {
    setSelectedFlight(flight);
  };

  return (
    <Container maxWidth="md">
      <h2>Flight Results</h2>
      {!flights ? (
        <p>Loading...</p>
      ) : displayFlights.length === 0 ? (
        <p>No flights found.</p>
      ) : (
        <Grid container spacing={2}>
          {displayFlights.map((flight, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Box className={classes.flightCard}>
                <h3>Flight {index + 1}</h3>
                <p>From: {flight.from}</p>
                <p>To: {flight.to}</p>
                <p>Departure: {flight.departure}</p>
                <div className={classes.selectButton}>
                  <Button variant="contained" color="primary" onClick={() => handleFlightSelection(flight)}>
                    Select Flight
                  </Button>
                </div>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
      {selectedFlight && <SeatSelection selectedFlight={selectedFlight} />}
    </Container>
  );
};

export default FlightList;
