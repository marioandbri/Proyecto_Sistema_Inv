import React, { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { groupBy } from "../../helpers/groupBy";
import ListComponent from "../ListComponent";
import ListItemComponent from "../ListItemComponent";
import IconoEstado from "./IconoEstado";
import ItemDescription from "./ItemDescription";

const DetailView = ({ data }) => {
	/**
	 * @type {{id:string}}
	 */
	const { id } = useParams()
	const history = useHistory()
	const [createValida, setCreateValida] = useState(false)
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
	return (<>
		<div className="buttons is-pulled-right">
			<button onClick={async () => {
				const result = await fetch(`/mov/${id}`, {
					method: "DELETE"
				})
				if (result.ok) {
					history.push("/movimientos")
				}
			}} className="button is-danger">Eliminar 🗑️</button>
			{data.estado === "Laboratorio" && <button onClick={() => setCreateValida(!createValida)} className="button is-info has-text-weight-bold


">Crear Valida 📜</button>}
			<button className="button has-text-weight-bold">
				Pasar a operaciones
			</button>
		</div>
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
									createValida ?
										<input className="input"
											placeholder="Numero de serie"
											onChange={handleSNInputs(index)}
											value={e.numeroSerie}
										/> :
										(e.numeroSerie || "")
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
	</>
	);
};

export default DetailView;
