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
  };

  // const notification = useRef([]);

  const [state, dispatch] = useContext(InventoryContext);

  // const { loading: loadingTypes, data: options } = useProductTypes();

  // const { url } = state;

  const [productfield, setProductField] = useState([
    { numeroSerie: "", isEmpty: true },
  ]);

  // const { loading, data } = useFetch(url);

  // let products = [];

  const handleInput = (e, i) => {
    let newFieldValues = [...productfield];
    newFieldValues[i][e.target.name] = e.target.value.toUpperCase();
    setProductField(newFieldValues);
    console.log(i);
    if (productfield[i].isEmpty == true && e.target.value != "") {
      let newArray = [...productfield];
      newArray[i].isEmpty = false;
      setProductField(newArray);
    }
    if (productfield[productfield.length - 1].isEmpty == false) {
      addField();
    }
    if (e.target.value.length == 0) {
      let newArray = [...productfield];
      newArray[i].isEmpty = false;
      setProductField(newArray);
    }
    console.log(productfield[i]);
  };

  const addField = () => {
    let newFields = [...productfield, { numeroSerie: "", isEmpty: true }];
    setProductField(newFields);
  };

  const removeField = (i) => {
    let newFields = [...productfield];
    !(newFields.length <= 1)
      ? newFields.splice(i, 1)
      : console.log("debe haber al menos 1 campo");
    setProductField(newFields);
  };
  useEffect(() => {
    return () => {};
  }, [productfield]);

  // const findProd = (i) => {
  //   dispatch({ type: type.find, payload: [productfield[i], i] });
  // };
  // const closeNotification = (i) => {
  //   notification.current[i].classList.add("is-hidden");
  // };

  return (
    <>
      <div
        style={{
          minHeight: "40vh",
          maxHeight: "50vh",
          overflowY: "auto",
        }}
        className=" box "
      >
        {/* ///////////// PRODUCTS FIELD ///////////// */}

        {productfield.map((e, index) => (
          <div key={index} className="field has-addons block">
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
                  // inputsRef.current.splice(index, 1);
                  removeField(index);
                }}
                className="button is-danger is-small "
              >
                <span className="icon">
                  <i className="fas fa-trash"></i>
                </span>
              </a>
            </span>
          </div>
        ))}
        {/* <div className="field is-grouped is-grouped-centered">
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
        </div> */}
        <div style={{ position: "sticky", top: "90%" }} className="buttons">
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
