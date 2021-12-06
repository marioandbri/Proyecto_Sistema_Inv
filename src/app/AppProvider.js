import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types'
import AppReducer, { initialState } from "./AppReducer"

export const AppContext = createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)

  return (
    <>
      <AppContext.Provider value={[state, dispatch]}>
        {children}
      </AppContext.Provider>
    </>
  );
}


export const useAppState = () => useContext(AppContext)[0];
export const useAppDispatch = () => useContext(AppContext)[1];

AppProvider.propTypes = {
  children: PropTypes.node
}

export default AppProvider;
