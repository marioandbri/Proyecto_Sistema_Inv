import React, {
  useState,
  useEffect,
  useRef,
  useReducer,
  useContext,
} from "react";
import { Link } from "react-router-dom";
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
  const state = useInventory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const initialInputs = {
    numeroSerie: "",
    isEmpty: true,
    isValid: false,
    itemStatus: [],
  };
  const [productfield, setProductField] = useState([initialInputs]);
  const [itemStatus, setItemStatus] = useState([]);

  const handleInput = (e, i) => {
    //Creates a shallow copy of the fields
    let newFieldValues = [...productfield];
    let inputData = e.target.value.toUpperCase().trim();
    newFieldValues[i].isValid = true;
    //format the input to upper case and sets to the field[index]
    newFieldValues[i][e.target.name] = inputData;
    // if (!newFieldValues.includes(inputData)) {
    //   newFieldValues[i].isValid == true;
    // } else {
    //   newFieldValues[i].isValid == false;
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
      : dispatch({
          type: type.addNotification,
          payload: {
            content: "⚠ Debe haber al menos un campo",
            notificationType: notificationTypes.warning,
          },
        }); //;
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
    return () => {
      resetInputs();
    };
  }, [state.operationType]);
  // useEffect(() => {
  //   return () => {};
  // }, [productfield]);

  // const serialNumbers = useRef([]);

  const createInBulk = async () => {
    setLoading(true);
    let products = [];
    let requestResult;
    let validProducts = productfield.filter((e) => e.isValid == true).length;

    const confirmSend = confirm(
      `¿Está seguro que desea ingresar ${validProducts} registros?`
    );
    if (!confirmSend) {
      dispatch({
        type: type.addNotification,
        payload: {
          content: `🛑 Se cancelo la operación`,
          notificationType: notificationTypes.info,
        },
      });
      setLoading(false);
    } else {
      if (state.productsHeader) {
        productfield.forEach((e) => {
          if (e.isValid) {
            products.push({
              ...state.productsHeader,
              numeroSerie: e.numeroSerie,
            });
          }
        });
        if (productfield.filter((e) => e.isValid == false).length > 1) {
          products = [];
        }
        console.log(products);
        if (state.operationType == "ingreso") {
          const result = await fetch("/inventario", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(products),
          });
          requestResult = result;
          // console.log(result, "result await fetch");
          // const data = await result.json();
        } else {
          // console.log(products);
          const result = await fetch(`/inventario/${state.operationType}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(products),
          });
          requestResult = result;

          // console.log(result, "result await fetch");
          // const data = await result.json();
        }
        const data = await requestResult.json();
        if (requestResult.ok) {
          dispatch({
            type: type.addNotification,
            payload: {
              content: `✅ ${data.message}${
                state.operationType != "ingreso" ? ": " + data.data : ""
              }`,
              notificationType: notificationTypes.success,
            },
          }); // notification arguments: content, type .(index) is passed in reducer
          state.operationType == "ingreso"
            ? dispatch({ type: type.selectClient, payload: "" })
            : dispatch({ type: type.selectPossesor, payload: "" });
          dispatch({ type: type.setProductsHeader, payload: "" });
          resetInputs();
        } else {
          const errors = data.error || "";
          let detail = "";
          let badIndex = "";
          if (Boolean(errors)) {
            for (const { message, value } of errors) {
              detail += `${value} ${message}.`;
              badIndex = productfield
                .map((e) => e.numeroSerie)
                .indexOf(value.toString());
            }
            let badFields = [...productfield];
            badFields[badIndex].isValid = false;
            setProductField(badFields);

            // console.error(error.data.errors);
          }
          console.log(errors);
          dispatch({
            type: type.addNotification,
            payload: {
              detail,
              content: `⛔ ${data.message}`,
              notificationType: notificationTypes.danger,
            },
          }); // notification arguments: content, type .(index) is passed in reducer
        }

        setLoading(false);
      } else {
        dispatch({
          type: type.addNotification,
          payload: {
            content: "⚠ Faltan datos en la cabecera",
            notificationType: notificationTypes.warning,
          },
        }); //
        console.log("cabecera vacia");
        setLoading(false);
      }
    }
  };

  const resetInputs = () => {
    setProductField([initialInputs]);
  };
  return (
    <>
      <div
        style={{
          minHeight: "40vh",
          maxHeight: "43vh",
          overflowY: "auto",
        }}
        className=" box "
      >
        <h2 className="title is-4 is-underlined mb-3">Números de Serie</h2>
        {/* ///////////// PRODUCTS FIELD ///////////// */}
        <fieldset
          disabled={!state.rutPoseedor && state.operationType != "ingreso"}
        >
          {productfield.map((e, index) => (
            <div key={index} className="field has-addons block">
              <span className="button is-small is-static">{index + 1}</span>
              <span className="control has-icons-right">
                <input
                  onBlur={async (elem) => {
                    let found;
                    if (state.operationType == "ingreso") {
                      found = await fetch(
                        `/inventario/${elem.currentTarget.value}`
                      ).then((res) => res.json());
                      if (found) {
                        let duplicatedElem = [...productfield];
                        duplicatedElem[index].isValid = false;
                        setProductField(duplicatedElem);
                      }
                    } else {
                      found = await fetch(
                        `/inventario/${elem.currentTarget.value}`
                      ).then((res) => res.json());
                      let itemStatus = [...productfield];
                      if (found) {
                        itemStatus[index].itemStatus = [
                          found?.rutPoseedor,
                          found?.productPN,
                        ];
                      } else {
                        itemStatus[index].itemStatus = [null];
                        itemStatus[index].isValid = false;
                      }
                      if (
                        state.operationType == "retiro" &&
                        found?.rutPoseedor != state.rutPoseedor
                      ) {
                        itemStatus[index].isValid = false;
                      } else if (
                        state.operationType == "entrega" &&
                        found?.rutPoseedor != "78507660-5"
                      ) {
                        itemStatus[index].isValid = false;
                      } else {
                        itemStatus[index].isValid = true;
                      }
                      setProductField(itemStatus);
                      // console.log(found);
                    }
                  }}
                  onChange={(e) => {
                    handleInput(e, index);
                  }}
                  value={e.numeroSerie}
                  type="text"
                  placeholder="Numero de Serie"
                  className={`input is-small ${
                    !e.isValid && index != productfield.length - 1
                      ? "is-danger"
                      : ""
                  }`}
                  title={
                    !e.isValid && index != productfield.length - 1
                      ? "Numero de Serie Duplicado o Campo Vacío"
                      : ""
                  }
                  name="numeroSerie"
                  // ref={(e) => {
                  //   serialNumbers.current[index] = e;
                  // }}
                />
                {!e.isValid && index != productfield.length - 1 ? (
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
              {state.operationType != "ingreso" &&
                index != productfield.length - 1 && (
                  <span className=" m-1 tags are-normal">
                    {e.itemStatus &&
                      e.itemStatus.map((e, i) => {
                        if (state.operationType == "retiro" && i == 0 && e) {
                          return (
                            <span
                              key={i}
                              className={
                                e != state.rutPoseedor
                                  ? "tag is-warning"
                                  : "tag is-link"
                              }
                            >
                              {e != state.rutPoseedor
                                ? "🛑 " +
                                  e +
                                  " - No coincide con cliente indicado"
                                : e}
                            </span>
                          );
                        } else if (
                          state.operationType == "entrega" &&
                          i == 0 &&
                          e
                        ) {
                          return (
                            <span
                              key={i}
                              className={
                                e != "78507660-5"
                                  ? "tag is-warning"
                                  : "tag is-link"
                              }
                            >
                              {e != "78507660-5"
                                ? "🛑 " +
                                  e +
                                  " - El equipo no se encuentra en Arrienda"
                                : e}
                            </span>
                          );
                        }
                        if (e) {
                          return (
                            <span key={i} className="tag is-link">
                              {e}
                            </span>
                          );
                        } else {
                          return (
                            <span key={i} className="tag is-danger">
                              Sin coincidencias 😕
                            </span>
                          );
                        }
                      })}
                  </span>
                )}
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
        </fieldset>

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
              resetInputs();
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
