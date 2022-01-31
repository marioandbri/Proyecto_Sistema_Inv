import React, { useState } from "react";
import { notificationTypes } from "../Notification";
import { useDispatch } from "./InventoryProvider";
import { type } from "./InventoryReducer";
import PropTypes from "prop-types";
import { useAppState } from "../AppProvider";
import { flattenData } from "../../helpers/flattenData";
import ItemVisualizerModal from "./ItemVisualizerModal";

const TableDataButtons = ({ row, reloadData, editRow }) => {
	const dispatch = useDispatch();
	const appState = useAppState();
	const [isLooking, setIsLooking] = useState(false);
	const [modalData, setModalData] = useState(null);
	const { accessInventarios } = appState.userData;
	const handleRemove = async (sn) => {
		const result = await fetch(`/inventario/${sn}`, {
			method: "DELETE",
		})
			.then((data) => data.json())
			.catch((e) => console.log(e));
		dispatch({
			type: type.addNotification,
			payload: {
				content: "⛔ " + result.message,
				notificationType: notificationTypes.info,
			},
		});
		reloadData();
	};
	const { numeroSerie } = row.original || false;
	const lookupData = (data) => {
		const flatData = flattenData(data);
		return Object.entries(flatData).filter(
			([key, value]) =>
				!(
					key.includes("id") ||
					key.includes("rutProveedor") ||
					key.includes("rutPoseedor") ||
					key.includes("productPN") ||
					key.includes("_v")
				)
		);
	};
	const toggleItemModal = (data) => {
		setIsLooking(true);
		setModalData(data);
	};
	const closeModal = () => {
		setIsLooking(false);
		setModalData(null);
	};
	// if (!appState.userData.isAdmin || !accessInventarios[3] || !accessInventarios[1]) {
	//   return null
	// }
	if (!numeroSerie) {
		return null;
	} else
		return (
			<>
				<td align="center">
					<div className="buttons are-small">
						{accessInventarios[3] && (
							<a
								title="Editar"
								className="button m-1 is-outlined is-small is-info"
								onClick={() => {
									editRow(row.index);
								}}
							>
								<span className="icon">
									<i className="fas fa-pen"></i>
								</span>
							</a>
						)}
						{accessInventarios[1] && (
							<a
								title="Eliminar"
								className="button m-1 is-outlined is-small is-danger"
								onClick={() => {
									const validarRemove = confirm(
										`¿Está seguro que desea borrar el registro: ${numeroSerie}?`
									);
									if (validarRemove) {
										handleRemove(numeroSerie);
									} else {
										dispatch({
											type: type.addNotification,
											payload: {
												content: `Se cancelo la operación`,
												notificationType: notificationTypes.warning,
											},
										});
									}
								}}
							>
								<span className="icon">
									<i className="fas fa-minus-circle"></i>
								</span>
							</a>
						)}
						<a
							title="Ver Item"
							className="button m-1 is-outlined is-small is-primary is-light"
							onClick={(e) => {
								toggleItemModal(lookupData(row.original));
							}}
						>
							<span className="icon">
								<i className="far fa-eye"></i>
							</span>
						</a>
						{isLooking && (
							<ItemVisualizerModal data={modalData} closeModal={closeModal} />
						)}
					</div>
				</td>
			</>
		);
};
TableDataButtons.propTypes = {
	row: PropTypes.object,
	reloadData: PropTypes.func,
	editRow: PropTypes.func,
};

export default TableDataButtons;
