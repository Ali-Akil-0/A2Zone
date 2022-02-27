import React, { createContext, useContext, useReducer } from "react";
// creating a data layer
export const StateContext = createContext();
// provide the data layer to all components
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// ePull info from the data layer
export const useStateValue = () => useContext(StateContext);
