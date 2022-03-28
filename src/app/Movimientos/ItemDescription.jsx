import React, { useState } from "react";
import { flattenData } from "../../helpers/flattenData";

const ItemDescription = ({ description, isModified, details }) => {
	const modData = Object.entries(flattenData(details));
	const [isVisible, setIsVisible] = useState(false);
	return (
		<>
			<span>{description} </span>
			<span className="is-inline-block is-pulled-right">
				Modificaciones: {isModified ? "\u2705" : <b>NO</b>}
			</span>

			<div
				className="expandable-description"
				style={{ textAlign: "center", cursor: "pointer" }}
			>
				{isVisible && (
					<>
						{modData.map(([key, value], index) => (
							<React.Fragment key={index}>
								<span
									style={{
										display: "inline-block",
										width: "100%",
										textAlign: "left",
										cursor: "initial",
										backgroundColor: "#ffffffff",
									}}
								>
									{key}: {value}
								</span>
							</React.Fragment>
						))}
					</>
				)}
				<span
					style={{ width: "100%" }}
					onClick={() => setIsVisible(!isVisible)}
					className="icon"
				>
					<i
						className={`fas ${isVisible ? "fa-angle-up" : "fa-angle-down"}`}
					></i>
				</span>
			</div>
		</>
	);
};

export default ItemDescription;
