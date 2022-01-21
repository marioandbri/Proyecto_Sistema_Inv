import React from "react";

const ProductTypeList = ({ children }) => {
	return (
		<>
			<div className="box">
				<div className="title">Ruta administracion tipo de productos</div>
				<div className="list has-hoverable-list-items">{children}</div>
			</div>
		</>
	);
};

export default ProductTypeList;
