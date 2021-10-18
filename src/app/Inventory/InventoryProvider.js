import React, { createContext, useReducer, useContext } from "react";
import InventoryReducer, { initialInventory } from "./InventoryReducer";

const InventoryContext = createContext();

const InventoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(InventoryReducer, initialInventory);

  return (
    <>
      <InventoryContext.Provider value={[state, dispatch]}>
        {children}
      </InventoryContext.Provider>
    </>
  );
};

const useInventory = () => useContext(InventoryContext)[0];
const useDispatch = () => useContext(InventoryContext)[1];

export { InventoryContext, useInventory, useDispatch };
export default InventoryProvider;
