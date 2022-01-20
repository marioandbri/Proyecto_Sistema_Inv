import React from "react";
import PropTypes from "prop-types";

const Cliente = ({ razonsocial, rut, ubicacion }) => {
  return (
    <>
      <td title={`${rut} \n ${ubicacion}`}>{razonsocial}</td>
    </>
  );
};

Cliente.propTypes = {
  razonsocial: PropTypes.string,
  rut: PropTypes.rut,
  ubicacion: PropTypes.string,
};

export default Cliente;
