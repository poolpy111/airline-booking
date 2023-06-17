import React, { useState, useEffect, useContext } from 'react';
import { FlightsContext } from '../../context/FlightsContext';
import FlightList from '../../components/FlightList/FlightList';
import { Button, Container, FormControl, Grid, InputLabel, Select, TextField } from '@material-ui/core';

const FlightSearch = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departure, setDeparture] = useState('');
  const [fromCities, setFromCities] = useState([]);
  const [toCities, setToCities] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [ticketsNotFound, setTicketsNotFound] = useState(false);

  const { flights, setFilteredFlights } = useContext(FlightsContext);

  useEffect(() => {
    if (flights) {
      let fromCitiesSet = new Set(flights.map((flight) => flight.from));
      let toCitiesSet = new Set(flights.map((flight) => flight.to));
      setFromCities([...fromCitiesSet]);
      setToCities([...toCitiesSet]);
    }
  }, [flights]);

  const handleSearch = (event) => {
    event.preventDefault();
    if (!from || !to) {
      setTicketsNotFound(true);
      setShowResults(true);
      return;
    }
    const result = flights.filter(
      (flight) =>
        flight.from.toLowerCase() === from.toLowerCase() &&
        flight.to.toLowerCase() === to.toLowerCase() &&
        flight.departure.includes(departure)
    );
    setFilteredFlights(result);
    setShowResults(true);
    setTicketsNotFound(result.length === 0);
  };

  return (
    <Container maxWidth="sm">
      <h1>Search for Flights</h1>
      <form onSubmit={handleSearch}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="from-select">From</InputLabel>
              <Select
                native
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                label="From"
                inputProps={{
                  name: 'from',
                  id: 'from-select',
                }}
              >
                <option value=""></option>
                {fromCities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="to-select">To</InputLabel>
              <Select
                native
                value={to}
                onChange={(e) => setTo(e.target.value)}
                label="To"
                inputProps={{
                  name: 'to',
                  id: 'to-select',
                }}
              >
                <option value=""></option>
                {toCities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="date"
              variant="outlined"
              fullWidth
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              label="Departure"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Search
            </Button>
          </Grid>
        </Grid>
      </form>

      {showResults && (
        <Container maxWidth="sm">
          {ticketsNotFound ? (
            <p>No tickets found.</p>
          ) : (
            <FlightList />
          )}
        </Container>
      )}
    </Container>
  );
};

export default FlightSearch;
