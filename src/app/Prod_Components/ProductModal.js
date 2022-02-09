import React from "react";
import ItemVisualizerModal from "../Inventory/ItemVisualizerModal";
import { lookupData } from "../../helpers/flattenData";

const ProductModal = ({ productUpdate, closeModal }) => {
	return (
		<>
			<ItemVisualizerModal
				data={lookupData(productUpdate)}
				closeModal={closeModal}
			/>
		</>
	);
};
export default ProductModal;
