import React from "react";

const ItemVisualizerModal = ({ data, closeModal }) => {
	if (!data) {
		return <></>;
	}
	return (
		<>
			<div className="modal is-active">
				<div className="modal-background"></div>
				<div style={{ maxWidth: "fit-content" }} className="modal-content">
					<div className="box">
						<div className="title has-text-black">Detalle de Item</div>
						<div className="table-container">
							<table className="table is-striped is-narrow">
								<tbody>
									{data.map(([index, value]) => (
										<tr className="is-size-6" key={index}>
											<th>
												{index.includes("DETALLE.")
													? index.replace("DETALLE.", "")
													: index}
											</th>
											<td>{value}</td>
										</tr>
									))}
								</tbody>
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
