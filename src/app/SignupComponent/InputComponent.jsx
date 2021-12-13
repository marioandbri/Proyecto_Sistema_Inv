import React from 'react';
import PropTypes from 'prop-types';


const InputComponent = ({errors, handleChange, value, label, icon, id, required}) => {
  const type = ()=>{
              switch (id) {
                case "password":
                  return "password"
                case "email":
                  return "email"
                default:
                  return "text";
              }
            }
  return (
    <>
      <label className="label" htmlFor={id}>
        {label}
      </label>
      {errors && (
        <p className="has-text-danger">{errors}</p>
      )}
      <div className="field">
        <p className="control has-icons-left">
          <input
            type={type()}
            className={`input ${errors && "is-danger"}`}
            id={id}
            value={value}
            required={required}
            onChange={handleChange}
          />
          <span className="icon is-left">{icon}</span>
        </p>
      </div>
    </>
  );
};


InputComponent.propTypes = {
  errors: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  id:PropTypes.string.isRequired,
  required: PropTypes.bool
};


InputComponent.defaultProps ={
  required: true
}

export default InputComponent;
