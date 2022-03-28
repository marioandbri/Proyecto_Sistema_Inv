import React from "react";
import { groupBy } from "../../helpers/groupBy";

const IconoEntrega = () => (
	<span title="Entrega" className="icon has-text-success">
		<i className="fas fa-lg fa-arrow-circle-up"></i>
	</span>
);
const IconoRetiro = () => (
	<span title="Retiro" className="icon has-text-danger">
		<i className="fas fa-lg fa-arrow-circle-down"></i>
	</span>
);
const MovementItems = ({ pedido }) => {
	const { entrega, retiro } = pedido;
	const entregas = Object.entries(groupBy(entrega, "partnumber"));
	const retiros = Object.entries(groupBy(retiro, "partnumber"));
	return (
		<>
			<div className="columns is-gapless">
				{entrega && (
					<div
						style={{ maxWidth: "fit-content", marginRight: "1em" }}
						className="column"
					>
						<ul>
							<></>
							{entregas?.map(([partnumber, equiposArray]) => (
								<React.Fragment key={partnumber}>
									<li>
										<IconoEntrega />
										<span
											style={{
												background: "gray",
												color: "white",
												borderRadius: "15px",
												padding: "0 5px",
											}}
											className="has-text-weight-bold is-size-7 ml-2"
										>
											{equiposArray.length}
										</span>{" "}
										{equiposArray[0].equipo.shortDescription}
									</li>
								</React.Fragment>
							))}
						</ul>
					</div>
				)}
				{retiro && (
					<div
						style={{ maxWidth: "fit-content", marginRight: "1em" }}
						className="column"
					>
						<ul>
							{retiros?.map(([partnumber, equiposArray]) => (
								<React.Fragment key={partnumber}>
									<li>
										<IconoRetiro />
										<span
											style={{
												background: "gray",
												color: "white",
												borderRadius: "15px",
												padding: "0 5px",
											}}
											className="has-text-weight-bold is-size-7 ml-2"
										>
											{equiposArray.length}
										</span>{" "}
										{equiposArray[0].equipo.shortDescription}
									</li>
								</React.Fragment>
							))}
						</ul>
					</div>
				)}
			</div>
		</>
	);
};
export default MovementItems;
