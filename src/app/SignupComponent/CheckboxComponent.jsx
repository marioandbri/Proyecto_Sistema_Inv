import React from 'react';
import PropTypes from 'prop-types';
import "../../styles/bulma-radio-checkbox.min.css"

const CheckboxComponent = ({value, id, handleChange, label, checked}) => {
  return (
    <>
      <div className="field">
          <div className="b-checkbox is-info ">
            <input
              type="checkbox"
              className="styled"
              id={id}
              checked={checked}
              value={value}
              onChange={handleChange}
            />
            <label htmlFor={id}>{label}</label>
          </div>
      </div>
    </>
  );
};


CheckboxComponent.propTypes = {
  checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  id: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  value:PropTypes.bool
};

export default CheckboxComponent;
