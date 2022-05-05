import React from "react";

/**
 * @typedef {import("../../types").CardComponentProps} CardProps
 * @param {CardProps} param0
 * @returns {JSX.Element}
 */
const Card = ({
	title = "Titulo",
	subtitle = "Subtitulo",
	content = "Contenido",
	style
}) => {
	return (
		<div style={style} className="card">
			<div className="card-content">
				<p className="title is-6">{title}</p>
				<div style={{ color: "#555" }} className="subtitle is-6 mb-1">
					{subtitle}
				</div>
				<div className="content is-size-7">{content}</div>
			</div>
		</div>
	);
};

export default Card;
