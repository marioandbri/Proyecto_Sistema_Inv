import React from "react";
import { notificationTypes } from "../Notification";
import { useDispatch } from "./InventoryProvider";
import { type } from "./InventoryReducer";
import PropTypes from "prop-types";

const TableEditingButtons = ({
	updatedData,
	finalEditRow,
	cancelEditRow,
	restoreData,
	index,
	updateData,
}) => {
	const dispatch = useDispatch();
	
	const { numeroSerie: sn } = updatedData;

	const handleUpdate = async () => {
		const result = await fetch(`/inventario/${sn}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedData),
		});
		const resultData = await result.json();
		if (result.ok) {
			dispatch({
				type: type.addNotification,
				payload: {
					content: "🔂 " + "Actualizacion de Item realizada",
					notificationType: notificationTypes.info,
				},
			});
			updateData(updatedData, index);
			finalEditRow(index);
		} else {
			dispatch({
				type: type.addNotification,
				payload: {
					content: "😨" + "Algo fallo, no se logro actualizar el registro",
					notificationType: notificationTypes.danger,
				},
			});
			restoreData(index);
		}
	};

	return (
		<td>
			<div className="buttons are-small">
				<a
					title="Actualizar"
					className="button m-1 is-outlined is-small is-success"
					onClick={() => {
						handleUpdate();
					}}
				>
					<span className="icon">
						<i className="fas fa-check"></i>
					</span>
				</a>
				<a
					title="Cancelar"
					className="button m-1 is-outlined is-small is-danger"
					onClick={() => {
						restoreData(index);
						cancelEditRow(index);
						dispatch({
							type: type.addNotification,
							payload: {
								content: `Se cancelo la operación`,
								notificationType: notificationTypes.warning,
							},
						});
					}}
				>
					<span className="icon">
						<i className="fas fa-times"></i>
					</span>
				</a>
			</div>
		</td>
	);
};
TableEditingButtons.propTypes = {
	index: PropTypes.number,
	updatedData: PropTypes.object,
	finalEditRow: PropTypes.func,
	cancelEditRow: PropTypes.func,
	restoreData: PropTypes.func,
};
export default TableEditingButtons;
