import React, { useState, useEffect } from "react";

const ProductoFilterDrop = ({ handleDropdownChange, loadOptions, options }) => {
  const [isActive, setIsActive] = useState(false);
  const toggleActive = (e) => {
    setIsActive(!isActive);
  };
  useEffect(() => {
    console.log("useEffect ejecutado");
    if (isActive) {
      document.getElementById("dropdown").classList.add("is-active");
    } else {
      document.getElementById("dropdown").classList.remove("is-active");
    }
    return () => { };
  }, [isActive]);

  // const [options, setOptions] = useState([]);
  // const loadOptions = async () => {
  //   let result = await fetch('/producto/option').then(res => res.json())
  //   console.log(result)
  //   setOptions(result)

  // }
  useEffect(() => {
    loadOptions()
    return () => {
      options = ""

    };
  }, []);

  return (
    <>
      <div
        id="dropdown"
        onClick={(e) => {
          toggleActive(e);
        }}
        className="block dropdown"
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
            <a
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
            <hr className="dropdown-divider" />

            {options.map((elem, index) => (
              <a key={index}
                onClick={(e) => {
                  handleDropdownChange(e);
                }}
                id={`generic/${elem.option}`}
                className="dropdown-item"
              >{elem.option}</a>


            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductoFilterDrop;
