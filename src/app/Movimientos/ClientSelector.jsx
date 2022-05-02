import React from "react";
import DataPanelSelector from "../FormComponents/DataPanelSelector";

/**
 * @typedef {import("../../types").EmpresaModel} Empresa
 */

/**
 *
 * @param {{setSelected:(data:*)=>void}} param0
 * @returns {JSX.Element}
 */
const ClientSelector = ({ setSelected }) => {
	return (
		<>
			<DataPanelSelector
				title={"Lista de Empresas"}
				urlToFetch={"/empresa"}
				mapCallback={
					/**
					 *
					 * @param {Empresa} e
					 * @param {number} index
					 * @returns
					 */
					(e, index) => (
						<a
							onClick={() => {
								setSelected(e);
							}}
							key={e.rut}
							className="panel-block"
						>
							{e.razon_social}
						</a>
					)
				}
			/>
		</>
	);
};

export default ClientSelector;
