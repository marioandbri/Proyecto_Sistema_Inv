import React, { useState } from "react";
import Select from "../FormComponents/Select";
import Filter from "../Filter";
import CheckboxComponent from "../SignupComponent/CheckboxComponent";

const MovementsListControls = ({ state, setters }) => {
	const años = Array(50)
		.fill()
		.map((_, index) => new Date().getFullYear() - index);
	const meses = Array(12)
		.fill()
		.map((_, index) => index + 1);
	const dias = Array(31)
		.fill()
		.map((_, index) => index + 1);
	const tipoMovimientosOptions = ["ENTREGA", "RETIRO", "CAMBIO"];
	const estados = [
		"Pendiente",
		"En Preparacion",
		"En Procesamiento",
		"Finalizado",
	];
	const {
		setAño,
		setConsulta,
		setDia,
		setEstado,
		setTipoMovimiento,
		setMes,
	} = setters;
	const { consulta, tipoMovimiento, año, mes, dia, estado } = state;
	return (
		<React.Fragment>
			<div
				style={{ marginTop: "3rem" }}
				className="field is-grouped is-grouped-multiline"
			>
				<div className="title is-size-7 mr-5">Filtros:</div>
				<div className="control is-relative">
					<span
						style={{ position: "absolute", top: "-1rem" }}
						className="title is-size-7"
					>
						Tipo de Movimiento
					</span>
					<Select
						aditionalClasses="is-small"
						id="tipomovimiento"
						options={tipoMovimientosOptions}
						value={tipoMovimiento}
						handleChange={() => (e) => {
							setTipoMovimiento(e.target.value);
						}}
					/>
				</div>
				<div className="control is-relative">
					<span
						style={{ position: "absolute", top: "-1rem" }}
						className="title is-size-7"
					>
						Empresa
					</span>
					<Filter
						query={consulta}
						setQuery={setConsulta}
						aditionalClassname="is-small"
					/>
				</div>
				<div className="control is-relative">
					<span
						style={{ position: "absolute", top: "-1rem" }}
						className="title is-size-7"
					>
						Año
					</span>
					<Select
						id="años"
						options={años}
						value={año}
						handleChange={() => (e) => {
							setAño(e.target.value);
						}}
						aditionalClasses="is-small"
					/>
				</div>
				<div className="control is-relative">
					<span
						style={{ position: "absolute", top: "-1rem" }}
						className="title is-size-7"
					>
						Mes
					</span>
					<Select
						id="meses"
						aditionalClasses="is-small"
						handleChange={() => (e) => {
							setMes(e.target.value);
						}}
						options={meses}
						value={mes}
					/>
				</div>
				<div className="control is-relative">
					<span
						style={{ position: "absolute", top: "-1rem" }}
						className="title is-size-7"
					>
						Dia
					</span>
					<Select
						id="dias"
						options={dias}
						value={dia}
						handleChange={() => (e) => {
							setDia(e.target.value);
						}}
						aditionalClasses="is-small"
					/>
				</div>
				<div className="control is-relative">
					<span
						style={{ position: "absolute", top: "-1rem" }}
						className="title is-size-7"
					>
						Estado
					</span>
					<Select
						id="estados"
						options={estados}
						aditionalClasses="is-small"
						handleChange={() => (e) => {
							setEstado(e.target.value);
						}}
						value={estado}
					/>
				</div>
				<div className="control is-relative">
					<span
						style={{ position: "absolute", top: "-1rem" }}
						className="title is-size-7"
					>
						Limpiar
					</span>
					<button
						onClick={() => {
							setAño("");
							setConsulta("");
							setDia("");
							setTipoMovimiento("");
							setEstado("");
							setMes("");
						}}
						title="Restablecer"
						className="button is-small"
					>
						🔁
					</button>
				</div>
			</div>
			<hr style={{ background: "gray", margin: ".5em 0" }} />
		</React.Fragment>
	);
};

export default MovementsListControls;
