import React from "react";
import PropTypes from "prop-types";

const Filter = ({ query, setQuery, className, style = {} }) => {
	//   useEffect(() => {
	//     handleFilter();
	//     return () => {};
	//   }, [query]);
	return (
		<React.Fragment>
			{/* <div className="box mb-1">
        <div className="level-left">
        </div>
      </div> */}
			<span style={style} className="control has-icons-right">
				<input
					style={style}
					value={query}
					type="text"
					className={"input " + className}
					placeholder="Buscar..."
					onChange={(e) => {
						// handleQuery(e);
						setQuery(e.target.value);
					}}
				/>
				<span className="icon is-right">
					<i className="fas fa-search"></i>
				</span>
			</span>
		</React.Fragment>
	);
};

Filter.propTypes = {
	query: PropTypes.string,
	setQuery: PropTypes.func,
};

export default Filter;
