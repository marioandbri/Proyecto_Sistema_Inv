import React, {Component} from 'react';

class App extends Component {
   render() {
      return (
         <div>
            <nav className="navbar is-info" role="navigation" aria-label="main navigation">
               <div className="navbar-brand">
                  <a className="navbar-item" href="/">
                     <img src="./arrienda.webp" className="is-spaced"></img>
                  </a>
               </div>
                  <div className="navbar-menu">
                     <div className="navbar-start title is-4">
                        <a className="navbar-item" href="/">Inicio</a>
                        <a className="navbar-item" href="/cliente">Gestion de Clientes</a>
                        <a className="navbar-item" href="/ubicaciones">Gestion de Ubicaciones</a>
                        <a className="navbar-item" href="/ot">Ordenes de Trabajo</a>
                     </div>
                  </div>
            </nav>
         </div>
      )
   }
};
export default App;