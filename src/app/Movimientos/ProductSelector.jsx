import React, { useState } from "react";
import DataPanelSelector from "../FormComponents/DataPanelSelector";
import Panel from "../FormComponents/Panel";
import { useFetch } from "../useFetch";

const ProductSelector = () => {
	return (
		<>
			<DataPanelSelector
				title={"Lista de Productos"}
				urlToFetch={"/producto"}
				mapCallback={(e, index) => (
					<a
						onClick={() => {
							console.log(e);
						}}
						key={e.partnumber}
						className="panel-block"
					>
						{e.shortDescription}
					</a>
				)}
			/>
			<button style={{ width: "100%" }} className="button is-success is-large">
				<span className="icon">
					<i className="fas fa-plus"></i>
				</span>
			</button>
		</>
	);
};

export default ProductSelector;
