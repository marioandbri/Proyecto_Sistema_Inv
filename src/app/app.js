import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { Component } from "react";
import Navbar from "./navbar";
import JsonCliente from "./jsoncliente";
import ProductosUI from "./productosUI";
import Inventory from "./Inventory";

class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route path="/clientes">
            <JsonCliente />
          </Route>
          <Route path="/productos">
            <ProductosUI />
          </Route>
          <Route path="/inventarios">
            <Inventory />
          </Route>
          <Route exact path="/">
            <>
              <div className="box">
                <section className="hero  is-large">
                  <div className="hero-body ">
                    <p className="title">Bienvenido al sistema de Gestión</p>
                    <p className="subtitle">
                      Esto es un proyecto en Desarrollo...{" "}
                      <span className="icon">
                        <i className="fas fa-tools"></i>
                      </span>
                    </p>
                  </div>
                </section>
              </div>
            </>
          </Route>
        </Switch>
      </Router>
    );
  }
}
export default App;
