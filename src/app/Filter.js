import React, { useEffect } from "react";

const Filter = ({ query, setQuery, handleFilter }) => {
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
            setQuery(e.target.value)
          }}
        />
        <span className="icon is-right">
          <i className="fas fa-search"></i>
        </span>
      </span>
    </>
  );
};

export default Filter;
