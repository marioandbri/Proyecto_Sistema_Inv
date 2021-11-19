import React, { useRef } from "react";
import PropTypes from "prop-types";

const SortingButton = ({ sortingData, fieldName }) => {
  const icon = useRef();
  var property = fieldName == "PartNumber" ? fieldName : ">" + fieldName;
  const handleClick = () => {
    if (icon.current.classList.contains("fa-sort")) {
      icon.current.classList.remove("fa-sort");
      icon.current.classList.add("fa-sort-up");
      sortingData(property);
      return;
    }
    if (icon.current.classList.contains("fa-sort-up")) {
      icon.current.classList.remove("fa-sort-up");
      icon.current.classList.add("fa-sort-down");
      sortingData("-" + property);
      return;
    } else {
      icon.current.classList.remove("fa-sort-down");
      icon.current.classList.add("fa-sort");
      sortingData("");
      return;
    }
  };

  return (
    <>
      <span
        onClick={() => {
          handleClick();
        }}
        className="icon-text"
      >
        <span className="icon">
          <i ref={icon} className="fas fa-sort"></i>
        </span>
      </span>
    </>
  );
};

SortingButton.propTypes = {
  fieldName: PropTypes.string,
  sortingData: PropTypes.func,
};

export default SortingButton;
