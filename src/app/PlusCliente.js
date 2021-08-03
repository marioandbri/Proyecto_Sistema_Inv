import React, { useEffect } from "react"

function PlusCliente(props) {
   return (
      <tr>
         <td colSpan="7">

            <button className="button is-success" onClick={props.cC} >
               <span className="icon">
                  <i className="fas fa-plus"></i>
               </span>
            </button>
         </td>
      </tr>
   )
}

export default PlusCliente