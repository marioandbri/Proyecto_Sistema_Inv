import React from "react";

/**
 * @typedef {import("../../types").SelectComponentProps} SelectProps
 * @param {SelectProps} param0
 * @returns
 */
const Select = ({
	id = "",
	style = {},
	className,
	value = "",
	handleChange,
	options = [],
}) => {
	return (
		<div style={style} className={"select " + className}>
			<select onChange={handleChange()} name={id} value={value} id={id}>
				<option value=""></option>
				{options.map((e, index) => (
					<option key={index} value={e}>
						{e}
					</option>
				))}
			</select>
		</div>
	);
};

export default Select;
