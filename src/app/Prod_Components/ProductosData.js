import React, { useEffect, useState } from 'react';

const ProductosData = (props) => {
   
   const [tableHeader, setTableHeader] = useState(["loading"]);
   console.log(tableHeader)
   useEffect(() => {
      setTableHeader(() => {
         let theader =[]
         for(let prop in props.JSONDATA){
            theader.push(prop)

         }
         return theader
      })
      return () => {
         cleanup
      };
   }, []);

   return (
      <>
         <div className="box">
            <table className="table is-narrow is-hoverable">
               <thead>
                  <tr>
                  {tableHeader.map((elem, index)=>(
                     <th key={index}>
                        {elem}
                     </th>
                  ))}
                  </tr>
               </thead>
            </table>
         </div>
      </>
   );
}

export default ProductosData;
