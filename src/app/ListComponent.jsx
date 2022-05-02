import React from "react";

/**
 * @typedef {import("../types").ListComponentProps} ListComponentProps
 *
 */

/**
 *
 * @param {ListComponentProps} props
 * @returns
 */
const ListComponent = (props) => {
	return (
		<div
			{...props}
			className={"list has-hoverable-list-items" + " " + props.className}
		>
			{props.children}
		</div>
	);
};

export default ListComponent;
