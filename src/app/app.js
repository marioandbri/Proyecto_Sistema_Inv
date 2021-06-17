import e from 'connect-flash';
import React, {Component} from 'react';

class App extends Component {
   render() {
      return (
         <div>
            <nav className="navbar" role="navigation" aria-label="main navigation">
               <div className="navbar-brand">
                  <a className="navbar-item" href="/">
                     <img src="./arrienda.png"></img>
                  </a>
               </div>
            </nav>
         </div>
      )
   }
};
export default App;