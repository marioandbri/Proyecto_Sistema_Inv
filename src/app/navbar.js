import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppState } from "./AppProvider";
import PropTypes from 'prop-types'
import { ToastNotification, type } from "./AppReducer";
import { toCapitalize } from "./app";
import PasswordModal from "./UsersMgmtComponents/PasswordModal";

const Navbar = () => {

  const { userData } = useAppState()
  const { pathname } = useLocation();
  console.log(pathname);
  useEffect(() => {
    for (let item of document.getElementsByClassName("nv-links")) {
      if (item.pathname == pathname) {
        item.classList.add("is-active");
      } else item.classList.remove("is-active");
    }
    return () => { };
  }, [pathname]);
  return (
    <>
      <nav
        className="navbar is-info"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <img src="./arrienda.webp" className="is-spaced"></img>
            </Link>
            <a onClick={()=>{document.getElementById('navMenu').classList.toggle('is-active'); document.getElementById('navbar-burger').classList.toggle('is-active')}}
              role="button"
              className="navbar-burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navMenu"
              id="navbar-burger"

            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div className="navbar-menu title is-6" id="navMenu">
            <div className="navbar-start">
              <Link className="navbar-item nv-links" to="/">
                🏠 Inicio
              </Link>
              {userData && <MenuItems />}

            </div>
            <div className="navbar-end ">
              {userData ? <SessionItems username={userData.username} isAdmin={userData.isAdmin} id={userData._id} /> : <SigninButtons />}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

const SessionItems = ({ username, isAdmin, id }) => {
  const dispatch = useAppDispatch()
  const logOutUser = async () => {
    console.log("se ejecuto funcion logout")
    const result = await fetch("/uac/logout")
      .then(res => { if (res.ok) return res.json(); else throw "Ha ocurrido un error al cerrar sesion" })
      .catch((e) => { console.error(e); return })
    return await result
  }
  const [changePassword, setChangePassword]  = useState(null)
  const closeModal= () =>{
    setChangePassword(null)
  }
  const updatePass = ()=>{
    setChangePassword(<PasswordModal id={id} closeModal={closeModal}/>)
  }
  return (
    <>
      <div className="navbar-item has-dropdown is-hoverable">
        <a className="navbar-link">👤 {toCapitalize(username)}</a>
        <div className="navbar-dropdown">
          {isAdmin && <Link className="navbar-item" to="/admin/usuarios">👥 Gestión de usuarios</Link>}
          <a onClick={()=>{updatePass()}} className="navbar-item" >🔐 Actualizar contraseña</a>
        </div>
      </div>
      <div className="navbar-item ">
        <span className="button is-danger" onClick={async () => {
          await logOutUser().then(() => {
            dispatch({ type: type.LOG_OUT, payload: null })
            ToastNotification("info", "Hasta pronto 👋")
          })


        }}>
          Cerrar session</span>
      </div>
      {changePassword}
    </>
  )
}

SessionItems.propTypes = {
  username: PropTypes.string,
  isAdmin: PropTypes.bool,
  id: PropTypes.string
}

const SigninButtons = () => {
  return (
    <>
      <Link className="" to="/login">
        <div className="navbar-item ">
          <span className="button is-link">
            Ingresar</span>
        </div>
      </Link>
      <Link className="" to="/registro">
        <div className="navbar-item">
          <span className="button is-outline">Registrarse</span>
        </div>
      </Link>
    </>
  )
}
const MenuItems = () => {
  const { userData } = useAppState()

  return (
    <>

      {(userData.isAdmin || userData.accessEmpresas[0]) && <Link className="navbar-item nv-links" to="/clientes">
        🏭 Gestion de Empresas
      </Link>}
      {(userData.isAdmin || userData.accessProductos[0]) && <Link className="navbar-item nv-links" to="/productos">
        💻 Gestion de Productos
      </Link>}
      {(userData.isAdmin || userData.accessInventarios[0]) && <Link className="navbar-item nv-links" to="/inventarios">
        🧾 Gestion de Inventario
      </Link>}
    </>
  )
}


export default Navbar;
