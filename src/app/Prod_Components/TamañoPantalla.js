import React from "react";

const TamañoPantalla = ({ tamañoPantalla, liftProduct }) => (
  <div className="field">
    <label className="label">TamañoPantalla</label>
    <div className="field has-addons">
      <div className="control">
        <input
          required
          name="tamañoPantalla"
          className="input"
          type="number"
          value={tamañoPantalla}
          onChange={(e) => {
            liftProduct(e);
          }}
          placeholder=""
        />
      </div>
      <div className="control">
        <a className="button is-static">Pulgadas</a>
      </div>
    </div>
  </div>
);

export default TamañoPantalla;
