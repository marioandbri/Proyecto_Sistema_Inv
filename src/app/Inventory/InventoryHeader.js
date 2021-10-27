import React, {
  useCallback,
  useContext,
  useState,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { useParams } from "react-router-dom";
import Filter from "../Filter";
import { useFetch } from "../useFetch";
import { useFetchProductsApi } from "../useFetchProductsApi";
import { useFilter } from "../useFilter";
import { useProductTypes } from "../useProductTypes";
import InventoryClientList from "./InventoryClientList";

import { useDispatch, useInventory } from "./InventoryProvider";
import { type } from "./InventoryReducer";
import ProductCard from "./ProductCard";

const InventoryHeader = () => {
  let { id } = useParams();
  console.log(id, "operation url param");
  const state = useInventory();
  const dispatch = useDispatch();

  const notification = useRef();

  const [isPCardShown, setIsPCardShown] = useState(false);
  const [query, setQuery] = useState("");
  const [productPN, setProductPN] = useState("");
  const [nroFactura, setNroFactura] = useState("");
  const [fechaCompra, setFechaCompra] = useState("");

  const getProductData = async () => {
    const result = await fetch(`/producto/partnumber/${productPN}`);
    const data = await result.json();
    console.log(data);
    dispatch({ type: type.setProductData, payload: data });
  };

  const selectClient = useCallback((e) => {
    console.log(e.rut);
    setQuery(e.razonsocial);
    dispatch({ type: type.selectClient, payload: e.rut });
  }, []);

  const [imageUrl, setImageUrl] = useState("");

  // const getProductImage = async () => {
  //   // console.log(loading, data);
  //   // const result = await fetch(
  //   //   `https://publicapi.solotodo.com/products/?part_number=${productPN}`
  //   // );
  //   // const data = await result.json();
  //   // if (!loading) {
  //   //   setImageUrl(data.results[0]?.picture_url);
  //   // }
  // };

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
                    state.loading ? "is-loading" : "is-hidden"
                  }`}
                >
                  <span className="icon">
                    <i className="fas fa-spinner"></i>
                  </span>
                </a>
              </div>
            </div>
          </div>
          {/* <div className="level-right">
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
          </div> */}
        </nav>
      </div>
      <InventoryClientList query={query} selectClient={selectClient} />

      <div className="box">
        <div className="columns">
          <div className="column">
            <div
              className="field is-grouped is-grouped-multiline"
              style={{ maxWidth: "fit-content" }}
            >
              <div className="control block">
                <label className="label">
                  {state.operationType == "Ingreso"
                    ? "RUT Proveedor"
                    : "RUT Cliente"}
                </label>
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
                      setFechaCompra(e.target.value);
                    }}
                    type="date"
                    placeholder="dd-mm-yyyy"
                    className="input is-small"
                    value={fechaCompra}
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
                    setNroFactura(e.target.value);
                  }}
                  type="text"
                  className="input is-small"
                  value={nroFactura}
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
                    setProductPN(e.target.value.toUpperCase());
                  }}
                  type="list"
                  className="input is-small "
                  value={productPN}
                />
              </span>
              <div className="control">
                <a
                  onClick={() => {
                    getProductData();
                    dispatch({ type: type.setPN, payload: productPN });
                    // getProductImage();
                    // notification.current.classList.remove("is-hidden");
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
            {/* <div
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
                {console.log(Boolean(state.productData))}
                {state.productData?.description || (
                  <div
                    disabled
                    className="button is-danger is-small is-loading"
                  ></div>
                )}
              </div>
            </div> */}

            {/* ///////////////////////////////////// */}
            {Boolean(state.productData.item) ? (
              <ProductCard
                description={state.productData?.description || "vacio"}
                marca={state.productData?.item?.marca || "marca"}
                modelo={state.productData?.item?.modelo}
                familia={state.productData?.item?.familia || "familia"}
                partnumber={state.partNumber}
              />
            ) : (
              <ProductCard
                marca={""}
                modelo={"Ingrese el numero de parte"}
                description={"No se encontrado ningun resultado"}
                familia={""}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default InventoryHeader;
