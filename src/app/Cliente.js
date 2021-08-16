import React from 'react';
import LoadingBar from './LoadingBar';
import { currentItems } from './Pagination';

const Cliente = ({ clientes, loading, handleEdit, deleteCliente, clientesPerPage, currentPage }) => {

   if (loading) {
      return <LoadingBar />
   }
   // console.log(clientes, 'pre const declaration @Cliente')
   // console.log(clientesPerPage, currentPage)
   const currentClientes = currentItems(clientes, clientesPerPage, currentPage)
   // console.log(currentClientes, 'post const declaration @Cliente')
   return (
      <>
         {/* {this.state.data.map((cliente, key) => {
            return (
               <tr key={key}>
                  <Cliente key={cliente.rut} {...cliente} />
                  <td align="center"><button className="button is-link is-small" onClick={() => this.handleEdit(cliente.rut)}><span className="icon"><i className="fas fa-edit"></i></span></button></td>
                  <td align="center"><button className="button is-danger is-small" onClick={() => this.deleteCliente(cliente.rut, cliente.razonsocial)}><span className="icon"><i className="fas fa-minus-circle"></i></span></button></td>
               </tr>
            )
         })} */}
         {currentClientes.map((cliente, index) => (
            <tr key={cliente.rut}>
               <td title={cliente.razonsocial}>{cliente.razonsocial/*.length > 30 ? cliente.razonsocial.slice(0, 20) + '...' : cliente.razonsocial*/}</td>
               <td>{cliente.rut}</td>
               <td title={cliente.ubicacion}>{cliente.ubicacion.length > 30 ? cliente.ubicacion.slice(0, 30) + '...' : cliente.ubicacion}</td>
               <td>{cliente.telefonocontacto}</td>
               <td>{cliente.personacontacto}</td>
               <td>{cliente.createdat}</td>
               <td align="center"><button className="button is-link is-small" onClick={() => handleEdit(cliente.rut)}><span className="icon"><i className="fas fa-edit"></i></span></button></td>
               <td align="center"><button className="button is-danger is-small" onClick={() => deleteCliente(cliente.rut, cliente.razonsocial)}><span className="icon"><i className="fas fa-minus-circle"></i></span></button></td>
            </tr>
         )
         )}

      </>
   )
}

export default Cliente;
