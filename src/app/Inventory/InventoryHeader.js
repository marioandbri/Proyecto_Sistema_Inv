import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Filter from "../Filter";
import InventoryClientList from "./InventoryClientList";

import { useDispatch, useInventory } from "./InventoryProvider";
import { type } from "./InventoryReducer";
import ProductCard from "./ProductCard";
import { notificationTypes } from "../Notification";
import { useAppState } from "../AppProvider";

const InventoryHeader = ({ opType }) => {
	const state = useInventory();
	const dispatch = useDispatch();
	const { userData } = useAppState();
	useEffect(() => {
		dispatch({ type: type.setOperationType, payload: opType });
		return () => {
			setInnerState(initalState);
			dispatch({
				type: type.reInitializeData,
			});
		};
	}, [opType]);
	const initalState = {
		query: "",
		productPN: "",
		nroFactura: "",
		fechaCompra: "",
		fechaEvento: "",
		nroGuia: "",
		esVenta: false,
	};
	const [innerState, setInnerState] = useState(initalState);

	const setQuery = (value) => {
		let state = { ...innerState };
		state.query = value;
		setInnerState(state);
	};

	// const [query, setQuery] = useState("");
	// const [productPN, setProductPN] = useState("");
	// const [nroFactura, setNroFactura] = useState("");
	// const [fechaCompra, setFechaCompra] = useState("");
	const handleInputs = (elem) => {
		let state = { ...innerState };
		state[elem.target.name] =
			elem.target.name == "productPN"
				? elem.target.value.toUpperCase()
				: elem.target.value;
		setInnerState(state);
	};

	const id = opType;

	const getProductData = async () => {
		const result = await fetch(`/producto/partnumber/${innerState.productPN}`);
		const data = await result.json();
		if (!data.item) {
			dispatch({
				type: type.addNotification,
				payload: {
					content: "🤔 Lo siento, No se encontró ningún producto coincidente",
					notificationType: notificationTypes.warning,
				},
			});
			dispatch({ type: type.setProductData, payload: "" });
			//
		} else {
			dispatch({ type: type.setProductData, payload: data });
		}
	};

	const selectClient = useCallback((e) => {
		console.log(e.rut);
		setQuery(e.razon_social);
		dispatch({ type: type.selectClient, payload: e.rut });
	}, []);

	const selectPossesor = useCallback((e) => {
		console.log(e.rut);
		setQuery(e.razon_social);
		dispatch({ type: type.selectPossesor, payload: e.rut });
	}, []);

	const buildHeader = () => {
		const {
			productPN,
			nroFactura,
			fechaCompra,
			fechaEvento,
			nroGuia,
			esVenta,
		} = innerState;
		let header;
		if (opType == "ingreso") {
			let rutProveedor = state.rutProveedor;
			header = {
				rutProveedor,
				productPN,
				nroFactura,
				fechaCompra,
				rutPoseedor: "78507660-5",
			};
			console.log(header);
		} else {
			header = {
				fechaEvento,
				rutPoseedor: opType == "retiro" ? "78507660-5" : state.rutPoseedor,
				nroGuia,
				esVenta,
			};
		}
		if (
			(opType == "ingreso" &&
				(!header.rutProveedor ||
					!header.productPN ||
					!header.nroFactura ||
					!header.fechaCompra)) ||
			(opType != "ingreso" &&
				(!header.fechaEvento || !header.rutPoseedor || !header.nroGuia))
		) {
			console.log("aun hay campos vacios");
		} else {
			console.log(header);
			dispatch({ type: type.setProductsHeader, payload: header });
		}
	};
	const resetState = () => {
		dispatch({ type: type.reInitializeData, payload: "" });
		setInnerState(initalState);
	};
	useEffect(() => {
		if (opType == "ingreso" && state.rutProveedor == "") {
			setInnerState(initalState);
		} else if (opType != "ingreso") {
			setInnerState(initalState);
		}
		return () => {};
	}, [state.rutProveedor, opType]);

	return (
		<>
			<div className="box mb-1">
				<nav className="level">
					<div className="level-left">
						<fieldset disabled={state.loadingClientes}>
							<div className="field has-addons">
								<Filter query={innerState.query} setQuery={setQuery} />
								<div className="control">
									<a
										className={`button ${
											state.loadingClientes ? "is-loading" : "is-static"
										}`}
									>
										Busqueda de empresas
										{/* <span className="icon">
                    <i className="fas fa-spinner"></i>
                  </span> */}
									</a>
								</div>
							</div>
						</fieldset>
					</div>
				</nav>
			</div>
			{opType == "ingreso" ? (
				<InventoryClientList
					query={innerState.query}
					selectClient={selectClient}
				/>
			) : (
				<InventoryClientList
					query={innerState.query}
					selectClient={selectPossesor}
				/>
			)}

			<div className="box mb-1">
				<div className="columns">
					<div className="column">
						<fieldset
							title={
								!(state.rutProveedor || state.rutPoseedor)
									? "Escriba en el cuadro de busqueda y seleccione un cliente"
									: null
							}
							disabled={!(state.rutProveedor || state.rutPoseedor)}
						>
							<div
								className="field is-grouped is-grouped-multiline"
								style={{ maxWidth: "fit-content" }}
							>
								<div className="control block">
									<label className="label">
										{id == "ingreso" ? "RUT Proveedor" : "RUT Cliente"}
									</label>
									<input
										readOnly
										disabled
										type="text"
										className="input is-small"
										value={
											state.operationType == "ingreso"
												? state.rutProveedor
												: state.rutPoseedor
										}
									/>
								</div>

								<div className="control block ">
									<label className="label">
										{state.operationType == "ingreso"
											? "Fecha de Compra"
											: "Fecha de Evento"}
									</label>
									<div className="control has-icons-right">
										<input
											onChange={(e) => {
												handleInputs(e);
											}}
											onBlur={() => {
												buildHeader();
											}}
											type="date"
											placeholder="dd-mm-yyyy"
											className="input is-small"
											name={
												state.operationType == "ingreso"
													? "fechaCompra"
													: "fechaEvento"
											}
											value={
												state.operationType == "ingreso"
													? innerState.fechaCompra
													: innerState.fechaEvento
											}
										/>
										<span className="icon is-small is-right">
											<i className="fas fa-calendar-alt"></i>
										</span>
									</div>
								</div>

								{state.operationType == "ingreso" ? (
									<div className="control block">
										<label className="label">Numero de Factura</label>
										<input
											onChange={(e) => {
												handleInputs(e);
											}}
											onBlur={() => {
												buildHeader();
											}}
											type="text"
											className="input is-small"
											name="nroFactura"
											value={innerState.nroFactura}
										/>
									</div>
								) : (
									<div className="control block">
										<label className="label">Número de Guia</label>
										<input
											onChange={(e) => {
												handleInputs(e);
											}}
											onBlur={() => {
												buildHeader();
											}}
											type="number"
											className="input is-small"
											name="nroGuia"
											value={innerState.nroGuia}
										/>
									</div>
								)}
							</div>
							{/* /////////////// */}
							<label className="label">Numero de Parte</label>
							<div
								className="field has-addons"
								style={{ maxWidth: "fit-content" }}
							>
								<span className="control">
									<input
										onChange={(e) => {
											handleInputs(e);
										}}
										onBlur={() => {
											buildHeader();
										}}
										type="list"
										className="input is-small "
										name="productPN"
										value={innerState.productPN}
										placeholder={
											opType == "ingreso" ? "Requerido" : "Solo para consulta"
										}
									/>
								</span>
								<div className="control">
									<a
										onClick={() => {
											getProductData();
											dispatch({
												type: type.setPN,
												payload: innerState.productPN,
											});
										}}
										className="button is-info is-small"
									>
										Buscar
									</a>
								</div>
								{userData.accessInventarios[1] && opType === "entrega" && (
									<div className=" ml-4 field">
										<input
											type="checkbox"
											onChange={(e) => {
												setInnerState({
													...innerState,
													esVenta: e.target.checked,
												});
											}}
											onBlur={() => {
												buildHeader();
											}}
											checked={innerState.esVenta}
										/>
										<span> Marcar si es una venta</span>
									</div>
								)}
							</div>
							<a
								className="button is-info is-small"
								onClick={() => {
									resetState();
								}}
							>
								<span className="icon is-small">
									<i className="fas fa-undo"></i>
								</span>
								<span> Limpiar Campos</span>
							</a>
						</fieldset>
					</div>
					<div className="column">
						{state.productData.item ? (
							<ProductCard
								description={state.productData?.description || "vacio"}
								marca={state.productData?.item?.marca || "marca"}
								modelo={state.productData?.item?.modelo}
								familia={state.productData?.item?.familia || "familia"}
								partnumber={state.partNumber}
							/>
						) : (
							<ProductCard
								marca={""}
								modelo={"Ingrese el numero de parte"}
								description={"No se encontrado ningun resultado"}
								familia={""}
							/>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

InventoryHeader.propTypes = {
	opType: PropTypes.string.isRequired,
};
InventoryHeader.defaultProps = {
	opType: "",
};

export default InventoryHeader;
