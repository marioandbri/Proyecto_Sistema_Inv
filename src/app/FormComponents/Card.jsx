import React from "react";

const Card = ({
	title = "Titulo",
	subtitle = "Subtitulo",
	content = "Contenido",
}) => {
	return (
		<div className="card">
			<div className="card-content">
				<p className="title is-5">{title}</p>
				<p style={{ color: "#858585" }} className="subtitle is-6 mb-1">
					{subtitle}
				</p>
				<div className="content">{content}</div>
			</div>
		</div>
	);
};

export default Card;
