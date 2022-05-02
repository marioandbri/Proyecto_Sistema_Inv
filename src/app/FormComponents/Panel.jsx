import React from "react";

/**
 * @typedef {import("../../types").PanelComponentProps<any>} PanelProps
 * @param {PanelProps} param0
 * @returns
 */
const Panel = ({
	title,
	id,
	listIcon,
	data = ["no items"],
	mapCallback = (e, index) => (
		<a key={index} className="panel-block">
			{listIcon}
			{e}{" "}
		</a>
	),
	query,
	setQuery = () => (ev) => {},
	className,
}) => {
	return (
		<React.Fragment>
			<article id={id} className={"panel " + className}>
				<p className="panel-heading">{title}</p>
				<div className="panel-block">
					<p className="control has-icons-left">
						<input
							onChange={setQuery()}
							className="input is-info"
							type="text"
							placeholder="Busqueda..."
							value={query}
						/>
						<span className="icon is-left">
							<i className="fas fa-search" aria-hidden="true"></i>
						</span>
					</p>
				</div>
				{data.map(mapCallback)}
			</article>
		</React.Fragment>
	);
};

export default Panel;
