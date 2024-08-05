import axios from "axios";
import React, { useReducer, createContext } from 'react';

const initalState = {
  dailyOpening: null,
  averagePrice: null,
};

const ACTIONS = {
  SET_DAILY_OPENING: 'SET_DAILY_OPENING',
  SET_AVERAGE_PRICE: 'SET_AVERAGE_PRICE',
};

const OpeningPriceReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_DAILY_OPENING:
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
    dispatch({ type: ACTIONS.SET_DAILY_OPENING, payload: response.data.dailyOpening });
    dispatch({ type: ACTIONS.SET_AVERAGE_PRICE, payload: response.data.averagePrice });
  };


  return (
    <OpeningPriceContext.Provider value={{ state, dispatch, handleCalculateButton }}>
      {children}
    </OpeningPriceContext.Provider>
  );
};
