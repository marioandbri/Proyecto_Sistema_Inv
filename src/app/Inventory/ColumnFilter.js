import React from "react";
import PropTypes from "prop-types";

const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <span>
      <input
        style={{ position: "relative" }}
        type="text"
        className="input is-small"
        value={filterValue || ""}
        onChange={(e) => {
          console.log(typeof filterValue);
          setFilter(e.target.value);
        }}
      />
    </span>
  );
};

ColumnFilter.propTypes = {
  column: PropTypes.object,
};

export default ColumnFilter;
