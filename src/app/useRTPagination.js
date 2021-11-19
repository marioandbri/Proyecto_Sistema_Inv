/* eslint-disable react/prop-types */
import React from "react";

export const UseRTPagination = (props) => {
  // console.log(props);
  const {
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    pageIndex,
    gotoPage,
    //pageCount,
    //setPageSize,
    //pageSize,
  } = props;
  let currentPage = pageIndex + 1;
  let pageNumbers = pageOptions.map((n) => n + 1);
  const pageDivider =
    currentPage > 5
      ? pageNumbers.slice(Math.abs(5 - currentPage), currentPage + 5)
      : pageNumbers.slice(currentPage - currentPage, 10 - pageNumbers.length);

  return (
    <>
      <nav
        className="pagination is-centered is-small is-size-6 has-text-weight-medium"
        role="navigation"
        aria-label="pagination"
      >
        <a
          onClick={() => previousPage()}
          className="pagination-previous"
          disabled={!canPreviousPage}
        >
          <span className="icon">
            <i className="fas fa-caret-left" />
          </span>
        </a>
        <a
          onClick={() => {
            nextPage();
          }}
          className="pagination-next"
          disabled={!canNextPage}
        >
          <span className="icon">
            <i className="fas fa-caret-right" />
          </span>
        </a>
        <ul className="pagination-list">
          <li>
            <a
              onClick={() => {
                gotoPage(0);
              }}
              className="pagination-link is-small"
              disabled={!canPreviousPage}
            >
              1{" "}
              <span className="icon">
                <i className="fas fa-angle-double-left"></i>
              </span>
            </a>
          </li>
          <li>
            <span className="pagination-ellipsis">&hellip;</span>
          </li>
          {pageDivider.map((number) => (
            <li key={number}>
              <a
                id={number}
                onClick={() => {
                  gotoPage(number - 1);
                }}
                className={`pagination-link ${
                  number == currentPage ? "is-current" : ""
                }`}
                aria-label={`Go to page ${number}`}
              >
                {number}
              </a>
            </li>
          ))}
          <li>
            <span className="pagination-ellipsis">&hellip;</span>
          </li>

          <li>
            <a
              onClick={() => {
                gotoPage(pageOptions.length - 1);
              }}
              className="pagination-link is-small"
              disabled={!canNextPage}
            >
              <span className="icon">
                <i className="fas fa-angle-double-right"></i>
              </span>
              {" " + pageOptions.length}
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};
