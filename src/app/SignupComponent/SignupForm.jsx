import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { ToastNotification } from "../AppReducer";

const SignupForm = ({ isManagingUsers, userData }) => {
  const initalValues = isManagingUsers
    ? {
        username: userData.username,
        email: userData.email,
        password: "",
        isAdmin: userData.isAdmin,
        accessEmpresas: userData.accessEmpresas,
        accessInventarios: userData.accessInventarios,
        accessProductos: userData.accessProductos,
      }
    : {
        username: "",
        email: "",
        password: "",
        isAdmin: false,
        accessEmpresas: false,
        accessProductos: false,
        accessInventarios: false,
      };
  const signupUser = async (data) => {
    const result = await fetch("/uac/registro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const jsonData = await result.json();
    return jsonData;
  };

  const signupAdmin = async (data) => {
    const result = await fetch("/uac/registro/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const jsonData = await result.json();
    return jsonData;
  };
  const [isLoading, setIsLoading] = useState(false);
  const [adminKey, setAdminKey] = useState("");

  const submitRegistration = async (values) => {
    setIsLoading(true);
    let result;
    if (!isAdmin) {
      result = await signupUser(values);
    } else {
      result = await signupAdmin({ signupData: values, adminKey: adminKey });
      result.status === "fail" && ToastNotification("error", result.error);
    }
    result.status === "ok" &&
      ToastNotification("success", "Usuario creado correctamente");
    console.log(result);
    setIsLoading(false);
  };
  const submitUpdate = async (values, id) => {
    setIsLoading(true);
    const result = await fetch(`/uac/mgmt/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const response = await result.json();
    console.log(response);

    setIsLoading(false);
  };

  const formik = useFormik({
    initialValues: initalValues,
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
    onSubmit: (values) =>
      isManagingUsers
        ? submitUpdate(values, userData._id)
        : submitRegistration(values),
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
        <h1 className="title">
          {isManagingUsers ? "Actualización de Datos" : "Registro"}
        </h1>
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
                {isManagingUsers ? "💾 Guardar Cambios" : "📝 Registrarse"}
              </button>
              <button type="reset" className="button">
                {isManagingUsers ? "🔙 Deshacer cambios" : "🧹 Limpiar campos"}
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
  userData: PropTypes.object,
};

export default SignupForm;
