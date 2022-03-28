import React from "react";
const IconoGuia = ({ tipo }) => {
	switch (tipo) {
		case "ENTREGA":
			return (
				<span title="Entrega" className="icon is-large has-text-success">
					<i className="fas fa-2x fa-arrow-alt-circle-up"></i>
				</span>
			);
		case "RETIRO":
			return (
				<span title="Retiro" className="icon is-large has-text-danger">
					<i className="fas fa-2x fa-arrow-alt-circle-down"></i>
				</span>
			);
		case "CAMBIO":
			return (
				<span title="Cambio" className="icon is-large has-text-info">
					<i className="fas fa-2x fa-exchange-alt"></i>
				</span>
			);
	}
};
export default IconoGuia;
