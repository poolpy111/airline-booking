import React, { createContext, useState } from "react";
import data from "../data/data.json";

export const FlightsContext = createContext();

export const FlightsProvider = (props) => {
  const [flights, setFlights] = useState(data);
  const [filteredFlights, setFilteredFlights] = useState(flights); // Initialize filteredFlights with the complete list of flights

  return (
    <FlightsContext.Provider value={{ flights, setFlights, filteredFlights, setFilteredFlights }}>
      {props.children}
    </FlightsContext.Provider>
  );
};
