import React from "react";
import { useInventory } from "./InventoryProvider";
import PropTypes from "prop-types";

const EditableCell = ({
	value,
	row: { index },
	column: { id },
	updateValues,
}) => {
	const state = useInventory();
	const isEditing = state.editingRows.includes(index);
	React.useEffect(() => {
		setValue(value);
		return () => {};
	}, [isEditing]);

	const [readMore, setReadMore] = React.useState(false);
	const [editableValue, setValue] = React.useState(value);

	const onChange = (e) => {
		setValue(e.target.value);
		updateValues(index, id, e.target.value);
	};
	if (id == "proveedor" || id == "poseedor" || id == "numeroSerie") {
		return <span>{value}</span>;
	} else if (id == "descripcion") {
		return (
			<span>
				{!readMore ? value?.substring(0, 70) : value}
				<a
					onClick={() => {
						setReadMore(!readMore);
					}}
				>
					{!readMore ? "...Ver más" : ". Ver menos"}
				</a>
			</span>
		);
	} else if (isEditing) {
		return (
			<input
				className="input is-size-7"
				onChange={onChange}
				value={editableValue || ""}
			/>
		);
	} else {
		return <span>{value}</span>;
	}
};

EditableCell.propTypes = {
	// value: PropTypes.string,
	row: PropTypes.object,
	column: PropTypes.object,
	updateData: PropTypes.func,
};

export default EditableCell;
