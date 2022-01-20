/* eslint-disable react/prop-types */
import React from "react";

const Almacenamiento = ({
  agregarAlm,
  restarAlm,
  liftProductAlm,
  arrayAlm,
}) => {
  return (
    <>
      <div className="field is-horizontal">
        <div className="field">
          <label className="label">
            Almacenamiento{" "}
            <a
              onClick={() => {
                agregarAlm();
              }}
              className="button is-small is-success"
            >
              <span className="icon">
                <i className="fas fa-plus"></i>
              </span>
            </a>
            <a
              onClick={() => {
                restarAlm();
              }}
              className="button is-small is-danger"
            >
              <span className="icon">
                <i className="fas fa-minus"></i>
              </span>
            </a>
          </label>
          {arrayAlm.map((elem, index) => (
            <div key={index} className="field has-addons">
              <div className="control">
                <span className="select">
                  <select
                    value={elem.tipoAlmacenamiento}
                    required
                    name="tipoAlmacenamiento"
                    onChange={(e) => {
                      liftProductAlm(index, e);
                    }}
                  >
                    <option defaultValue value="">
                      Seleccione
                    </option>
                    <option value="HDD">HDD</option>
                    <option value="SSD">SSD</option>
                  </select>
                </span>
              </div>
              <div className="control">
                <input
                  value={elem.capacidadGB}
                  required
                  name="capacidadGB"
                  onChange={(e) => {
                    liftProductAlm(index, e);
                  }}
                  className="input"
                  type="number"
                  placeholder="Capacidad"
                />
              </div>
              <div className="control">
                <a className="button is-static">GB</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Almacenamiento;
