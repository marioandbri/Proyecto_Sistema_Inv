import { Route, Switch } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import JsonCliente from "./jsoncliente";
import ProductosUI from "./ProductosUI";
import Inventory from "./Inventory";
import LoginComponent from './LoginComponent';
import SignupComponent from './SignupComponent';
import { useAppDispatch } from "./AppProvider";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { type } from "./AppReducer";
import "../../node_modules/bulma-extensions/bulma-pageloader/dist/css/bulma-pageloader.min.css"
// import { useUserData } from "./useUserData"


const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()

  const session = async () => {
    await fetch("/uac/user")
      .then(res => {
        if (res.ok) return res.json()
        else throw "No hay session abierta"
      }).then((data) => dispatch({ type: type.SET_USER, payload: data ? { username: data.username, email: data.email } : null }))
      .catch(e => {
        console.error(e)
      })
    setIsLoading(false)
  }
  useEffect(async () => {
    session()
    return () => {

    };
  }, [pathname]);
  useEffect(() => {
    return setIsLoading(true)
  }, [])
  return (
    <>
      <div className={`pageloader is-info ${isLoading && "is-active"}`}><span className="title">Cargando app...</span></div>
      <Navbar />
      <Switch>
        <Route path="/login">
          <LoginComponent />
        </Route>
        <Route path="/registro">
          <SignupComponent />
        </Route>
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
    </>

  );
}
export default App;
