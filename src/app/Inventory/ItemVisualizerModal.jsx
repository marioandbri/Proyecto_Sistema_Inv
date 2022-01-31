import React from "react";

const ItemVisualizerModal = ({ data, closeModal }) => {
	if (!data) {
		return <></>;
	}
	return (
		<>
			<div className="modal is-active">
				<div className="modal-background"></div>
				<div className="modal-content">
					<div className="box">
						<div className="title has-text-black">Detalle de Item</div>
						<div className="table-container">
							<table>
								{data.map(([index, value]) => (
									<tr>
										<th>{index}</th>
										<td>{value}</td>
									</tr>
								))}
							</table>
						</div>
					</div>
					<button
						style={{ position: "absolute", top: "1%", right: "0.5%" }}
						onClick={() => {
							closeModal();
							// console.log("todo cerrar modal");
						}}
						className="button delete is-danger"
					></button>
				</div>
			</div>
		</>
	);
};

export default ItemVisualizerModal;
