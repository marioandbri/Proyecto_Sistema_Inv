import React from "react";

const DropdownComponent = ({ children, additionalClass, style }) => {
	return (
		<div className="navbar-item has-dropdown is-hoverable">
			<a className="navbar-link">
				<span
					style={{ border: "solid 1px white", borderRadius: "20%" }}
					className="icon mr-1"
				>
					<i className="fas fa-bars"> </i>
				</span>
				Menu
			</a>

			<div className="navbar-dropdown">{children}</div>
		</div>
	);
};

export default DropdownComponent;
