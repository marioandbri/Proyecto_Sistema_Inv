import React from 'react';
import PropTypes from 'prop-types';


const SwitchComponent = ({value, id, handleChange, label, checked}) => {
  return (
    <>
      <div className="field">
        <label style={{display:"flex", flexDirection:"row-reverse", justifyContent:"space-between"}} className="switch is-rounded" htmlFor={id}>
        <input
          type="checkbox"
          id={id}
          checked={checked}
          value={value}
          onChange={handleChange}
        />
        <span className="check is-info"></span>
        <span className="control-label">{label}</span>
        </label>
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
