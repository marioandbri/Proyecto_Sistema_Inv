import React from "react";

const handleButton1 = () => {
	console.log("This button isn't receiving a prop function");
};

/**
 * @typedef {import("../types").ListItemProps} ListItemProps
 */

/**
 *
 * @param {ListItemProps} param0
 * @returns
 */
const ListItemComponent = ({
	title = "Default Title",
	button1,
	button2,
	description,
	itemIcon,
}) => {
	return (
		<div className="list-item">
			<div className="list-item-image">{itemIcon}</div>
			<div className="list-item-content">
				<div className="list-item-tile">{title}</div>
				<div className="list-item-description">{description}</div>
				<div className="list-item-controls">
					<div
						style={{ position: "absolute", right: "1rem", top: "25%" }}
						className="buttons is-right"
					>
						{button1}
						{button2}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ListItemComponent;
