import React from "react";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import { UseRTPagination } from "../useRTPagination";
import ColumnFilter from "./ColumnFilter";
import MOCK_DATA from "./MOCK_DATA.json";

const InventoryTableData = () => {
  const data = React.useMemo(() => MOCK_DATA, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Column 1",

        accessor: "col1", // accessor is the "key" in the data
      },

      {
        Header: "Column 2",

        accessor: "col2",
      },
    ],
    []
  );
  const sortUpIcon = (
    <span className="icon has-text-info ml-1">
      <i className="fas fa-sort-amount-up"></i>
    </span>
  );
  const sortDownIcon = (
    <span className="icon has-text-info ml-1">
      <i className="fas fa-sort-amount-down"></i>
    </span>
  );
  const sortIcon = (
    <span className="icon ml-1">
      <i className="fas fa-filter"></i>
    </span>
  );
  const defaultColumn = React.useMemo(() => {
    return { Filter: ColumnFilter };
  }, []);
  const tableInstance = useTable(
    { columns, data, defaultColumn },
    useFilters,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    prepareRow,
  } = tableInstance;

  const { pageIndex, pageSize } = state;
  const paginationProps = {
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    pageIndex,
    gotoPage,
    pageCount,
    setPageSize,
    pageSize,
  };
  console.log(state);
  const PaginationComponent = UseRTPagination(paginationProps);
  /**
   * nextPage => next page function ()
   * previousPage => previous page function ()
   * canNextPage && canPreviousPage => validation
   * pageOptions => page object and length
   * pageIndex => currentPage
   * gotoPage => go to a specific Page
   * pageCount => total number of pages?
   * setPageSize => function to set a desired amount of items per page
   * pageSize => value for items per page
   */

  return (
    <>
      <table className="table is-fullwidth" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                  <span
                    onClick={() => {
                      column.toggleSortBy();
                    }}
                  >
                    {column.isSorted
                      ? column.isSortedDesc
                        ? sortUpIcon
                        : sortDownIcon
                      : sortIcon}
                  </span>
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>{PaginationComponent}</div>
    </>
  );
};

export default InventoryTableData;
