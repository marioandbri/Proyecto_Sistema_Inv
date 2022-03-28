import React from "react";

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
	setQuery = () => (Event) => {},
	color,
}) => {
	return (
		<React.Fragment>
			<article id={id} className={"panel " + color}>
				<p className="panel-heading">{title}</p>
				{/* <p className="panel-tabs">
					<a className="is-active">All</a>
					<a>Public</a>
					<a>Private</a>
					<a>Sources</a>
					<a>Forks</a>
				</p> */}
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
