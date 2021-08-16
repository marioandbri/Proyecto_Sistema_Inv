import React, { useState } from 'react';

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {


   const pageNumbers = [];
   for (let i = 1, j = Math.ceil(totalItems / itemsPerPage); i <= j; i++) {

      pageNumbers.push(i);
   }
   // let pageDivider = currentPage >= 5 ? Math.abs(5 - currentPage) + 1 : currentPage + 5
   // console.log(pageDivider)
   // const pageList = pageNumbers.splice(pageDivider, 3, '...')
   // console.log(pageList.slice())
   const pageDivider = currentPage >= 5 ? pageNumbers.slice(Math.abs(5 - currentPage), currentPage + 5) : pageNumbers.slice(currentPage - currentPage, 10 - pageNumbers.length)
   // Math.abs(5 - currentPage), Math.abs(10 - pageNumbers.length)
   return (
      <nav className="pagination is-centered is-small is-size-6 has-text-weight-medium" role="navigation" aria-label="pagination">
         <a onClick={() => paginate(currentPage == 1 ? currentPage : currentPage - 1)} className="pagination-previous">Previous</a>
         <a onClick={() => paginate(currentPage == pageNumbers.length ? currentPage : currentPage + 1)} className="pagination-next">Next page</a>
         <ul className="pagination-list">
            <li>
               <a onClick={(e) => { paginate(1, e) }} className="pagination-link">First Page</a>
            </li>
            <li><span className="pagination-ellipsis">&hellip;</span></li>
            {pageDivider.map((number) => (
               <li key={number}>
                  <a id={number} onClick={(e) => { paginate(number, e); }} className={`pagination-link ${number == 1 && currentPage == 1 ? 'is-current' : ''}`} aria-label={`Go to page ${number}`}>{number}</a>
               </li>
            ))

            }
            <li><span className="pagination-ellipsis">&hellip;</span></li>

            <li>
               <a onClick={(e) => { paginate(pageNumbers.length, e) }} className="pagination-link">Last Page:&nbsp;{pageNumbers.length}</a>
            </li>
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
