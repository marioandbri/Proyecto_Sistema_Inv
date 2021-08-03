import React, { Component } from 'react';

class Navbar extends Component {
   render() {
      return (
         <nav className="navbar is-info" role="navigation" aria-label="main navigation">
            <div className='container'>
               <div className="navbar-brand">
                  <a href="/" className="navbar-item">
                     <img src="./arrienda.webp" className="is-spaced"></img>
                  </a>
                  <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navMenu">
                     <span aria-hidden="true"></span>
                     <span aria-hidden="true"></span>
                     <span aria-hidden="true"></span>
                  </a>
               </div>
               <div className="navbar-menu" id="navMenu">
                  <div className="navbar-start title is-4">
                     <a className="navbar-item" href="/">Inicio</a>
                     <a className="navbar-item" href="/cliente">Gestion de Clientes</a>
                     <a className="navbar-item" href="/ubicaciones">Gestion de Ubicaciones</a>
                     <a className="navbar-item" href="/ot">Ordenes de Trabajo</a>
                  </div>
               </div>
            </div>
         </nav>
      );
   }
}

export default Navbar;
