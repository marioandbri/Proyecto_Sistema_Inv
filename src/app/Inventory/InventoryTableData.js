import React, { useState, useRef, useEffect } from "react";
import {
	useTable,
	useSortBy,
	useFilters,
	usePagination,
	useGroupBy,
	useExpanded,
} from "react-table";
import { UseRTPagination } from "../useRTPagination";
import ColumnFilter from "./ColumnFilter";
import LoadingBar from "../LoadingBar";
import TableDataButtons from "./TableDataButtons";
import EditableCell from "./EditableCell";
import { useDispatch, useInventory } from "./InventoryProvider";
import { type } from "./InventoryReducer";
import TableEditingButtons from "./TableEditingButtons";
import { useAppState } from "../AppProvider";

const InventoryTableData = () => {
	const dispatch = useDispatch();
	const globalState = useInventory();
	// const { loading, data: inventoryData } = useFetch("inventario");
	const [loading, setLoading] = useState(true);
	const [inventoryData, setInventoryData] = useState([]);
	const [skipPageReset, setSkipPageReset] = React.useState(false);
	const { accessInventarios } = useAppState().userData;
	useEffect(() => {
		fetchData();
		return () => {};
	}, []);

	const fetchData = async () => {
		setLoading(true);
		const result = await fetch("/inventario");
		const resData = await result.json();
		setLoading(false);
		setInventoryData(resData);
	};
	const inventoryRef = useRef([]);

	const updateData = (newData, rowIndex) => {
		setInventoryData((old) =>
			old.map((row, index) => {
				if (index == rowIndex) {
					return newData;
				}
				return row;
			})
		);
	};
	const updateValues = (rowIndex, columnId, value) => {
		inventoryRef.current[rowIndex][columnId] = value;
	};
	const onlyDate = (stringDatetime) => {
		if (!stringDatetime) {
			return null;
		}
		// console.log(stringDatetime, "////String de fecha con Problema ////");
		const date = new Date(stringDatetime);
		console.log(date, "////fecha con problema////");
		const formatedDate = new Intl.DateTimeFormat("es-CL", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		}).format(date);
		const result = [];
		formatedDate.split("-").forEach((e) => {
			result.unshift(e);
		});
		return result.join("-");
	};
	const data = React.useMemo(() => inventoryData, [inventoryData]);

	const columns = React.useMemo(
		() => [
			{
				Header: "Numero de Serie",

				accessor: "numeroSerie", // accessor is the "key" in the data

				aggregate: "count",
				Aggregated: ({ value }) => `${value} elementos`,
			},

			{
				Header: "Part Number",

				accessor: "productPN",

				aggregate: "uniqueCount",
				Aggregated: ({ value }) => `${value} Numeros de Parte`,
			},
			{
				Header: "Descripción",

				accessor: "producto.shortDescription",
				// aggregate: 'uniqueCount',
				// Aggregated: ({ value }) => `${value} Descripciones`
			},
			{
				Header: "Rut Poseedor",

				accessor: "rutPoseedor",

				aggregate: "uniqueCount",
				Aggregated: ({ value }) => `${value} Poseedor Unico`,
			},
			{
				Header: "Poseedor",

				accessor: "poseedor.razon_social",

				// aggregate: 'uniqueCount',
				// Aggregated: ({ value }) => `${value} Poseedor Unicos`
			},
			// {
			// 	Header: "F. Compra",

			// 	accessor: "fechaCompra",
			// 	Cell: ({ value }) => onlyDate(value),
			// },
			// {
			// 	Header: "RUT Proveedor",

			// 	accessor: "rutProveedor",

			// 	aggregate: "uniqueCount",
			// 	Aggregated: ({ value }) => `${value} Rut Proveedor Unicos`,
			// },
			// {
			// 	Header: "Proveedor",

			// 	accessor: "proveedor.razon_social",

			// 	// aggregate: 'uniqueCount',
			// 	// Aggregated: ({ value }) => `${value} Proveedor Unicos`
			// },
			// {
			// 	Header: "Factura Nro",

			// 	accessor: "nroFactura",

			// 	aggregate: "uniqueCount",
			// 	Aggregated: ({ value }) => `${value} Facturas Unicas`,
			// },
			{
				Header: "Estado",

				accessor: "estado",

				// aggregate: 'uniqueCount',
				// Aggregated: ({ value }) => `${value} Facturas Unicas`
			},
			{
				Header: "F. Evento",

				accessor: "fechaEvento",

				Cell: ({ value }) => onlyDate(value),

				// aggregate: 'uniqueCount',
				// Aggregated: ({ value }) => `${value} Fechas Unicas`
			},
			{
				Header: "Guia",

				accessor: "nroGuia",

				aggregate: "uniqueCount",
				Aggregated: ({ value }) => `${value} guias únicas`,
			},
		],
		[]
	);
	const sortUpIcon = (
		<span className="icon has-text-info is-size-7 ml-1">
			<i className="fas fa-sort-amount-up"></i>
		</span>
	);
	const sortDownIcon = (
		<span className="icon has-text-info is-size-7 ml-1">
			<i className="fas fa-sort-amount-down"></i>
		</span>
	);
	const sortIcon = (
		<span className="icon is-size-7  ml-1">
			<i className="fas fa-sort"></i>
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
			autoResetFilters: !skipPageReset,
			autoResetSortBy: !skipPageReset,
			autoReset: !skipPageReset,
			updateValues,
			inventoryRef,
		},
		useFilters,
		useGroupBy,
		useSortBy,
		useExpanded,
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
		// oldData.current[index] = { ...inventoryData[index] }; //Shallow copy of the inventory data array at index parameter position
		inventoryRef.current[index] = { ...inventoryData[index] };
		setSkipPageReset(true);
		dispatch({ type: type.EDIT_ROW, payload: index });
	};
	const cancelEditRow = (index) => {
		setSkipPageReset(false);
		dispatch({ type: type.EDIT_ROW, payload: index });
	};

	const restoreData = (index) => {
		inventoryRef.current[index] = undefined;
	};
	const finalEditRow = (index) => {
		dispatch({ type: type.EDIT_ROW, payload: index });
	};

	if (!loading) {
		return (
			<>
				<div className="table-container">
					<table
						style={{ width: "99.5%" }}
						className="table is-fullwidth is-hoverable"
						{...getTableProps()}
					>
						<thead className="has-background-info-light">
							{headerGroups.map((headerGroup, i) => (
								<tr key={i} {...headerGroup.getHeaderGroupProps()}>
									{headerGroup.headers.map((column, ii) => (
										<th
											style={{
												position: "relative",
												border: ".25px solid hsl(0, 0%, 86%)",
											}}
											key={ii}
											className="is-size-7"
											{...column.getHeaderProps()}
										>
											{column.canGroupBy ? (
												<span {...column.getGroupByToggleProps()}>
													{column.isGrouped ? "🛑 " : "💠 "}
												</span>
											) : null}
											{column.render("Header")}
											<span
												{...column.getSortByToggleProps()}
												style={{
													cursor: "pointer",
													position: "absolute",
													right: "-.35rem",
													top: ".25rem",
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

									{accessInventarios[3] && (
										<th
											className="is-size-7"
											style={{
												position: "relative",
												border: ".25px solid hsl(0, 0%, 86%)",
												lineHeight: 5,
												textAlign: "center",
											}}
										>
											Acciones
										</th>
									)}
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
												<td
													key={index}
													{...cell.getCellProps()}
													style={{
														background: cell.isGrouped
															? "#0aff0082"
															: cell.isAggregated
															? "#ffa50078"
															: "",
													}}
												>
													{cell.isGrouped ? (
														<>
															<span {...row.getToggleRowExpandedProps()}>
																{row.isExpanded ? "⏬ " : "⏩ "}
															</span>
															{cell.render("Cell")}({row.subRows.length})
														</>
													) : cell.isAggregated ? (
														cell.render("Aggregated")
													) : cell.isPlaceholder ? null : (
														cell.render("Cell")
													)}
												</td>
											);
										})}
										{accessInventarios[3] ? (
											!globalState.editingRows.includes(row.index) ? (
												<TableDataButtons
													editRow={editRow}
													index={index}
													row={row}
													reloadData={fetchData}
												/>
											) : (
												<TableEditingButtons
													updatedData={inventoryRef.current[row.index]}
													index={row.index}
													updateData={updateData}
													cancelEditRow={cancelEditRow}
													finalEditRow={finalEditRow}
													restoreData={restoreData}
												/>
											)
										) : null}
									</tr>
								);
							})}
						</tbody>
						<tfoot className="has-background-info-light">
							<tr className="has-text-weight-bold">
								{!state.groupBy[0] && (
									<td
										colSpan={`${accessInventarios[3] ? "12" : "11"}`}
										className="has-text-info has-text-weight-semibold"
									>
										Total de elementos encontrados:{" "}
										<span className="has-text-weight-bold">{filas.length}</span>
									</td>
								)}
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
