import axios from "axios";
import React, { useReducer, createContext } from 'react';

const initalState = {
  dailyOpening: {},
  averagePrice: 0,
};

const ACTIONS = {
  SET_OPENING_PRICE: 'SET_OPENING_PRICE',
  SET_AVERAGE_PRICE: 'SET_AVERAGE_PRICE',
};

const OpeningPriceReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_OPENING_PRICE:
      return {
        ...state,
        dailyOpening: action.payload,
      };
    case ACTIONS.SET_AVERAGE_PRICE:
      return {
        ...state,
        averagePrice: action.payload,
      };
    default:
      return state;
  }
};

export const OpeningPriceContext = createContext(null);

export const OpeningPriceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(OpeningPriceReducer, initalState);

  const handleCalculateButton = async (startDate, endDate) => {
    const response = await axios.get('/api/average-opening', {
      params: {
        startDate,
        endDate,
      }
    });
    console.log(response.data);
  };


  return (
    <OpeningPriceContext.Provider value={{ state, dispatch, handleCalculateButton }}>
      {children}
    </OpeningPriceContext.Provider>
  );
};
