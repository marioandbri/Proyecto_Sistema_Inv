import React from "react";
import LoadingBar from "./LoadingBar";
import { currentItems } from "./Pagination";
import PropTypes from "prop-types";

const Cliente = ({
	clientes,
	loading,
	handleEdit,
	deleteCliente,
	clientesPerPage,
	currentPage,
	accessEmpresas,
}) => {
	if (loading) {
		return (
			<tr>
				<td colSpan="8">
					<LoadingBar />
				</td>
			</tr>
		);
	}
	const currentClientes = currentItems(clientes, clientesPerPage, currentPage);
	return (
		<>
			{currentClientes.map((cliente) => (
				<tr key={cliente.rut}>
					<td title={cliente.razon_social}>
						{
							cliente.razon_social /*.length > 30 ? cliente.razonsocial.slice(0, 20) + '...' : cliente.razonsocial*/
						}
					</td>
					<td>{cliente.rut}</td>
					<td title={cliente.ubicacion}>
						{cliente.ubicacion != null && cliente.ubicacion.length > 30
							? cliente.ubicacion.slice(0, 30) + "..."
							: cliente.ubicacion}
					</td>
					<td>{cliente.telefono_contacto}</td>
					<td>{cliente.persona_contacto}</td>
					<td>{cliente.createdat}</td>
					<td align="center">
						{accessEmpresas[3] && (
							<button
								className="button is-outlined is-link is-small"
								onClick={() => handleEdit(cliente.rut)}
							>
								<span className="icon">
									<i className="fas fa-pen"></i>
								</span>
							</button>
						)}
					</td>
					<td align="center">
						{accessEmpresas[1] && (
							<button
								className="button is-outlined is-danger is-small"
								onClick={() => deleteCliente(cliente.rut, cliente.razon_social)}
							>
								<span className="icon">
									<i className="fas fa-minus-circle"></i>
								</span>
							</button>
						)}
					</td>
				</tr>
			))}
		</>
	);
};
Cliente.propTypes = {
	clientes: PropTypes.array,
	loading: PropTypes.bool,
	handleEdit: PropTypes.func,
	deleteCliente: PropTypes.func,
	clientesPerPage: PropTypes.number,
	currentPage: PropTypes.number,
	accessEmpresas: PropTypes.arrayOf(PropTypes.bool).isRequired,
};

export default Cliente;
