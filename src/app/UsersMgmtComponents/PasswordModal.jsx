import React, { useState } from "react";
import { ToastNotification } from "../AppReducer";
import InputComponent from "../SignupComponent/InputComponent"
import PropTypes from "prop-types"


const PasswordModal = ({ id, closeModal, isAdmin}) => {
  const [loading, setLoading] = useState(false)
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const passUpdate = async () => {
    const data = isAdmin ? { password: password } : { password: password, oldPassword: oldPassword };
    const result = await fetch(`/uac/mgmt/pass/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const response = await result.json();
    if(result.ok){
      ToastNotification("success", "El cambio se realizo correctamente")
      
    }else{
      ToastNotification("error", response.response)
    }
    return response;
  };
  return (
    <>
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className="box">
            <div className="title has-text-black">Cambio de Contraseña</div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (password !== passwordConfirm) {
                  ToastNotification("error", "Las contraseñas no coinciden");
                  return;
                }
                setLoading(true);
                const action = await passUpdate();
                setLoading(false);
                if(action.status === "ok"){
                  closeModal()
                }
              }}
              className="form"
            >
              <fieldset disabled={loading}>
                {!isAdmin && (
                  <InputComponent
                    id="password"
                    value={oldPassword}
                    label="Contraseña actual"
                    handleChange={(e) => {
                      setOldPassword(e.target.value);
                    }}
                    icon="🔑"
                    required={true}
                  />
                )}
                <InputComponent
                  id="password"
                  value={password}
                  label="Nueva contraseña"
                  handleChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  icon="🔑"
                  required={true}
                />
                <InputComponent
                  id="password"
                  value={passwordConfirm}
                  label="Confirmar contraseña"
                  handleChange={(e) => {
                    setPasswordConfirm(e.target.value);
                  }}
                  icon="🔑"
                  required={true}
                />
                <div className="buttons">
                  <button className="button is-success" type="submit">
                    💾 Guardar Cambios
                  </button>
                  <button
                    className={`button is-info ${loading && "is-loading"}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setPassword("");
                    }}
                    type="reset"
                  >
                    🧹 Limpiar Campos
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
          <button
            style={{ position: "absolute", top: "1%", right: "0.5%" }}
            onClick={() => {
              closeModal();
            }}
            className="button delete is-danger"
          ></button>
        </div>
      </div>
    </>
  );
};
PasswordModal.propTypes = {
  id: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool
};

export default PasswordModal