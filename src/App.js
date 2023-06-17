import React from 'react';
import { FlightsProvider } from './context/FlightsContext';
import FlightSearch from './components/FlightSearch/FlightSearch';
import { Container } from '@material-ui/core';

function App() {
  return (
    <FlightsProvider>
      <Container maxWidth="md">
        <FlightSearch />
      </Container>
    </FlightsProvider>
  );
}

export default App;
