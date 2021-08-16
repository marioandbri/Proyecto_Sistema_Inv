import React, { Component } from 'react';
import ProductosData from './Prod_Components/ProductosData';
// import PropTypes from 'prop-types';
const JSONDATA = require('./Prod_Components/jsonexample.json')

class ProductosUI extends Component {
   render() {
      return (
         <>
            <div className="container is-fluid">
               <div className="box">
               <h1 className="title"> Productos</h1>
               <ProductosData JSONDATA={JSONDATA}/>
               {/* <progress className="progress is-info" max="100"></progress> */}
               </div>
            </div>
         </>
      );
   }
}





export default ProductosUI;
