import React, { useEffect } from "react";

const Filter = ({ query, handleQuery, handleFilter }) => {
  //   useEffect(() => {
  //     handleFilter();
  //     return () => {};
  //   }, [query]);
  return (
    <>
      <div className="box">
        <div className="level-left">
          <span className="control has-icons-right">
            <input
              value={query}
              type="text"
              className="input"
              placeholder="Buscar..."
              onChange={(e) => {
                handleQuery(e);
              }}
            />
            <span className="icon is-right">
              <i className="fas fa-search"></i>
            </span>
          </span>
        </div>
      </div>
    </>
  );
};

export default Filter;
