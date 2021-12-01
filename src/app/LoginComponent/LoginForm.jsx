import React, { useState } from "react";
import "./bulma-switch.min.css";
// import PropTypes from "prop-types";

const LoginForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const emularAsyncLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };
  return (
    <>
      <div className="box">
        <h1 className="title">Ingreso</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            emularAsyncLoading();
          }}
          className="form"
        >
          <fieldset disabled={isLoading}>
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
              <button
                type="submit"
                className={`is-info button ${isLoading && "is-loading"}`}
              >
                ✔ Ingresar
              </button>
              <button type="reset" className="button">
                🧹 Limpiar campos
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </>
  );
};

LoginForm.propTypes = {
  // username: PropTypes.string,
};

export default LoginForm;
