import React from "react";
import { notificationTypes } from "../Notification";
import { useDispatch } from "./InventoryProvider";
import { type } from "./InventoryReducer";
import PropTypes from "prop-types";

const TableEditingButtons = ({
  row,
  finalEditRow,
  cancelEditRow,
  restoreData,
}) => {
  const dispatch = useDispatch();
  const { productPN, rutPoseedor, fechaCompra, rutProveedor, nroFactura } =
    row.original;
  const updateObject = {
    productPN,
    rutPoseedor,
    fechaCompra,
    rutProveedor,
    nroFactura,
  };
  const { numeroSerie: sn } = row.original;
  const handleUpdate = async () => {
    // console.log(updateObject);
    const result = await fetch(`/inventario/${sn}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateObject),
    })
      .then((data) => data.json())
      .catch((e) => console.log(e));
    console.log(result);
    dispatch({
      type: type.addNotification,
      payload: {
        content: "🔂 " + "Actualizacion de Item realizada",
        notificationType: notificationTypes.info,
      },
    });
    finalEditRow(row.index);
    // reloadData();
  };
 
    return (
      <td>
        <div className="buttons are-small">
          <a
            title="Actualizar"
            className="button m-1 is-outlined is-small is-success"
            onClick={() => {
              handleUpdate();
            }}
          >
            <span className="icon">
              <i className="fas fa-check"></i>
            </span>
          </a>
          <a
            title="Cancelar"
            className="button m-1 is-outlined is-small is-danger"
            onClick={() => {
              restoreData(row.index);
              cancelEditRow(row.index);
              // reloadData();
              dispatch({
                type: type.addNotification,
                payload: {
                  content: `Se cancelo la operación`,
                  notificationType: notificationTypes.warning,
                },
              });
            }}
          >
            <span className="icon">
              <i className="fas fa-times"></i>
            </span>
          </a>
        </div>
      </td>
    );
  }
TableEditingButtons.propTypes = {
  row: PropTypes.object,
  finalEditRow: PropTypes.func,
  cancelEditRow: PropTypes.func,
  restoreData: PropTypes.func,
};
export default TableEditingButtons;
