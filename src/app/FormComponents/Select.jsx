import React from "react";

const Select = ({
	id = "",
	style = {},
	aditionalClasses = "",
	value = "",
	handleChange = () => (event = Event) => {
		console.log("Todo function prop @this component");
	},
	options = [],
}) => {
	return (
		<div style={style} className={"select " + aditionalClasses}>
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
