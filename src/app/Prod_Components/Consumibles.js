import React from "react";


const Consumibles = ({ liftProductConsum, arrayConsum, agregarConsum, restarConsum }) => {



  return (
    <>
      <div className="field is-grouped is-grouped-multiline">
        <div className="field m-1">
          <label className="label">
            Consumibles{" "}
            <a
              onClick={(e) => {
                agregarConsum()

              }}
              className="button is-small is-success"
            >
              <span className="icon">
                <i className="fas fa-plus"></i>
              </span>
            </a>
            <a
              onClick={(e) => {
                restarConsum()

              }}
              className="button is-small is-danger"
            >
              <span className="icon">
                <i className="fas fa-minus"></i>
              </span>
            </a>
          </label>

          {/* ///////////CAMPOS/////////// */}
          {arrayConsum.map((ele, index) => (
            <div key={index} className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input
                      value={ele.tipoConsumible}
                      name="tipoConsumible"
                      onChange={(e) => {
                        liftProductConsum(e, index);
                      }}
                      className="input"
                      type="text"
                      placeholder="Tipo de Consumible"
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      value={ele.numeroParte}
                      name="numeroParte"
                      onChange={(e) => {
                        liftProductConsum(e, index);
                      }}
                      className="input"
                      type="text"
                      placeholder="PartNumber Consumible"
                    />
                  </div>
                </div>
              </div>
            </div>

          ))}

          {/* ////////////FIN CAMPOS//////////// */}

        </div>
      </div>

    </>
  );
};

export default Consumibles;
