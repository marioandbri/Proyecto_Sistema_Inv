import React, { useState } from "react";
import "./bulma-switch.min.css";
import { useAppDispatch } from "../AppProvider";
import { type } from "../AppReducer.js";
// import PropTypes from "prop-types";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const initialValues = { username: "", password: "" };
  const [credentials, setCredentials] = useState(initialValues);
  const signinUser = async (data) => {
    const result = await fetch("/uac/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) return res.json();
        else throw "Credenciales Incorrectas";
      })
      .catch((e) => {
        console.error(e);

        return;
      });
    return await result;
  };

  const fetchData = async () => {
    const result = await fetch("/uac/user")
      .then((res) => {
        if (res.ok) return res.json();
        else throw "Ha ocurrido un error";
      })
      .catch((e) => {
        console.error(e);
        return null;
      });
    setIsLoading(false);
    return await result;
  };
  return (
    <>
      <div className="box">
        <h1 className="title">Ingreso</h1>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setIsLoading(true);
            let result = await signinUser(credentials);
            if (result) {
              const { username, email } = await fetchData();
              result = { username, email };
            } else {
              result = null;
              setIsLoading(false);
            }
            dispatch({ type: type.LOG_IN, payload: result });
            console.log(result);
          }}
          className="form"
        >
          <fieldset disabled={isLoading}>
            <label className="label" htmlFor="username">
              Nombre de Usuario
            </label>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  type="text"
                  className="input"
                  id="username"
                  onChange={(e) =>
                    setCredentials({ ...credentials, username: e.target.value })
                  }
                  value={credentials.username}
                />
                <span className="icon is-left">👤</span>
              </p>
            </div>

            <label className="label" htmlFor="password">
              Contraseña
            </label>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  type="password"
                  className="input"
                  id="password"
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  value={credentials.password}
                />
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
