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
import { notificationTypes } from "../Notification";

const InventoryHeader = ({ opType }) => {
  const state = useInventory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: type.setOperationType, payload: opType });
    return () => {};
  }, [opType]);
  const initalState = {
    query: "",
    productPN: "",
    nroFactura: "",
    fechaCompra: "",
  };
  const [innerState, setInnerState] = useState(initalState);

  const setQuery = (value) => {
    let state = { ...innerState };
    state.query = value;
    setInnerState(state);
  };

  // const [query, setQuery] = useState("");
  // const [productPN, setProductPN] = useState("");
  // const [nroFactura, setNroFactura] = useState("");
  // const [fechaCompra, setFechaCompra] = useState("");
  const handleInputs = (elem) => {
    let state = { ...innerState };
    state[elem.target.name] =
      elem.target.name == "productPN"
        ? elem.target.value.toUpperCase()
        : elem.target.value;
    setInnerState(state);
  };

  const id = opType;

  const getProductData = async () => {
    const result = await fetch(`/producto/partnumber/${innerState.productPN}`);
    const data = await result.json();
    if (!data.item) {
      dispatch({
        type: type.addNotification,
        payload: {
          content: "🤔 Lo siento, No se encontró ningún producto coincidente",
          notificationType: notificationTypes.warning,
        },
      }); //
    } else {
      dispatch({ type: type.setProductData, payload: data });
    }
  };

  const selectClient = useCallback((e) => {
    console.log(e.rut);
    setQuery(e.razonsocial);
    dispatch({ type: type.selectClient, payload: e.rut });
  }, []);

  const buildHeader = () => {
    let rutProveedor = state.rutProveedor;
    // let header = {
    //   rutProveedor,
    //   productPN,
    //   nroFactura,
    //   fechaCompra,
    //   rutPoseedor: opType == "ingreso" ? "78507660-5" : "",
    // };
    let header = {
      rutProveedor,
      ...innerState,
      rutPoseedor: opType == "ingreso" ? "78507660-5" : "",
    };
    console.log(header);
    if (
      !header.rutProveedor ||
      !header.productPN ||
      !header.nroFactura ||
      !header.fechaCompra
    ) {
      console.log("aun hay campos vacios");
    } else {
      console.log(header);
      dispatch({ type: type.setProductsHeader, payload: header });
    }
  };
  const resetState = () => {
    dispatch({ type: type.selectClient, payload: "" });
    setInnerState(initalState);
  };
  useEffect(() => {
    if (state.rutProveedor == "") {
      setInnerState(initalState);
    }
    return () => {};
  }, [state.rutProveedor]);

  return (
    <>
      <div className="box mb-1">
        <nav className="level">
          <div className="level-left">
            <fieldset disabled={state.loadingClientes}>
              <div className="field has-addons">
                <Filter query={innerState.query} setQuery={setQuery} />
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
      <InventoryClientList
        query={innerState.query}
        selectClient={selectClient}
      />

      <div className="box mb-1">
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
                    {id == "ingreso" ? "RUT Proveedor" : "RUT Cliente"}
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
                        handleInputs(e);
                      }}
                      onBlur={() => {
                        buildHeader();
                      }}
                      type="date"
                      placeholder="dd-mm-yyyy"
                      className="input is-small"
                      name="fechaCompra"
                      value={innerState.fechaCompra}
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
                      handleInputs(e);
                    }}
                    onBlur={() => {
                      buildHeader();
                    }}
                    type="text"
                    className="input is-small"
                    name="nroFactura"
                    value={innerState.nroFactura}
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
                      handleInputs(e);
                    }}
                    onBlur={() => {
                      buildHeader();
                    }}
                    type="list"
                    className="input is-small "
                    name="productPN"
                    value={innerState.productPN}
                  />
                </span>
                <div className="control">
                  <a
                    onClick={() => {
                      getProductData();
                      dispatch({
                        type: type.setPN,
                        payload: innerState.productPN,
                      });
                    }}
                    className="button is-info is-small"
                  >
                    Buscar
                  </a>
                </div>
              </div>
              <a
                className="button is-info is-small"
                onClick={() => {
                  resetState();
                }}
              >
                <span className="icon is-small">
                  <i className="fas fa-undo"></i>
                </span>
                <span> Limpiar Campos</span>
              </a>
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
