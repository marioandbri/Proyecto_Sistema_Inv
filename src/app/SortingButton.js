import React, { useRef } from "react";

const SortingButton = ({
  setItems,
  productType,
  sortingData,
  field,
  fieldName,
}) => {
  // console.log(field, "sorting data");
  let fieldNameMap = {
    "Tipo Computador": "tipoComputador",
    "Numero de Parte": "partNumber",
    Marca: "marca",
    Modelo: "modelo",
    "Tipo de Impresora": "tipoImpresora",
    Pulgadas: "tamañoPantalla",
    "Tipo Monitor": "tipoMonitor",
  };

  // const [PartNumber] = field;

  const icon = useRef();
  if (productType.includes("generic")) {
    var property = fieldName == "PartNumber" ? fieldName : ">" + fieldName;
  } else {
    var property = fieldNameMap[fieldName];
  }
  // console.log(icon.current);
  const handleClick = () => {
    if (icon.current.classList.contains("fa-sort")) {
      icon.current.classList.remove("fa-sort");
      icon.current.classList.add("fa-sort-up");
      sortingData(property);
      // let newItems = field.sort(dynamicSort(property));
      // console.log(field);
      // setItems(newItems);
      return;
    }
    if (icon.current.classList.contains("fa-sort-up")) {
      icon.current.classList.remove("fa-sort-up");
      icon.current.classList.add("fa-sort-down");
      // let newItems = field.sort(dynamicSort("-" + property));
      // console.log(field);
      // setItems(newItems);
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

export default SortingButton;
