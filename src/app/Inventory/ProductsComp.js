import React, {
  useState,
  useEffect,
  useRef,
  useReducer,
  useContext,
} from "react";
import { useFetch } from "../useFetch";
import { useProductTypes } from "../useProductTypes";
import { InventoryContext } from "./InventoryProvider";
import { type } from "./InventoryReducer";

const ProductsComp = () => {
  const productObj = {
    numeroSerie: "",
    tipoEquipo: "",
    partNumber: "",
  };

  // const notification = useRef([]);

  const [state, dispatch] = useContext(InventoryContext);

  // const { loading: loadingTypes, data: options } = useProductTypes();

  // const { url } = state;

  const [productfield, setProductField] = useState([productObj]);

  // const { loading, data } = useFetch(url);

  const searchProd = useRef();

  // let products = [];

  const handleInput = (e, i) => {
    let newFieldValues = [...productfield];
    newFieldValues[i][e.target.name] =
      e.target.name == "partNumber"
        ? e.target.value.toUpperCase()
        : e.target.value;
    setProductField(newFieldValues);
  };

  const addField = () => {
    let newFields = [...productfield, productObj];
    setProductField(newFields);
  };

  const removeField = (i) => {
    let newFields = [...productfield];
    !(newFields.length <= 1)
      ? newFields.splice(i, 1)
      : console.log("debe haber al menos 1 campo");
    setProductField(newFields);
  };

  // const findProd = (i) => {
  //   dispatch({ type: type.find, payload: [productfield[i], i] });
  // };
  // const closeNotification = (i) => {
  //   notification.current[i].classList.add("is-hidden");
  // };

  return (
    <>
      <div className="tile is-child box">
        {/* ///////////// PRODUCTS FIELD ///////////// */}

        {productfield.map((e, index) => (
          <div key={index} className="box">
            <div className="field has-addons block">
              <span className="control">
                <input
                  onChange={(e) => {
                    handleInput(e, index);
                  }}
                  value={e.numeroSerie}
                  type="text"
                  placeholder="Numero de Serie"
                  className="input is-small"
                  name="numeroSerie"
                />
              </span>

              <span className="control">
                <a
                  onClick={() => {
                    removeField(index);
                  }}
                  ref={searchProd}
                  className="button is-danger is-small "
                >
                  <span className="icon">
                    <i className="fas fa-trash"></i>
                  </span>
                </a>
              </span>
            </div>
          </div>
        ))}
        <div className="field is-grouped is-grouped-centered">
          <a
            className="button is-fullwidth is-success is-outlined"
            onClick={() => {
              addField();
            }}
          >
            <span className="icon is-small">
              <i className="fas fa-plus"></i>
            </span>
            <span>Agregar campo</span>
          </a>
        </div>
        <div className="buttons">
          <a
            className="button is-success "
            onClick={() => {
              ///////////////todo
            }}
          >
            <span className="icon is-small">
              <i className="fas fa-check"></i>
            </span>
            <span>Ingresar Equipos</span>
          </a>
          <a
            className="button is-info"
            onClick={() => {
              ////////////////todo
            }}
          >
            <span className="icon is-small">
              <i className="fas fa-undo"></i>
            </span>
            <span> Limpiar Campos</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default ProductsComp;
