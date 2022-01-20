/* eslint-disable react/prop-types */

import React, { useState } from "react";

const MonitorForm = ({
  handleCreationForm,
  // isAnUpdate,
  // productUpdate,
  // handleUpdate,
  // isAnEye,
}) => {
  const initialState = {
    tipoMonitor: "",
    partNumber: "",
    marca: "",
    modelo: "",
    tamañoPantalla: "",
    conexiones: [""],
    maxResolucionX: "",
    maxResolucionY: "",
    tags: "",
  };

  const [product, setProduct] = useState(initialState);
  const liftProduct = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };
  const liftProductConex = (e) => {
    const conex = Array.from(e.target.selectedOptions, (o) => o.value);
    setProduct({
      ...product,
      conexiones: conex,
    });
  };
  const liftTags = (e) => {
    // const tags = e.target.value.split(",")
    setProduct({
      ...product,
      tags: e.target.value.match(/[\w\-.]+/g),
    });
  };
  const liftProductType = (e) => {
    let tipo = e.target.value.match(/[\w]+/g);
    setProduct({
      ...product,
      [e.target.name]: tipo,
    });
  };

  return (
    <>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(product);
          handleCreationForm(product);
        }}
      >
        <div className="field is-grouped is-grouped-multiline">
          <div className="field mr-1">
            <label className="label">Tipo de Impresora</label>
            <div className="control">
              <span className="select">
                <select
                  required
                  onChange={(e) => {
                    liftProductType(e);
                  }}
                  value={product.tipoMonitor}
                  name="tipoMonitor"
                >
                  <option defaultValue value="">
                    Seleccione
                  </option>
                  <option value={["Monitor"]}>Monitor</option>
                  {/* <option value={["Color"]}>Color</option>
                  <option disabled>──────</option> */}
                  <option value={["TV", "Monitor"]}>TV / Monitor</option>
                  {/* <option value={["Multifuncional", "Color"]}>
                    Multifuncional Color
                  </option> */}
                </select>
              </span>
            </div>
          </div>
          <span className="field mr-1">
            <label className="label">Numero de Parte</label>
            <span className="control">
              <input
                value={product.partNumber}
                name="partNumber"
                type="text"
                className="input"
                required
                onChange={(e) => {
                  liftProduct(e);
                }}
              />
            </span>
          </span>
          <div className="field mr-1">
            <label className="label">Marca</label>
            <span className="control">
              <input
                value={product.marca}
                name="marca"
                type="text"
                className="input"
                required
                onChange={(e) => {
                  liftProduct(e);
                }}
              />
            </span>
          </div>
          <div className="field mr-1">
            <label className="label">Modelo</label>
            <span className="control">
              <input
                value={product.modelo}
                name="modelo"
                type="text"
                className="input"
                required
                onChange={(e) => {
                  liftProduct(e);
                }}
              />
            </span>
          </div>
        </div>
        <div className="field is-grouped is-grouped-multiline">
          <div className="field mr-1">
            <label className="label">Tamaño de Pantalla</label>
            <div className="field has-addons">
              <div className="control has-icons-right">
                <input
                  value={product.tamañoPantalla}
                  required
                  name="tamañoPantalla"
                  className="input"
                  type="number"
                  // value={tamañoPantalla}
                  // onChange={(e) => {
                  //   liftProduct(e);
                  // }}
                  onChange={(e) => {
                    liftProduct(e);
                  }}
                />
                <span className="icon is-right is-small">
                  <i className="fas fa-expand-alt"></i>
                </span>
              </div>
              <div className="control">
                <a className="button is-static">Pulgadas</a>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label">Resolución Máxima</label>
            <div className="field has-addons mr-1">
              <span className="control has-icons-right">
                <input
                  value={product.maxResolucionX}
                  name="maxResolucionX"
                  type="number"
                  className="input"
                  onChange={(e) => {
                    liftProduct(e);
                  }}
                />
                <span className="icon is-small is-right">
                  <i className="fas fa-arrows-alt-h"></i>
                </span>
              </span>
              <span className="control">
                <a className="button is-static">Px/Ancho</a>
              </span>
              <span className="control has-icons-right">
                <input
                  value={product.maxResolucionY}
                  name="maxResolucionY"
                  type="number"
                  className="input"
                  onChange={(e) => {
                    liftProduct(e);
                  }}
                />
                <span className="icon is-small is-right">
                  <i className="fas fa-arrows-alt-v"></i>
                </span>
              </span>
              <span className="control">
                <a className="button is-static">Px/Alto</a>
              </span>
            </div>
          </div>
        </div>
        <div className="field is-grouped is-grouped-multiline">
          <div className="field m-1">
            <label className="label">Conexiones</label>
            <div className="control">
              <span className="select is-multiple">
                <select
                  value={product.conexiones}
                  multiple
                  required
                  size="4"
                  name="conexiones"
                  onChange={(e) => {
                    liftProductConex(e);
                  }}
                >
                  <option value="VGA">VGA</option>
                  <option value="DVI">DVI</option>
                  <option value="HDMI">HDMI</option>
                  <option value="DisplayPort">DisplayPort</option>
                </select>
              </span>
            </div>
          </div>
        </div>
        <div className="field">
          <label className="label">Tags</label>
          <div className="control">
            <input
              value={product.tags}
              name="tags"
              className="input"
              onChange={(e) => {
                liftTags(e);
              }}
              placeholder="Info Adicional filtrable. Separada por comas. Ej.: Táctil, Altavoz..."
            />
          </div>
        </div>

        {/* ////////////// BOTONES //////////// */}
        <div className="field is-grouped mt-1">
          <div className="control">
            <button type="submit" className="button is-link">
              Crear
            </button>
          </div>
          <div className="control">
            <button type="reset" className="button is-link is-light">
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default MonitorForm;
