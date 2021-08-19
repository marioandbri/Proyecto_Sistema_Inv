import React from 'react';

const ProductoItem = ({ productType, descripcion, item }) => {
   console.log(descripcion)
   if (productType == "computadores") {
      return (
         <>
            <tr>
               <td>{item.tipoComputador} </td>
               <td>{item.partNumber} </td>
               <td>{item.marca} </td>
               <td>{item.modelo} </td>
               <td>{item.procesador} </td>
               <td>{item.almacenamiento.map(e => `* ${e.tipoAlmacenamiento} ${e.capacidadGB}GB`)} </td>
               <td>{item.socketsMemoria.map(e => `${e.capacidadGB}GB ${e.tipoMemoria}\n`)}</td>
               <td>{descripcion}</td>
            </tr>
         </>
      );
   }
   if(productType == "impresoras"){
      return (
         <>
         <tr>
            <td>{item.tipoImpresora.map(e => `${e} `)}</td>
            <td>{item.partNumber}</td>
            <td>{item.marca}</td>
            <td>{item.modelo}</td>
            <td>{item.modoImpresion}</td>
            <td>{item.conexiones.map(e=>`${e} `)}</td>
            <td>{descripcion}</td>
         </tr>
         </>
      )
   }
   // console.log(productType)
   return(
      <>
      <tr>
         <td>ALGO FALLO</td>
      </tr>
      </>
   )
}

export default ProductoItem;
