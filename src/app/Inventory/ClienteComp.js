import React from "react";

const Cliente = ({ razonsocial, rut, ubicacion }) => {
  return (
    <>
      <td title={`${rut} \n ${ubicacion}`}>{razonsocial}</td>
    </>
  );
};

export default Cliente;
