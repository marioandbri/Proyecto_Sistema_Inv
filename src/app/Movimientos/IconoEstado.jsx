import React from "react";

const IconoEstado = ({ estado }) => {
	switch (estado) {
		case "Pendiente":
			return (
				<>
					<button title="Pendiente" className="button is-static">
						<span className="icon">
							<i className="fas fa-clock"></i>
						</span>
					</button>
				</>
			);
		case "En Preparacion":
			return (
				<>
					<button title="En Preparación" className="button is-static">
						<span className="icon">
							<i className="fas fa-tools"></i>
						</span>
					</button>
				</>
			);
		case "En Procesamiento":
			return (
				<>
					<button title="En Procesamiento" className="button is-static">
						<span className="icon">
							<i className="fas fa-truck-pickup"></i>
						</span>
					</button>
				</>
			);
		case "Finalizado":
			return (
				<>
					<button title="Finalizado" className="button is-static">
						<span className="icon">
							<i className="fas fa-clipboard-check"></i>
						</span>
					</button>
				</>
			);
		default:
			return (
				<>
					<button className="button">No se pudo encontrar estado</button>
				</>
			);
	}
};

export default IconoEstado;
