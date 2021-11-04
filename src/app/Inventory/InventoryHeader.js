import React, {
  useCallback,
  useContext,
  useState,
  useEffect,
  useRef,
  useMemo,
} from "react";
import Filter from "../Filter";
import InventoryClientList from "./InventoryClientList";

import { useDispatch, useInventory } from "./InventoryProvider";
import { type } from "./InventoryReducer";
import ProductCard from "./ProductCard";

const InventoryHeader = ({ opType }) => {
  const state = useInventory();
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");
  const [productPN, setProductPN] = useState("");
  const [nroFactura, setNroFactura] = useState("");
  const [fechaCompra, setFechaCompra] = useState("");
  const id = opType;

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

  const buildHeader = () => {
    let rutProveedor = state.rutProveedor;
    let header = {
      rutProveedor,
      productPN,
      nroFactura,
      fechaCompra,
      rutPoseedor: opType == "ingreso" ? "78507660-5" : "",
    };
    if (!rutProveedor || !productPN || !nroFactura || !fechaCompra) {
      console.log("aun hay campos vacios");
    } else {
      console.log(header);
      dispatch({ type: type.setProductsHeader, payload: header });
    }
  };

  return (
    <>
      <div className="box mb-1">
        <nav className="level">
          <div className="level-left">
            <fieldset disabled={state.loadingClientes}>
              <div className="field has-addons">
                <Filter setQuery={setQuery} />
                <div className="control">
                  <a
                    className={`button ${
                      state.loadingClientes ? "is-loading" : "is-static"
                    }`}
                  >
                    Busqueda de empresas
                    {/* <span className="icon">
                    <i className="fas fa-spinner"></i>
                  </span> */}
                  </a>
                </div>
              </div>
            </fieldset>
          </div>
        </nav>
      </div>
      <InventoryClientList query={query} selectClient={selectClient} />

      <div className="box">
        <div className="columns">
          <div className="column">
            <fieldset
              title={
                !Boolean(state.rutProveedor)
                  ? "Escriba en el cuadro de busqueda y seleccione un cliente"
                  : null
              }
              disabled={!Boolean(state.rutProveedor)}
            >
              <div
                className="field is-grouped is-grouped-multiline"
                style={{ maxWidth: "fit-content" }}
              >
                <div className="control block">
                  <label className="label">
                    {id == "Ingreso" ? "RUT Proveedor" : "RUT Cliente"}
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
                      onBlur={() => {
                        buildHeader();
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
                    onBlur={() => {
                      buildHeader();
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
                    onBlur={() => {
                      buildHeader();
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
                    }}
                    className="button is-info is-small"
                  >
                    Buscar
                  </a>
                </div>
              </div>
            </fieldset>
          </div>
          <div className="column">
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
