import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
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
              <Link className="navbar-item nv-links" to="/clientes">
                Gestion de Empresas
              </Link>
              <Link className="navbar-item nv-links" to="/productos">
                Gestion de Productos
              </Link>
              <Link className="navbar-item nv-links" to="/inventarios">
                Gestion de Inventario
              </Link>

            </div>
            <div className="navbar-end ">
              <Link className="navbar-item" to="/login">
                <span className="button is-info is-light">Ingresar</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
