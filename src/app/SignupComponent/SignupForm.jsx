import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { ToastNotification } from "../AppReducer";
import InputComponent from "./InputComponent";
import SwitchComponent from "./SwitchComponent";
import { sinPermisos } from "../../helpers/permissions";
import CheckboxComponent from "./CheckboxComponent";

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
        accessEmpresas: sinPermisos,
        accessProductos: sinPermisos,
        accessInventarios: sinPermisos,
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
    let updateData = {...values}
    updateData.accessEmpresas = !values.accessEmpresas[0] ? sinPermisos : values.accessEmpresas
    updateData.accessInventarios = !values.accessInventarios[0] ? sinPermisos : values.accessInventarios
    updateData.accessProductos = !values.accessProductos[0] ? sinPermisos : values.accessProductos
    // console.log(updateData)
    const result = await fetch(`/uac/mgmt/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });
    const response = await result.json();
    (result.ok && ToastNotification(response.status, response.message) ) || ToastNotification(response.status, "Algo no ha ido bien:" + response.message)
    // console.log(response);
    
    setIsLoading(false);
    return response
  };

  const handleAdminKey =(e) =>{
     setAdminKey(e.target.value)
  }
  const validateSignup = Yup.object({
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
  });
  const validateUpdate = Yup.object({
    username: Yup.string()
      .min(5, "No puede ser un nombre tan corto")
      .max(36, "Debe ser menos de 36 carácteres")
      .required("Obligatorio")
      .lowercase(),
    email: Yup.string()
      .email("No es un formato de mail correcto")
      .required("Obligatorio"),
    password: Yup.string().min(6, "Ingrese al menos 6 carácteres"),
  });

  const formik = useFormik({
    initialValues: initalValues,
    validationSchema: isManagingUsers ? validateUpdate : validateSignup,
    onSubmit: async (values) =>{
      if(isManagingUsers){
        return submitUpdate(values, userData._id)
      }else{
        return submitRegistration(values)
      }

    }
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
            <InputComponent
              label="Nombre de Usuario"
              errors={formik.errors.username}
              handleChange={formik.handleChange}
              icon="👤"
              value={username}
              id="username"
            />

            <InputComponent
              label="E-mail"
              value={email}
              id="email"
              icon="📧"
              handleChange={formik.handleChange}
              errors={formik.errors.email}
            />

            {!isManagingUsers && (
              <InputComponent
                label="Contraseña"
                id="password"
                errors={formik.errors.email}
                handleChange={formik.handleChange}
                icon="🔑"
                value={password}
                required={isManagingUsers ? false : true}
              />
            )}
            <hr></hr>
            <div className="box">
              <SwitchComponent
                handleChange={formik.handleChange}
                id="isAdmin"
                label="¿Es un administrador?"
                checked={isAdmin}
              />

              {isAdmin && !isManagingUsers && (
                <InputComponent
                  id="adminKey"
                  label="Llave de administrador"
                  value={adminKey}
                  handleChange={(e) => handleAdminKey(e)}
                  icon="🔒"
                />
              )}
            </div>
            {isManagingUsers && (
              <>
                <label className="label">Permisos</label>
                <div className="box">
                  <SwitchComponent
                    handleChange={formik.handleChange}
                    id="accessEmpresas[0]"
                    label="Acceso a modulo Empresas"
                    checked={accessEmpresas[0]}
                    value={accessEmpresas[0]}
                  />
                  {accessEmpresas[0] && (
                  <div
                    style={{
                      display: "flex",
                      gap: "2em",
                      justifyContent: "space-evenly",
                    }}
                  >
                      <CheckboxComponent
                        handleChange={formik.handleChange}
                        id="accessEmpresas[1]"
                        label="Eliminacion"
                        checked={accessEmpresas[1]}
                        value={accessEmpresas[1]}
                      />
                      <CheckboxComponent
                        handleChange={formik.handleChange}
                        id="accessEmpresas[2]"
                        label="Creacion"
                        checked={accessEmpresas[2]}
                        value={accessEmpresas[2]}
                      />
                      <CheckboxComponent
                        handleChange={formik.handleChange}
                        id="accessEmpresas[3]"
                        label="Actualizacion"
                        checked={accessEmpresas[3]}
                        value={accessEmpresas[3]}
                      />
                  </div>
                   )}
                </div>

                <div className="box">
                  <SwitchComponent
                    handleChange={formik.handleChange}
                    id="accessProductos[0]"
                    label="Acceso a modulo Productos"
                    checked={accessProductos[0]}
                    value={accessProductos[0]}
                  />
                  {accessProductos[0] && (
                    <div
                      style={{
                        display: "flex",
                        gap: "2em",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <CheckboxComponent
                        handleChange={formik.handleChange}
                        id="accessProductos[1]"
                        label="Eliminacion"
                        checked={accessProductos[1]}
                        value={accessProductos[1]}
                      />
                      <CheckboxComponent
                        handleChange={formik.handleChange}
                        id="accessProductos[2]"
                        label="Creacion"
                        checked={accessProductos[2]}
                        value={accessProductos[2]}
                      />
                      <CheckboxComponent
                        handleChange={formik.handleChange}
                        id="accessProductos[3]"
                        label="Actualizacion"
                        checked={accessProductos[3]}
                        value={accessProductos[3]}
                      />
                    </div>
                  )}
                </div>

                <div className="box">
                  <SwitchComponent
                    handleChange={formik.handleChange}
                    id="accessInventarios[0]"
                    label="Acceso a modulo Inventarios"
                    checked={accessInventarios[0]}
                    value={accessInventarios[0]}
                  />
                  {accessInventarios[0] && (
                    <div
                      style={{
                        display: "flex",
                        gap: "2em",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <CheckboxComponent
                        handleChange={formik.handleChange}
                        id="accessInventarios[1]"
                        label="Eliminacion"
                        checked={accessInventarios[1]}
                        value={accessInventarios[1]}
                      />
                      <CheckboxComponent
                        handleChange={formik.handleChange}
                        id="accessInventarios[2]"
                        label="Creacion"
                        checked={accessInventarios[2]}
                        value={accessInventarios[2]}
                      />
                      <CheckboxComponent
                        handleChange={formik.handleChange}
                        id="accessInventarios[3]"
                        label="Actualizacion"
                        checked={accessInventarios[3]}
                        value={accessInventarios[3]}
                      />
                    </div>
                  )}
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
