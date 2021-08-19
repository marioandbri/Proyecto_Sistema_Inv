import React, { useState } from 'react';


const ProductoCreate = ({ mostrarFormulario}) => {

   return (
      <>
      <div className="block">
         <button type="button" onClick={mostrarFormulario} className="button is-success"><span>Ingresar un nuevo Producto</span><span className="icon"><i className="fas fa-plus"></i></span></button>

      </div>
      </>
   );
}

export default ProductoCreate;
