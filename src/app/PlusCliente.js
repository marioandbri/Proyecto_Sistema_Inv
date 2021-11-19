import React from "react";
import PropTypes from "prop-types";

function PlusCliente({ cC }) {
  return (
    <tr>
      <td colSpan="7">
        <button className="button is-success" onClick={cC}>
          <span className="icon">
            <i className="fas fa-plus"></i>
          </span>
        </button>
      </td>
    </tr>
  );
}

PlusCliente.propTypes = {
  cC: PropTypes.func,
};

export default PlusCliente;
