import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppState } from "./AppProvider";
import PropTypes from 'prop-types'

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
            <a
              role="button"
              className="navbar-burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navMenu"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div className="navbar-menu title is-5" id="navMenu">
            <div className="navbar-start">
              <Link className="navbar-item nv-links" to="/">
                Inicio
              </Link>
              {userData && <MenuItems />}

            </div>
            <div className="navbar-end ">
              {userData ? <SessionItems username={userData.username} /> : <SigninButtons />}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

const SessionItems = ({ username }) => {
  return (
    <>
      <div className="navbar-item">👤 Bienvenido: {username.toUpperCase()}</div>
      <Link className="" to="/">
        <div className="navbar-item ">
          <span className="button is-danger" onClick={async () => await fetch("/uac/logout")}>
            Cerrar session</span>
        </div>
      </Link>
    </>
  )
}

SessionItems.propTypes = {
  username: PropTypes.string
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
  return (
    <>

      <Link className="navbar-item nv-links" to="/clientes">
        Gestion de Empresas
      </Link>
      <Link className="navbar-item nv-links" to="/productos">
        Gestion de Productos
      </Link>
      <Link className="navbar-item nv-links" to="/inventarios">
        Gestion de Inventario
      </Link>
    </>
  )
}


export default Navbar;
