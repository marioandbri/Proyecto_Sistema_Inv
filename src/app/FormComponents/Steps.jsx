import React from "react";
import "bulma-extensions";
const Steps = ({
	steps = [
		{
			active: true,
			completed: false,
			color: "",
			icon: (
				<>
					<span className="icon">
						<i className="fa fa-check"></i>
					</span>
				</>
			),
			title: "Step",
			description: "This is a step",
		},
	],
}) => {
	return (
		<div className="steps is-small">
			{steps.map((elem, index) => (
				<div
					key={index}
					className={`step-item ${elem.completed && "is-completed"} ${
						elem.active && "is-active"
					} ${elem.color}`}
				>
					<div className="step-marker">{elem.icon}</div>
					{elem.active && (
						<div className="step-details">
							<p className="step-title">{elem.title}</p>
							<p>{elem.description}</p>
						</div>
					)}
				</div>
			))}
		</div>
	);
};

export default Steps;
