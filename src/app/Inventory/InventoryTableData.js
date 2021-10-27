import React from "react";
import { useTable, useSortBy, useFilters } from "react-table";
import ColumnFilter from "./ColumnFilter";

const InventoryTableData = () => {
  const data = React.useMemo(
    () => [
      {
        col1: "Hello",

        col2: "World",
      },

      {
        col1: "react-table",

        col2: "rocks",
      },

      {
        col1: "whatever",

        col2: "you want",
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Column 1",

        accessor: "col1", // accessor is the "key" in the data
        Filter: ColumnFilter,
      },

      {
        Header: "Column 2",

        accessor: "col2",
        Filter: ColumnFilter,
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
  const tableInstance = useTable({ columns, data }, useFilters, useSortBy);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
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
          {rows.map((row) => {
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
    </>
  );
};

export default InventoryTableData;
