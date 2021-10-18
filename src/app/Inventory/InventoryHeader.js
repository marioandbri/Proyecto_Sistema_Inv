import React, {
  useCallback,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import Filter from "../Filter";
import { useFetch } from "../useFetch";
import { useFilter } from "../useFilter";
import { useProductTypes } from "../useProductTypes";

import { useDispatch, useInventory } from "./InventoryProvider";
import { type } from "./InventoryReducer";

const InventoryHeader = () => {
  const { loading: loadingTypes, data: options } = useProductTypes();
  const { loading: loadingClientes, data: clientesData } = useFetch("/cliente");
  const [url, setUrl] = useState("");
  const notification = useRef();
  const closeNotification = () => {
    notification.current.classList.add("is-hidden");
  };

  const [query, setQuery] = useState("");
  const state = useInventory();
  const dispatch = useDispatch();
  // console.log(state, dispatch);
  const dataFiltered = useFilter(query, clientesData);
  const result = dataFiltered.splice(0, 10);
  const { loading: loadingProducts, data: productData } = useFetch(url);

  const selectProductType = (e) => {
    console.log(e.target.value);
    dispatch({ type: type.selectProductType, payload: e.target.value });
  };

  const selectClient = (e) => {
    console.log(e.rut);
    setQuery(e.razonsocial);
    dispatch({ type: type.selectClient, payload: e.rut });
  };
  return (
    <>
      <div className="box mb-1">
        <nav className="level">
          <div className="level-left">
            <div className="field has-addons">
              <Filter setQuery={setQuery} />
              <div className="control">
                <a
                  className={`button ${
                    loadingClientes ? "is-loading" : "is-hidden"
                  }`}
                >
                  <span className="icon">
                    <i className="fas fa-spinner"></i>
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div className="level-right">
            <div className="buttons">
              <a
                onClick={() =>
                  selectClient({
                    rut: "78507660-5",
                    razonsocial: "Servicios e Inversiones Arrienda Ltda",
                  })
                }
                className="button"
              >
                Ingreso
              </a>
              <a className="button">Retiro</a>
            </div>
          </div>
        </nav>
      </div>
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
                  onClick={(event) => {
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

      <div className="box">
        <div className="columns">
          <div className="column">
            <div
              className="field is-grouped is-grouped-multiline"
              style={{ maxWidth: "fit-content" }}
            >
              <div className="control block">
                <label className="label">Rut Proveedor</label>
                <input
                  readOnly
                  disabled
                  type="text"
                  className="input is-small"
                  value={state.rutProveedor}
                />
              </div>

              <div className="control block ">
                <label className="label">Fecha de Compra</label>
                <div className="control has-icons-right">
                  <input
                    onChange={(e) => {
                      dispatch({
                        type: type.fechaCompra,
                        payload: e.target.value,
                      });
                    }}
                    type="date"
                    placeholder="dd-mm-yyyy"
                    className="input is-small"
                    value={state.fechaCompra}
                  />
                  <span className="icon is-small is-right">
                    <i className="fas fa-calendar-alt"></i>
                  </span>
                </div>
              </div>

              <div className="control block">
                <label className="label">Numero de Factura</label>
                <input
                  onChange={(e) => {
                    dispatch({
                      type: type.numeroFactura,
                      payload: e.target.value,
                    });
                  }}
                  type="text"
                  className="input is-small"
                  value={state.numeroFactura}
                />
              </div>
            </div>
            {/* /////////////// */}
            <label className="label">Numero de Parte</label>
            <div
              className="field has-addons"
              style={{ maxWidth: "fit-content" }}
            >
              <span className="control">
                <input
                  onChange={(e) => {
                    dispatch({ type: type.setPN, payload: e.target.value });
                  }}
                  type="list"
                  className="input is-small "
                  value={state.partNumber}
                />
              </span>
              <div className="control">
                <a
                  onClick={() => {
                    setUrl(
                      `/producto/${state.tipoProducto}/partnumber/${state.partNumber}`
                    );
                    notification.current.classList.remove("is-hidden");
                  }}
                  className="button is-info is-small"
                >
                  Buscar
                </a>
              </div>
            </div>
          </div>
          <div className="column">
            {/* ///////// NOTIFICATION ///////// */}
            <div
              ref={notification}
              // style={{ width: "60%" }}
              className="message is-info is-small mx-3 inventory-notification is-hidden"
            >
              <div className="message-header">
                <p>Nombre Equipo</p>
                <button
                  onClick={() => {
                    closeNotification();
                  }}
                  className="delete is-small"
                ></button>
              </div>
              <div className="message-body">
                {!loadingProducts ? productData.toString() : "vacio"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InventoryHeader;
