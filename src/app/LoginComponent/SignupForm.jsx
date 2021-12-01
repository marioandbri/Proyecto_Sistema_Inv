import React, { useState } from "react";
// import PropTypes from "prop-types";

const SignupForm = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      <div className="box ">
        <h1 className="title">Registro</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="form"
        >
          <div className="columns">
            <div className="column is-6 is-offset-3">
              <label className="label" htmlFor="username">
                Nombre de Usuario
              </label>
              <div className="field">
                <p className="control has-icons-left">
                  <input type="text" className="input" id="username" />
                  <span className="icon is-left">👤</span>
                </p>
              </div>

              <label className="label" htmlFor="password">
                Contraseña
              </label>
              <div className="field">
                <p className="control has-icons-left">
                  <input type="password" className="input" id="password" />
                  <span className="icon is-left">🔑</span>
                </p>
              </div>

              <div className="field">
                <input
                  type="checkbox"
                  className="switch is-info"
                  id="checkradio"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                />
                <label htmlFor="checkradio">Recordar datos de ingreso</label>
              </div>

              <div className="buttons">
                <button type="submit" className="button is-info">
                  Submit
                </button>
                <button type="reset" className="button">
                  Reset
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

SignupForm.propTypes = {};

export default SignupForm;
