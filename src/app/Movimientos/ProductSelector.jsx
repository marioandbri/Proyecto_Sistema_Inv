import React, { useState } from "react";
import DataPanelSelector from "../FormComponents/DataPanelSelector";
import Panel from "../FormComponents/Panel";
import { useFetch } from "../useFetch";

const ProductSelector = ({ setSelected, handleClick }) => {
	return (
		<>
			<DataPanelSelector
				title={"Lista de Productos"}
				urlToFetch={"/producto"}
				mapCallback={(e, index) => (
					<a
						onClick={() => {
							setSelected(e);
						}}
						key={e.partnumber}
						className="panel-block"
					>
						{e.shortDescription}
					</a>
				)}
			/>
			<button onClick={handleClick} style={{ width: "100%" }} className="button is-success is-large">
				<span className="icon">
					<i className="fas fa-check"></i>
				</span>
			</button>
		</>
	);
};

export default ProductSelector;
