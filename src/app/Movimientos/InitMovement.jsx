import React, { useState } from "react";
import { Link } from "react-router-dom";
import IconoGuia from "./IconoGuia";

const InitMovement = () => {
	const [isExpanded, setIsExpanded] = useState(false);
	return (
		<React.Fragment>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					position: "fixed",
					bottom: "1em",
					right: "2em",
				}}
				className="container"
			>
				<div
					style={{}}
					className={"menu-container" + `${isExpanded ? "-expanded" : ""}`}
				>
					<Link
						to="/movimientos/OT"
						className={
							"panel-block menu-item" + `${isExpanded ? "-expanded" : ""}`
						}
					>
						<span className="title is-size-4">
							<span className="icon has-text-success">
								<i className="fas fa-arrow-circle-up"></i>
							</span>{" "}
							Iniciar Entrega
						</span>
					</Link>
					<a
						className={
							"panel-block menu-item" + `${isExpanded ? "-expanded" : ""}`
						}
					>
						<span className="title is-size-4">
							<span className="icon has-text-danger">
								<i className="fas fa-arrow-circle-down"></i>
							</span>{" "}
							Iniciar Retiro
						</span>
					</a>
					<a
						className={
							"panel-block menu-item" + `${isExpanded ? "-expanded" : ""}`
						}
					>
						<span className="title is-size-4">
							<span className="icon has-text-info">
								<i className="fas fa-exchange-alt"></i>
							</span>{" "}
							Iniciar Cambio
						</span>
					</a>
				</div>
				<button
					style={{
						borderRadius: "25%",
						width: "fit-content",
						alignSelf: "end",
					}}
					id="init-button"
					onClick={() => {
						setIsExpanded(!isExpanded);
					}}
					className={`button ${
						isExpanded ? "is-danger" : "is-success"
					} is-large`}
				>
					<span
						className={`icon ${
							isExpanded ? "init-icon-expanded" : "init-icon"
						}`}
					>
						<i className="fas fa-plus"></i>
					</span>
				</button>
			</div>
		</React.Fragment>
	);
};

export default InitMovement;
