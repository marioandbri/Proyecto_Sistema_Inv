import React from 'react';
import PropTypes from 'prop-types';


const SwitchComponent = ({value, id, handleChange, label, checked}) => {
  return (
    <>
      <div className="field">
        <input
          type="checkbox"
          className="switch is-info"
          id={id}
          checked={checked}
          value={value}
          onChange={handleChange}
        />
        <label htmlFor={id}>{label}</label>
      </div>
    </>
  );
};


SwitchComponent.propTypes = {
  checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  id: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.bool,
};


export default SwitchComponent;
