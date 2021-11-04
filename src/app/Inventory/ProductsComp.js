import React, {
  useState,
  useEffect,
  useRef,
  useReducer,
  useContext,
} from "react";
import Notification, { notificationTypes } from "../Notification";
import { useFetch } from "../useFetch";
import { useProductTypes } from "../useProductTypes";
import {
  InventoryContext,
  useDispatch,
  useInventory,
} from "./InventoryProvider";
import { type } from "./InventoryReducer";

const ProductsComp = () => {
  const productObj = {
    numeroSerie: "",
  };

  // const notification = useRef([]);
  const state = useInventory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // const { loading: loadingTypes, data: options } = useProductTypes();

  // const { url } = state;

  const [productfield, setProductField] = useState([
    { numeroSerie: "", isEmpty: true, isValid: false },
  ]);

  // const { loading, data } = useFetch(url);

  // let products = [];

  const handleInput = (e, i) => {
    //Creates a shallow copy of the fields
    let newFieldValues = [...productfield];
    let inputData = e.target.value.toUpperCase().trim();
    newFieldValues[i].isValid = true;
    // console.log(json.includes(inputData));
    //format the input to upper case and sets to the field[index]
    newFieldValues[i][e.target.name] = inputData;
    // if (!newFieldValues.includes(inputData)) {
    //   newFieldValues[i].isValid == true;
    // } else {
    //   newFieldValues[i].isValid == false;
    //   console.log(`campo ${i} repedito`);
    // }
    //Update the state
    setProductField(newFieldValues);
    //if the field recieves data and have an empty status, changes it's status to not empty
    if (productfield[i].isEmpty == true && e.target.value != "") {
      let newArray = [...productfield];
      newArray[i].isEmpty = false;
      setProductField(newArray);
    }
    //validates if last field have some data befor adding a new field to the end of the fields array
    if (productfield[productfield.length - 1].isEmpty == false) {
      addField();
    }
    //if the input data is cleared, set the field state to empty
    if (e.target.value.length == 0) {
      let newArray = [...productfield];
      newArray[i].isEmpty = true;
      setProductField(newArray);
    }
    invalidateField().forEach((e) => {
      newFieldValues[e].isValid = false;
    });
  };

  const addField = () => {
    let newFields = [
      ...productfield,
      { numeroSerie: "", isEmpty: true, isValid: false },
    ];
    setProductField(newFields);
  };

  const removeField = (i) => {
    let newFields = [...productfield];
    !(newFields.length <= 1)
      ? newFields.splice(i, 1)
      : console.log("debe haber al menos 1 campo");
    setProductField(newFields);
  };
  const invalidateField = () => {
    let invalidIndex = [];
    const busqueda = productfield.reduce((acc, producto, index) => {
      acc[producto.numeroSerie] = ++acc[producto.numeroSerie] || 0;
      if (acc[producto.numeroSerie] > 0) {
        invalidIndex.push(index);
      }
      return acc;
    }, {});
    console.log(busqueda, "busqueda");

    console.log(invalidIndex);
    return invalidIndex;
    // const duplicados = productfield.filter((producto) => {
    //   return busqueda[producto.numeroSerie];
    // });
    // console.log(duplicados, "duplicados");

    // let newFields = [...productfield];
    // newFields[i].isValid = false;
    // setProductField(newFields);
  };

  useEffect(() => {
    return () => {};
  }, [productfield]);

  const serialNumbers = useRef([]);

  const createInBulk = async () => {
    setLoading(true);
    let products = [];
    if (state.productsHeader) {
      productfield.forEach((e) => {
        if (e.isValid)
          products.push({
            ...state.productsHeader,
            numeroSerie: e.numeroSerie,
          });
      });
      console.log(products);
      const result = await fetch("/inventario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(products),
      });
      console.log(result, "result await fetch");
      const data = await result.json();
      if (result.ok) {
        console.log(data, "1");
        console.log("2");
        dispatch({
          type: type.addNotification,
          payload: {
            content: data.message,
            notificationType: notificationTypes.success,
          },
        }); // notification arguments: content, type .(index) is passed in reducer
      } else {
        const error = data;
        let detail = "";
        let badIndex = "";
        for (const { message, value } of error.data.errors) {
          detail += `${value} ${message}.`;
          badIndex = productfield
            .map((e) => e.numeroSerie)
            .indexOf(value.toString());
        }
        console.log(detail);
        console.log(badIndex);
        let badFields = [...productfield];
        badFields[badIndex].isValid = false;
        setProductField(badFields);

        console.error(error.data.errors);
        dispatch({
          type: type.addNotification,
          payload: {
            detail,
            content: error.message,
            notificationType: notificationTypes.danger,
          },
        }); // notification arguments: content, type .(index) is passed in reducer
      }

      setLoading(false);
    } else {
      dispatch({
        type: type.addNotification,
        payload: {
          content: "Faltan datos en la cabecera",
          notificationType: notificationTypes.warning,
        },
      }); //
      console.log("cabecera vacia");
      setLoading(false);
    }
  };

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
            <span className="control has-icons-right">
              <input
                onBlur={async (elem) => {
                  const found = await fetch(
                    `/inventario/${elem.target.value}`
                  ).then((res) => res.json());
                  if (found) {
                    let duplicatedElem = [...productfield];
                    duplicatedElem[index].isValid = false;
                    setProductField(duplicatedElem);
                  }
                }}
                onChange={(e) => {
                  handleInput(e, index);
                }}
                value={e.numeroSerie}
                type="text"
                placeholder="Numero de Serie"
                className={`input is-small ${
                  !e.isValid && !e.isEmpty ? "is-danger" : ""
                }`}
                title={
                  !e.isValid && !e.isEmpty ? "Numero de Serie Duplicado" : ""
                }
                name="numeroSerie"
                ref={(e) => {
                  serialNumbers.current[index] = e;
                }}
              />
              {!e.isValid && !e.isEmpty ? (
                <span className="icon is-right ml-1">
                  <i className="fas fa-exclamation-triangle"></i>
                </span>
              ) : (
                ""
              )}
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
        <div
          style={{
            position: "sticky",
            top: "90%",
            width: "fit-content",
            marginBottom: 0,
          }}
          className="buttons"
        >
          <a
            className={`button is-success ${loading ? "is-loading" : ""}`}
            onClick={() => {
              createInBulk();
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
        {state.notifications.map((e, index) => (
          <Notification key={index} {...e} notificationIndex={index} />
        ))}
      </div>
    </>
  );
};

export default ProductsComp;
