import React, { useState } from 'react';

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {

   // console.log(Math.ceil(totalItems / itemsPerPage))
   const [activePage, setActivePage] = useState();
   const [isActive, setisActive] = useState('is-current');
   const pageNumbers = [];
   for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
   }


   return (
      <nav className="pagination is-centered is-small is-size-6 has-text-weight-medium" role="navigation" aria-label="pagination">
         <a onClick={() => paginate(currentPage == 1 ? currentPage : currentPage - 1)} className="pagination-previous">Previous</a>
         <a onClick={() => paginate(currentPage == pageNumbers.length ? currentPage : currentPage + 1)} className="pagination-next">Next page</a>
         <ul className="pagination-list">
            {pageNumbers.map((number) => (
               <li key={number}>
                  <a id={number} onClick={(e) => { paginate(number, e); }} className={`pagination-link ${number == 1 ? 'is-current' : ''}`} aria-label={`Go to page ${number}`}>{number}</a>
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
