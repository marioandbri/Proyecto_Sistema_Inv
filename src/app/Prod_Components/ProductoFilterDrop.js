import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ProductoFilterDrop = ({
  handleDropdownChange,
  loadOptions,
  options,
  productType,
}) => {
  const [isActive, setIsActive] = useState(false);
  const toggleActive = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    loadOptions();
    return () => {
      options = "";
    };
  }, []);

  return (
    <>
      <div
        id="dropdown"
        onClick={(e) => {
          toggleActive(e);
        }}
        onBlur={() => {
          setTimeout(() => {
            setIsActive(false);
          }, 150);
        }}
        className={`block dropdown ${isActive ? "is-active" : ""}`}
      >
        <div className="dropdown-trigger">
          <button
            className="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
          >
            <span>¿Que tipo de Producto quieres Consultar?</span>
            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {/* <a
              onClick={(e) => {
                handleDropdownChange(e);
              }}
              id="computadores"
              className="dropdown-item"
            >
              Computadores
            </a>
            <a
              onClick={(e) => {
                handleDropdownChange(e);
              }}
              id="impresoras"
              className="dropdown-item"
            >
              Impresoras
            </a>
            <a
              onClick={(e) => {
                handleDropdownChange(e);
              }}
              id="monitores"
              className="dropdown-item"
            >
              Monitores
            </a>
            <a
              onClick={(e) => {
                handleDropdownChange(e);
              }}
              id="proyectores"
              className="dropdown-item"
            >
              Proyectores
            </a>
            <a
              onClick={(e) => {
                handleDropdownChange(e);
              }}
              id="escaneres"
              className="dropdown-item"
            >
              Escáneres
            </a>
            <hr className="dropdown-divider" /> */}

            {options.map((elem, index) => (
              <a
                key={index}
                onClick={(e) => {
                  handleDropdownChange(e);
                }}
                id={elem.option}
                className={`dropdown-item ${
                  elem.option == productType ? "is-active" : ""
                }`}
              >
                {elem.option}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

ProductoFilterDrop.propTypes = {
  handleDropdownChange: PropTypes.func,
  loadOptions: PropTypes.func,
  options: PropTypes.array,
  productType: PropTypes.string,
};

export default ProductoFilterDrop;
