import React, { useState } from "react";
import { groupBy } from "../../helpers/groupBy";
import ListComponent from "../ListComponent";
import ListItemComponent from "../ListItemComponent";
import IconoEstado from "./IconoEstado";
import ItemDescription from "./ItemDescription";

const DetailView = ({ data }) => {
	let group = groupBy(data.pedido, "partnumber");
	let pedido = [];
	for (let key in group) {
		pedido.push(...group[key]);
	}
	data.pedido = pedido;
	const [pedidoValida, setPedidoValida] = useState(data.pedido);
	const isModified = (modifications) => {
		if (!modifications) return false;
		return !!Object.values(modifications).toString();
	};

	const handleSNInputs = (index) => (e) => {
		setPedidoValida((oldPedido) => {
			const newPedido = [...oldPedido];
			newPedido[index].numeroSerie = e.target.value;
			return newPedido;
		});
	};
	return (
		<div className="box">
			<nav className="level">
				<div className="level-left">
					<div
						style={{
							border: "2px solid red",
							display: "inline-block",
							borderRadius: "10%",
							padding: "1em",
							marginRight: "1rem",
							fontWeight: "Bold",
							color: "red",
						}}
					>
						{data.guia}
					</div>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
						}}
					>
						<div style={{ color: "gray" }} className="title is-6 mb-0">
							{data.tipo}
						</div>
						<div style={{ fontWeight: "bolder" }} className="title is-6 mb-0">
							{data.cliente.razon_social}
						</div>
						<div className="title is-6">
							{data.fechaCreacion.substring(0, data.fechaCreacion.indexOf("T"))}
						</div>
					</div>
				</div>
				<div className="level-right">
					<div className="level-item">
						<span className="title is-6 mr-2">{data.estado}</span>
						<IconoEstado estado={data.estado} />
					</div>
				</div>
			</nav>
			<div
				style={{
					boxShadow: "",
				}}
				className="box"
			>
				<ListComponent>
					{pedidoValida.map((e, index) => {
						if (e.equipo.detalle.CPU) delete e.equipo.detalle.CPU;
						return (
							<ListItemComponent
								key={index}
								title={
									<input
										onChange={handleSNInputs(index)}
										value={e.numeroSerie}
									/>
								}
								description={
									<ItemDescription
										description={e.equipo.shortDescription}
										details={
											isModified(e.modificaciones)
												? e.modificaciones
												: e.equipo.detalle
										}
										isModified={isModified(e.modificaciones)}
									/>
								}
							/>
						);
					})}
				</ListComponent>
			</div>
		</div>
	);
};

export default DetailView;
