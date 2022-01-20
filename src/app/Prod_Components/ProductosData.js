import React, { useEffect, useState } from "react";
import ProductoItem from "./ProductoItem";
import LoadingBar from "../LoadingBar";
import SortingButton from "../SortingButton";
import Ptp from "prop-types";

const ProductosData = ({
	loading,
	data,
	headers,
	productType,
	handleEdit,
	handleEye,
	handleRemove,
	sortingData,
	accessProductos,
}) => {
	// console.log(loading, productType);
	if (loading) {
		return <LoadingBar />;
	}
	const initialState = {
		tableHeader: [],
		tableData: [],
	};

	const [tableHeader, setTableHeader] = useState(initialState.tableHeader);
	const [tableData, setTableData] = useState(initialState.tableData);
	// const [items, setItems] = useState(initialState.items);

	const cargarHeaders = () => {
		setTableHeader(headers);
	};
	const cargarData = () => {
		setTableData(data);
		setItems(data);
	};

	useEffect(() => {
		cargarHeaders();
		cargarData();
		console.log("data changed");

		return () => {};
	}, [headers, data]);
	useEffect(() => {
		setTableHeader(headers);
		setTableData(data);
		return () => {
			setTableHeader(initialState.tableHeader);
		};
	}, []);

	// console.log(tableData, 'tableData ProductosData')
	const [items, setItems] = useState(data);
	// console.log(items, 'items')
	useEffect(() => {
		console.log(data, items);
		console.log("items changed");
		return () => {};
	}, [items]);

	return (
		<>
			<div className="box block">
				<div className="table-container">
					<table className="table is-narrow is-hoverable is-fullwidth">
						<thead className="">
							<tr className="">
								{/* {console.log(data)} */}
								{tableHeader !== initialState.tableHeader &&
								!tableHeader.includes("Not Found") ? (
									tableHeader.map((elem, index) => (
										<th className="mr-4" key={index}>
											<span className="is-clickable">
												{elem}
												<SortingButton
													setItems={setItems}
													productType={productType}
													fieldName={elem}
													sortingData={sortingData}
													field={
														!productType.includes("generic")
															? tableData.map((e) => e.item)
															: tableData
													}
												/>
											</span>
										</th>
									))
								) : (
									<th>Sin Resultados</th>
								)}
								{!productType.includes("generic") ? (
									<th>Descripcion</th>
								) : (
									<th></th>
								)}
							</tr>
						</thead>
						<tbody>
							{/* {items.map(e => console.log(e, 'items map'))} */}
							{items.map((elem) => (
								<ProductoItem
									handleEdit={handleEdit}
									handleRemove={handleRemove}
									handleEye={handleEye}
									productType={productType}
									key={elem.partnumber}
									item={elem}
									accessProductos={accessProductos}
									descripcion={elem.extraDescription || ""}
								/>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};
ProductosData.propTypes = {
	loading: Ptp.bool,
	data: Ptp.array,
	headers: Ptp.array,
	productType: Ptp.string,
	handleEdit: Ptp.func,
	handleEye: Ptp.func,
	handleRemove: Ptp.func,
	sortingData: Ptp.func,
	accessProductos: Ptp.arrayOf(Ptp.bool).isRequired,
};
export default ProductosData;
