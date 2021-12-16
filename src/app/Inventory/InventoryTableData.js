import React, { useState, useRef, useEffect } from "react";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import { UseRTPagination } from "../useRTPagination";
import ColumnFilter from "./ColumnFilter";
import LoadingBar from "../LoadingBar";
import TableDataButtons from "./TableDataButtons";
import EditableCell from "./EditableCell";
import { useDispatch, useInventory } from "./InventoryProvider";
import { type } from "./InventoryReducer";
import TableEditingButtons from "./TableEditingButtons";

const InventoryTableData = () => {
  const dispatch = useDispatch();
  const globalState = useInventory();
  // const { loading, data: inventoryData } = useFetch("inventario");
  const [loading, setLoading] = useState(true);
  const [inventoryData, setInventoryData] = useState([]);
  const [skipPageReset, setSkipPageReset] = React.useState(false);
  useEffect(() => {
    fetchData();
    return () => { };
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const result = await fetch("/inventario");
    const resData = await result.json();
    setLoading(false);
    setInventoryData(resData);
  };

  const updateData = (rowIndex, columnId, value) => {
    // setSkipPageReset(true);
    setInventoryData((old) =>
      old.map((row, index) => {
        if (index == rowIndex) {
          return { ...old[rowIndex], [columnId]: value };
        }
        return row;
      })
    );
    // console.log(value);
  };
  // console.log(inventoryData);
  const data = React.useMemo(() => inventoryData, [inventoryData]);
  // const data = inventoryData;
  // console.log(data);

  const columns = React.useMemo(
    () => [
      {
        Header: "Numero de Serie",

        accessor: "numeroSerie", // accessor is the "key" in the data
      },

      {
        Header: "Part Number",

        accessor: "productPN",
      },
      {
        Header: "Descripción",

        accessor: "descripcion",
      },
      {
        Header: "Rut Poseedor",

        accessor: "rutPoseedor",
      },
      {
        Header: "Poseedor",

        accessor: "poseedor",
      },
      {
        Header: "F. Compra",

        accessor: "fechaCompra",
      },
      {
        Header: "RUT Proveedor",

        accessor: "rutProveedor",
      },
      {
        Header: "Proveedor",

        accessor: "proveedor",
      },
      {
        Header: "Factura Nro",

        accessor: "nroFactura",
      },
    ],
    []
  );
  const sortUpIcon = (
    <span className="icon has-text-info is-size-6 ml-1">
      <i className="fas fa-sort-amount-up"></i>
    </span>
  );
  const sortDownIcon = (
    <span className="icon has-text-info is-size-6 ml-1">
      <i className="fas fa-sort-amount-down"></i>
    </span>
  );
  const sortIcon = (
    <span className="icon is-size-6  ml-1">
      <i className="fas fa-filter"></i>
    </span>
  );
  const defaultColumn = React.useMemo(() => {
    return { Cell: EditableCell, Filter: ColumnFilter };
  }, []);
  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn,
      autoResetPage: !skipPageReset,
      updateData,
      restoreData,
    },
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
    rows: filas,
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
  // console.log(state);
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
  let rows = useRef([]);
  const oldData = useRef([]);

  const editRow = (index) => {
    oldData.current[index] = { ...inventoryData[index] };
    setSkipPageReset(true);
    dispatch({ type: type.EDIT_ROW, payload: index });
  };
  const cancelEditRow = (index) => {
    dispatch({ type: type.EDIT_ROW, payload: index });
    // setSkipPageReset(false);
  };

  const restoreData = (index) => {
    let oldItem = oldData.current[index];
    let array = [...inventoryData];
    array[index] = oldItem;
    setInventoryData(array);
  };
  const finalEditRow = (index) => {
    dispatch({ type: type.EDIT_ROW, payload: index });
  };

  if (!loading) {
    return (
      <>
        <div className="table-container">

          <table className="table is-fullwidth" {...getTableProps()}>
            <thead className="has-background-info-light">
              {headerGroups.map((headerGroup, i) => (
                <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, ii) => (
                    <th
                      key={ii}
                      className="is-size-7"
                      {...column.getHeaderProps()}
                    // {...column.getSortByToggleProps()}
                    >
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
                  <th></th>
                </tr>
              ))}
            </thead>
            <tbody className="is-size-7" {...getTableBodyProps()}>

              {page.map((row, index) => {
                prepareRow(row);
                return (
                  <tr key={index} {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      rows.current[index] = false;
                      return (
                        <td key={index} {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                    {!globalState.editingRows.includes(row.index) ? (
                      <TableDataButtons
                        editRow={editRow}
                        index={index}
                        row={row}
                        reloadData={fetchData}
                      />
                    ) : (
                      <TableEditingButtons
                        row={row}
                        index={index}
                        reloadData={fetchData}
                        updateData={updateData}
                        cancelEditRow={cancelEditRow}
                        finalEditRow={finalEditRow}
                        restoreData={restoreData}
                      />
                    )}
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="has-background-info-light">
              <tr className="has-text-weight-bold">
                <td colSpan={10} className="has-text-info">Total de elementos encontrados: <span className="has-text-weight-normal">{filas.length}</span></td>
              </tr>
            </tfoot>
          </table>
        </div>
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
