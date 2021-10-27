import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import JsonCliente from "./jsoncliente";
import ProductosUI from "./productosUI";
import Inventory from "./Inventory";

class Navbar extends Component {
  render() {
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
                <img
                  src="http://localhost:4000/arrienda.webp"
                  className="is-spaced"
                ></img>
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
            <div className="navbar-menu" id="navMenu">
              <div className="navbar-start title is-5">
                <Link className="navbar-item" to="/">
                  Inicio
                </Link>
                <Link className="navbar-item" to="/clientes">
                  Gestion de Clientes
                </Link>
                <Link className="navbar-item" to="/productos">
                  Gestion de Productos
                </Link>
                <Link className="navbar-item" to="/inventarios">
                  Gestion de Inventario
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </>
    );
  }
}

export default Navbar;
