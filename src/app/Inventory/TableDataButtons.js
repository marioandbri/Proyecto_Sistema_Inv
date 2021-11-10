import React from "react";
import { notificationTypes } from "../Notification";
import { useDispatch } from "./InventoryProvider";
import { type } from "./InventoryReducer";

const TableDataButtons = ({ row, reloadData, editRow, index }) => {
  const dispatch = useDispatch();
  const handleRemove = async (sn) => {
    const result = await fetch(`/inventario/${sn}`, {
      method: "DELETE",
    })
      .then((data) => data.json())
      .catch((e) => console.log(e));
    // console.log(result);
    dispatch({
      type: type.addNotification,
      payload: {
        content: "❗ " + result.message,
        notificationType: notificationTypes.success,
      },
    });
    reloadData();
  };
  const { numeroSerie } = row.original;
  return (
    <td align="center">
      <div className="buttons are-small">
        <a
          title="Editar"
          className="button m-1 is-outlined is-small is-info"
          onClick={() => {
            console.log(row.index);
            editRow(row.index);
          }}
        >
          <span className="icon">
            <i className="fas fa-pen"></i>
          </span>
        </a>
        <a
          title="Eliminar"
          className="button m-1 is-outlined is-small is-danger"
          onClick={() => {
            const validarRemove = confirm(
              `¿Está seguro que desea borrar el registro: ${numeroSerie}?`
            );
            if (validarRemove) {
              handleRemove(numeroSerie);
            } else {
              dispatch({
                type: type.addNotification,
                payload: {
                  content: `🛑 Se cancelo la operación`,
                  notificationType: notificationTypes.info,
                },
              });
            }
          }}
        >
          <span className="icon">
            <i className="fas fa-minus-circle"></i>
          </span>
        </a>
      </div>
    </td>
  );
};

export default TableDataButtons;
