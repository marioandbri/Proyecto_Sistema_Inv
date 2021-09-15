import React from "react";

const MemRam = ({
  agregarRam,
  restarRam,
  liftProductRam,
  arrayRam,
  liftProduct,
  tipoRam,
}) => {
  return (
    <>
      <div className="field is-horizontal">
        <div className="field">
          <label className="label">
            Memoria RAM{" "}
            <a
              onClick={(e) => {
                agregarRam();
              }}
              className="button is-small is-success"
            >
              <span className="icon">
                <i className="fas fa-plus"></i>
              </span>
            </a>
            <a
              onClick={(e) => {
                restarRam();
              }}
              className="button is-small is-danger"
            >
              <span className="icon">
                <i className="fas fa-minus"></i>
              </span>
            </a>
          </label>

          <div className="field">
            <div className="control">
              <span className="label">
                Total de Ranuras:{` ${arrayRam.length}`}
              </span>
              <span className="select">
                <select
                  required
                  value={tipoRam}
                  name="tipoRam"
                  onChange={(e) => {
                    liftProduct(e);
                  }}
                >
                  <option defaultValue value="">
                    Seleccione
                  </option>
                  <option>DDR2</option>
                  <option>DDR3</option>
                  <option>DDR4</option>
                  <option>DDR5</option>
                </select>
              </span>
            </div>
          </div>
        </div>
      </div>

      {arrayRam.map((elem, index) => (
        <div key={index} className="field is-horizontal">
          <div className="field">
            <div className="field has-addons">
              <div className="control">
                <input
                  value={elem.capacidadGB || ""}
                  name="capacidadGB"
                  onChange={(e) => {
                    liftProductRam(index, e);
                  }}
                  className="input"
                  type="number"
                  placeholder="Capacidad"
                  required={index == 0 ? true : false}
                />
              </div>
              <div className="control">
                <a className="button is-static">GB</a>
              </div>
            </div>
          </div>
          <div className="field ml-1">
            <div className="control">
              <input
                value={elem.memPartnumber || ""}
                name="memPartnumber"
                onChange={(e) => {
                  liftProductRam(index, e);
                }}
                className="input"
                type="text"
                placeholder="Numero de Parte M.Ram"
                required={index == 0 ? true : false}
              />
            </div>
          </div>
          <div className="field ml-2">
            <div className="control">
              <input
                checked={elem.isInstalled}
                name="isInstalled"
                onChange={(e) => {
                  liftProductRam(index, e);
                }}
                type="checkbox"
                required={index == 0 ? true : false}
              />
            </div>
          </div>
          <span className="label ml-1">¿Instalada?</span>
        </div>
      ))}
    </>
  );
};

export default MemRam;
