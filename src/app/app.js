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
        </Switch>
      </Router>
    );
  }
}
export default App;
