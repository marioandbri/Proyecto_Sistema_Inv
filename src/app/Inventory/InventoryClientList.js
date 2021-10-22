import React from "react";
import { useFetch } from "../useFetch";
import { useFilter } from "../useFilter";

const InventoryClientList = ({ query, selectClient }) => {
  const { loading: loadingClientes, data: clientesData } = useFetch("/cliente");
  const dataFiltered = useFilter(query, clientesData);
  const result = dataFiltered.splice(0, 10);

  console.log("componente clientes renderizado");
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

export default React.memo(InventoryClientList);
