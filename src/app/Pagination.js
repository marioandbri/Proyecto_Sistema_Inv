import React, { useState } from 'react';

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {

   console.log(Math.ceil(totalItems / itemsPerPage))
   const pageNumbers = [];
   for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
   }
   console.log(itemsPerPage, totalItems, pageNumbers)
   return (
      <nav className="pagination is-centered is-small" role="navigation" aria-label="pagination">
         <a onClick={() => paginate(currentPage - 1)} className="pagination-previous">Previous</a>
         <a onClick={() => paginate(currentPage + 1)} className="pagination-next">Next page</a>
         <ul className="pagination-list">
            {pageNumbers.map((number) => (
               <li key={number}>
                  <a onClick={() => paginate(number)} className="pagination-link" aria-label={`Go to page ${number}`}>{number}</a>
               </li>
            ))

            }
         </ul>
      </nav>
   );
}

export const currentItems = (data, itemsPerPage, currentPage) => {
   // console.log(data)
   const indexOfLastItem = currentPage * itemsPerPage;
   // console.log(indexOfLastItem)
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   // console.log(indexOfFirstItem)
   // console.log(data.slice(indexOfFirstItem, indexOfLastItem), 'slice function @Pagination')
   return (data.slice(indexOfFirstItem, indexOfLastItem))


}

export default Pagination;
