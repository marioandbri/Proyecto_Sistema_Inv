import React from "react";
import { useFetch } from "../useFetch";
import { useFilter } from "../useFilter";
import { useDispatch } from "./InventoryProvider";
import { type } from "./InventoryReducer";
import PropTypes from "prop-types";

const InventoryClientList = ({ query, selectClient }) => {
  const dispatch = useDispatch();
  const { loading: loadingClientes, data: clientesData } = useFetch("/cliente");
  const dataFiltered = useFilter(query, clientesData);
  const result = dataFiltered.splice(0, 10);
  React.useEffect(() => {
    dispatch({ type: type.LOADING_CLIENTES, payload: loadingClientes });
    return () => {};
  }, [loadingClientes]);

  return (
    <>
      <div
        // style={{ position: "absolute", zIndex: "10" }}
        className={`box mb-1 inv-filter-clients ${
          query == "" ? "is-hidden" : ""
        }`}
      >
        <table className="is-size-7 is-hoverable">
          <tbody>
            {result?.map((e) => (
              <tr key={e.rut}>
                <td
                  onClick={() => {
                    selectClient(e);
                  }}
                  className="is-clickable"
                >
                  {e.razonsocial}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

InventoryClientList.propTypes = {
  query: PropTypes.string,
  selectClient: PropTypes.func,
};

export default React.memo(InventoryClientList);
