import React, { useState } from "react";
import ListComponent from "../ListComponent";
import ListItemComponent from "../ListItemComponent";
import { useFetch } from "../useFetch";
import { groupBy } from "../../helpers/groupBy";
import MovementItems from "./MovementItems";
import { Link } from "react-router-dom";
import MovementsListControls from "./MovementsListControls";
import IconoEstado from "./IconoEstado";
import IconoGuia from "./IconoGuia";
import advancedFilter from "../../helpers/advancedFilter";
import InitMovement from "./InitMovement";

const MovementsList = () => {
	const { data, loading } = useFetch("/mov");
	const [consulta, setConsulta] = useState("");

	const [tipoMovimiento, setTipoMovimiento] = useState("");

	const [año, setAño] = useState("");
	const [mes, setMes] = useState("");
	const [dia, setDia] = useState("");
	const [estado, setEstado] = useState("");

	let filteredData = data;
	tipoMovimiento &&
		(filteredData = filteredData.filter(
			advancedFilter("tipo", tipoMovimiento)
		));
	consulta &&
		(filteredData = filteredData.filter(advancedFilter("cliente", consulta)));
	estado &&
		(filteredData = filteredData.filter(advancedFilter("estado", estado)));
	año &&
		(filteredData = filteredData.filter(
			({ fechaCreacion }) =>
				new Date(fechaCreacion).getFullYear() === parseInt(año)
		));
	mes &&
		(filteredData = filteredData.filter(
			({ fechaCreacion }) =>
				new Date(fechaCreacion).getMonth() + 1 === parseInt(mes)
		));
	dia &&
		(filteredData = filteredData.filter(
			({ fechaCreacion }) =>
				new Date(fechaCreacion).getDate() + 1 === parseInt(dia)
		));
	return (
		<React.Fragment>
			<MovementsListControls
				state={{ año, mes, dia, estado, tipoMovimiento, consulta }}
				setters={{
					setAño,
					setConsulta,
					setDia,
					setMes,
					setTipoMovimiento,
					setEstado,
				}}
			/>
			<ListComponent
				className={"has-overflow-ellipsis has-visible-pointer-controls"}
			>
				{!loading &&
					filteredData.map((e, index) => (
						<React.Fragment key={index}>
							<ListItemComponent
								itemIcon={<IconoGuia tipo={e.tipo} />}
								title={
									<Link
										to={"/movimientos/detalle/" + e._id}
										className="link title is-size-6"
									>
										{e.guia} - {e.cliente?.razon_social || "No Disponible"} -{" "}
										{e.fechaCreacion &&
											e.fechaCreacion.substring(
												0,
												e.fechaCreacion.indexOf("T")
											)}
									</Link>
								}
								description={
									<MovementItems pedido={groupBy(e.pedido, "orientacion")} />
								}
								button1={<IconoEstado estado={e.estado} />}
							/>
						</React.Fragment>
					))}
			</ListComponent>
			<InitMovement />
		</React.Fragment>
	);
};

export default MovementsList;
