import React from "react";
import PropTypes from "prop-types";

const Filter = ({ query, setQuery }) => {
  //   useEffect(() => {
  //     handleFilter();
  //     return () => {};
  //   }, [query]);
  return (
    <>
      {/* <div className="box mb-1">
        <div className="level-left">
        </div>
      </div> */}
      <span className="control has-icons-right">
        <input
          value={query}
          type="text"
          className="input"
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
    </>
  );
};

Filter.propTypes = {
  query: PropTypes.string,
  setQuery: PropTypes.func,
};

export default Filter;
