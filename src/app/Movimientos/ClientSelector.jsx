import React from "react";
import DataPanelSelector from "../FormComponents/DataPanelSelector";

const ClientSelector = ({ setSelected }) => {
	return (
		<>
			<DataPanelSelector
				title={"Lista de Empresas"}
				urlToFetch={"/empresa"}
				mapCallback={(e, index) => (
					<a
						onClick={() => {
							setSelected(e);
						}}
						key={e.rut}
						className="panel-block"
					>
						{e.razon_social}
					</a>
				)}
			/>
		</>
	);
};

export default ClientSelector;
