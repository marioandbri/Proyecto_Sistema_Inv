import React, { useState } from "react";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import { useFetch } from "../useFetch";
import { UseRTPagination } from "../useRTPagination";
import ColumnFilter from "./ColumnFilter";
import LoadingBar from "../LoadingBar";

const InventoryTableData = () => {
  const { loading, data: inventoryData } = useFetch("inventario");
  console.log(inventoryData);
  const data = React.useMemo(() => inventoryData, [loading]);
  console.log(data);
  const [readMore, setReadMore] = useState(false);
  const toggleReadMore = () => {
    setReadMore(!readMore);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Numero de Serie",

        accessor: "numeroSerie", // accessor is the "key" in the data
      },

      {
        Header: "Numero de Parte",

        accessor: "productPN",
      },
      {
        Header: "Rut Poseedor",

        accessor: "rutPoseedor",
      },
      {
        Header: "Fecha de Compra",

        accessor: "fechaCompra",
      },
      {
        Header: "Proveedor",

        accessor: "rutProveedor",
      },
      {
        Header: "Factura Nro",

        accessor: "nroFactura",
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

  if (!loading) {
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
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
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
                    if (cell.column.id == "productPN") {
                      console.log(cell.value.substring(0, 100));
                      return (
                        <td {...cell.getCellProps()}>
                          {readMore
                            ? cell.render("Cell")
                            : cell.value.substring(0, 100)}
                          <a
                            onClick={() => {
                              toggleReadMore();
                            }}
                          >
                            {!readMore ? "...Ver Mas" : ". Ver Menos"}
                          </a>
                        </td>
                      );
                    } else {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    }
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>{PaginationComponent}</div>
      </>
    );
  } else {
    return (
      <div className="box">
        <LoadingBar />
      </div>
    );
  }
};

export default InventoryTableData;
