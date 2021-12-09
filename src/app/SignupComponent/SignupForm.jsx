import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";

const SignupForm = ({ isManagingUsers }) => {
  const signupUser = async (data) => {
    const result = await fetch("/uac/registro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) return res.json();
      })
      .catch((e) => {
        console.error(e);

        return { status: "fail", error: e };
      })
      .then((data) => {
        console.log(data);
        return data;
      });
    return result;
  };

  const signupAdmin = async (data) => {
    const result = await fetch("/uac/registro/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) return res;
      })
      .catch((e) => {
        console.error(e);

        return { status: "fail", error: e };
      })
      .then((data) => {
        console.log(data);
        return data;
      });
    return result;
  };
  const [isLoading, setIsLoading] = useState(false);
  const [adminKey, setAdminKey] = useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      isAdmin: false,
      accessEmpresas: false,
      accessProductos: false,
      accessInventarios: false,
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(5, "No puede ser un nombre tan corto")
        .max(36, "Debe ser menos de 36 carácteres")
        .required("Obligatorio")
        .lowercase(),
      email: Yup.string()
        .email("No es un formato de mail correcto")
        .required("Obligatorio"),
      password: Yup.string()
        .min(6, "Ingrese al menos 6 carácteres")
        .required("Obligatorio"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      let result;
      if (!isAdmin) {
        result = await signupUser(values);
      } else {
        result = await signupAdmin({ signupData: values, adminKey: adminKey });
      }
      console.log(result);
      setIsLoading(false);
    },
  });
  const {
    username,
    email,
    password,
    isAdmin,
    accessEmpresas,
    accessProductos,
    accessInventarios,
  } = formik.values;

  return (
    <>
      <div className="box ">
        <h1 className="title">Registro</h1>
        <form onSubmit={formik.handleSubmit} className="form">
          <fieldset disabled={isLoading}>
            <label className="label" htmlFor="username">
              Nombre de usuario
            </label>
            {formik.errors.username && (
              <p className="has-text-danger">{formik.errors.username}</p>
            )}
            <div className="field">
              <p className="control has-icons-left">
                <input
                  type="text"
                  className={`input ${formik.errors.username && "is-danger"}`}
                  id="username"
                  value={username}
                  required
                  onChange={formik.handleChange}
                />
                <span className="icon is-left">👤</span>
              </p>
            </div>
            <label className="label" htmlFor="username">
              E-Mail
            </label>
            {formik.errors.email && (
              <p className="has-text-danger">{formik.errors.email}</p>
            )}
            <div className="field">
              <p className="control has-icons-left">
                <input
                  type="mail"
                  className={`input ${formik.errors.email && "is-danger"}`}
                  id="email"
                  value={email}
                  required
                  onChange={formik.handleChange}
                />
                <span className="icon is-left">📧</span>
              </p>
            </div>

            <label className="label" htmlFor="password">
              Contraseña
            </label>
            {formik.errors.password && (
              <p className="has-text-danger">{formik.errors.password}</p>
            )}
            <div className="field">
              <p className="control has-icons-left">
                <input
                  type="password"
                  className={`input ${formik.errors.password && "is-danger"}`}
                  id="password"
                  value={password}
                  required
                  onChange={formik.handleChange}
                />
                <span className="icon is-left">🔑</span>
              </p>
            </div>

            <div className="field">
              <input
                type="checkbox"
                className="switch is-info"
                id="checkAdmin"
                name="isAdmin"
                checked={isAdmin}
                onChange={formik.handleChange}
              />
              <label htmlFor="checkAdmin">¿Es un administrador?</label>
            </div>
            {isAdmin && (
              <>
                <label htmlFor="adminKey" className="label">
                  Llave de administrador
                </label>
                <div className="field">
                  <input
                    id="adminKey"
                    type="text"
                    className="input"
                    value={adminKey}
                    onChange={(e) => setAdminKey(e.target.value)}
                  />
                </div>
              </>
            )}
            {isManagingUsers && (
              <>
                <div className="field">
                  <input
                    type="checkbox"
                    className="switch is-info"
                    id="checkEmpresas"
                    name="accessEmpresas"
                    checked={accessEmpresas}
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="checkEmpresas">
                    Acceso a modulo Empresas
                  </label>
                </div>
                <div className="field">
                  <input
                    type="checkbox"
                    className="switch is-info"
                    id="checkProductos"
                    name="accessProductos"
                    checked={accessProductos}
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="checkProductos">
                    Accesso a modulo Productos
                  </label>
                </div>
                <div className="field">
                  <input
                    type="checkbox"
                    className="switch is-info"
                    id="checkInventarios"
                    name="accessInventarios"
                    checked={accessInventarios}
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="checkInventarios">
                    Accesso a modulo Inventarios
                  </label>
                </div>
              </>
            )}

            <div className="buttons">
              <button
                type="submit"
                className={`button is-info ${isLoading && "is-loading"}`}
              >
                📝 Registrarse
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

SignupForm.propTypes = {
  isManagingUsers: PropTypes.bool,
};

export default SignupForm;
