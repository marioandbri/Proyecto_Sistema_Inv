import React from "react";

const ListComponent = ({ style, children, aditionalClasses }) => {
	return (
		<div
			style={style}
			className={"list has-hoverable-list-items" + " " + aditionalClasses}
		>
			{children}
		</div>
	);
};

export default ListComponent;
