import React from "react";

const ProductTypeItem = ({
	titulo = "Titulo por Defecto",
	description = "Descripcion por defecto",
	id = "",
	deleteTypo = (id = "", nombre = "") => {},
}) => {
	return (
		<>
			<div className="list-item">
				<div className="list-item-content">
					<span className="list-item-title">{titulo}</span>
					<span className="list-item-description">{description}</span>
				</div>
				<div className="list-item-controls">
					<div className="buttons is-right">
						{/* <button className="button is-info">✍️</button> */}
						<button
							className="button is-danger"
							onClick={() => {
								deleteTypo(id, titulo);
							}}
						>
							⛔
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductTypeItem;
