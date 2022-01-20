import React, { useEffect, useState } from "react";
import Ptp from "prop-types";

const ProductoItem = ({
	productType,
	// descripcion,
	item,
	handleEdit,
	handleEye,
	handleRemove,
	accessProductos,
}) => {
	// console.log(
	//   productType.includes("generic/"),
	//   "productType validation",
	//   productType
	// );
	const [readMore, setReadMore] = useState(false);
	useEffect(() => {
		return () => {};
	}, [item]);

	const Botonera = ({ partnumber, accessProductos }) => {
		return (
			<td align="center">
				<div className="buttons are-small">
					<a
						title="Ver Item"
						className="button m-1 is-outlined is-small is-primary is-light"
						onClick={(e) => {
							handleEye(e, item._id);
						}}
					>
						<span className="icon">
							<i className="far fa-eye"></i>
						</span>
					</a>
					{accessProductos[3] && (
						<a
							title="Editar"
							className="button m-1 is-outlined is-small is-info"
							onClick={(e) => {
								handleEdit(e, item._id);
							}}
						>
							<span className="icon">
								<i className="fas fa-pen"></i>
							</span>
						</a>
					)}
					{accessProductos[1] && (
						<a
							title="Eliminar"
							className="button m-1 is-outlined is-small is-danger"
							onClick={(e) => {
								let areUSure = confirm(
									`Esta seguro que desea eliminar el producto: ${partnumber}`
								);
								if (areUSure) {
									handleRemove(e, item._id);
								} else {
									return (
										<div className="notification is-info">
											Se cancelo la operacion
										</div>
									);
								}
							}}
						>
							<span className="icon">
								<i className="fas fa-minus-circle"></i>
							</span>
						</a>
					)}
				</div>
			</td>
		);
	};
	Botonera.propTypes = {
		partnumber: Ptp.string,
	};

	// //   console.log(descripcion);
	// if (productType == "computadores") {
	//   return (
	//     <>
	//       <tr>
	//         <td>{item.tipoComputador} </td>
	//         <td>{item.partNumber} </td>
	//         <td>{item.marca} </td>
	//         <td>{item.modelo} </td>
	//         <td>
	//           {item.procesador.tier +
	//             "-" +
	//             item.procesador.modelo +
	//             " " +
	//             item.procesador.minFreq +
	//             "-" +
	//             item.procesador.turboFreq}
	//           {"GHz"}
	//         </td>
	//         <td>
	//           {item.almacenamiento.map(
	//             (e, index) =>
	//               `${index + 1}* ${e.tipoAlmacenamiento} ${e.capacidadGB}GB`
	//           )}{" "}
	//         </td>
	//         <td>
	//           {item.tipoRam +
	//             "-" +
	//             item.socketsMemoria
	//               .map((e) =>
	//                 e.isInstalled != false ? e.capacidadGB + "GB" : ""
	//               )
	//               .join(" ")}
	//         </td>
	//         <td>{descripcion}</td>
	//         <Botonera />
	//       </tr>
	//     </>
	//   );
	// }
	// if (productType == "impresoras") {
	//   return (
	//     <>
	//       <tr>
	//         <td>{item.tipoImpresora.map((e) => `${e} `)}</td>
	//         <td>{item.partNumber}</td>
	//         <td>{item.marca}</td>
	//         <td>{item.modelo}</td>
	//         <td>{item.modoImpresion}</td>
	//         <td>{item.conexiones.map((e) => `${e} `)}</td>
	//         <td>{descripcion}</td>
	//         <Botonera />
	//       </tr>
	//     </>
	//   );
	// }
	// if (productType == "monitores") {
	//   return (
	//     <>
	//       <tr>
	//         <td>{item.tipoMonitor.map((e) => `${e} `)}</td>
	//         <td>{item.partNumber}</td>
	//         <td>{item.marca}</td>
	//         <td>{item.modelo}</td>
	//         <td>{item.tamañoPantalla + '"'}</td>
	//         {/* <td>{item.conexiones.map((e) => `${e} `)}</td> */}
	//         <td>{descripcion}</td>
	//         <Botonera />
	//       </tr>
	//     </>
	//   );
	// }
	if (productType != "") {
		// console.log(item.detalle);
		return (
			<tr>
				<td>{item.partnumber}</td>
				<td>{item.familia}</td>
				<td>{item.marca}</td>
				<td>{item.modelo}</td>
				{Object.getOwnPropertyNames(item.detalle).map((e, index) => (
					<td key={index}>{item.detalle[e]}</td>
				))}
				<td>
					{readMore
						? item.extraDescription
						: `${item.extraDescription.substring(0, 100)}...`}
					<a
						className="link"
						onClick={() => {
							setReadMore(!readMore);
						}}
					>
						{readMore ? ". Ver menos" : "Ver mas"}
					</a>
				</td>
				<Botonera
					partnumber={item.partnumber}
					accessProductos={accessProductos}
				/>
			</tr>
		);
	}

	return (
		<>
			<tr>
				<td>ALGO FALLO</td>
			</tr>
		</>
	);
};
ProductoItem.propTypes = {
	productType: Ptp.string,
	item: Ptp.object,
	handleEdit: Ptp.func,
	handleEye: Ptp.func,
	handleRemove: Ptp.func,
	accessProductos: Ptp.arrayOf(Ptp.bool).isRequired,
};

export default ProductoItem;
