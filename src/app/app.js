import { Route, Switch } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import JsonCliente from "./jsoncliente";
import ProductosUI from "./ProductosUI";
import Inventory from "./Inventory";
import LoginComponent from './LoginComponent';
import SignupComponent from './SignupComponent';
import { useAppDispatch, useAppState } from "./AppProvider";
import { Redirect, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { type } from "./AppReducer";
import "../../node_modules/bulma-extensions/bulma-pageloader/dist/css/bulma-pageloader.min.css"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import youshallnotpass from "../../you-shall-not-pass.gif"
import UsersMgmt from "./UsersMgmtComponents";
// import { useUserData } from "./useUserData"


const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()
  const state = useAppState()
  const session = async () => {
    await fetch("/uac/user")
      .then(res => {
        if (res.ok) return res.json()
        else throw "No hay session abierta"
      }).then((data) => {
        if (data) {
          var { username, email, isAdmin, accessInventarios, accessEmpresas, accessProductos, _id } = data
        }
        dispatch({ type: data ? type.LOG_IN : type.LOG_OUT, payload: data ? { username, email, isAdmin, accessInventarios, accessEmpresas, accessProductos, _id } : null })
        return
      })
      .catch(e => {
        console.error(e)
      })
    setIsLoading(false)
  }
  useEffect(async () => {
    session()
    return () => {
      session()
    };
  }, [pathname]);
  useEffect(() => {
    return setIsLoading(true)
  }, [])

  if (!isLoading) return (
    <>
      <div className={`pageloader is-info ${isLoading && "is-active"}`}><span className="title">Cargando app...</span></div>
      <Navbar />
      <Switch>
        <Route path="/clientes">
          {!state.userData ? <Redirect to="/login" /> : (state.userData.isAdmin || state.userData.accessEmpresas[0]) ? <JsonCliente accessEmpresas={state.userData.accessEmpresas}/> : <UnauthorizedComponent />}
        </Route>
        <Route path="/productos">
          {!state.userData ? <Redirect to="/login" /> : (state.userData.isAdmin || state.userData.accessProductos[0]) ? <ProductosUI accessProductos={state.userData.accessProductos} /> : <UnauthorizedComponent />}
        </Route>
        <Route path="/inventarios">
          {(!state.userData) ? <Redirect to="/login" /> : (state.userData.isAdmin || state.userData.accessInventarios[0]) ? <Inventory accessInventarios={state.userData.accessInventarios} /> : <UnauthorizedComponent />}
        </Route>
        <Route path="/admin/usuarios">
          {!state.userData ? <Redirect to="/login" /> : state.userData.isAdmin ? <UsersMgmt /> : <UnauthorizedComponent />}
        </Route>
        <Route path="/login">
          {state.userData ? <Redirect to="/" /> : <LoginComponent />}
        </Route>
        <Route path="/registro">
          {state.userData ? <Redirect to="/" /> : <SignupComponent />}
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
                  {/* <div onClick={() => ToastNotification("info", "Informacion informativa 😅")} className="button is-large">Notify me</div> */}
                </div>
              </section>
            </div>
          </>
        </Route>
      </Switch>
      <ToastContainer position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
    </>

  );
  else return (
    <div className={`pageloader is-info ${isLoading && "is-active"}`}><span className="title">Cargando app...</span></div>
  )
}

export const UnauthorizedComponent = () => {
  return (
    <div className="box has-background-danger">
      <div className="title has-text-centered has-text-white">🚧 No tienes acceso autorizado para este modulo 🚧</div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src={youshallnotpass} />
      </div>
    </div>
  )
}

export const toCapitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1)
export default App;
