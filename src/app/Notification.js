import React, { useEffect, useRef } from "react";
import { useDispatch, useInventory } from "./Inventory/InventoryProvider";
import { type } from "./Inventory/InventoryReducer";
export const notificationTypes = {
  success: "is-success",
  info: "is-info",
  danger: "is-danger",
  warning: "is-warning",
};

const Notification = ({
  detail,
  content,
  notificationType,
  notificationIndex,
}) => {
  const dispatch = useDispatch();
  let notificationId = `notification-${notificationIndex}`;
  const position = (notificationIndex + 1) * 5;
  return (
    <div
      style={{
        margin: "1px",
        position: "fixed",
        right: "5%",
        bottom: `${position}%`,
      }}
      id={notificationId}
      className={`notification has-text-weight-semibold ${notificationType}`}
    >
      {content} {detail}
      <button
        onClick={() => {
          dispatch({
            type: type.removeNotification,
            payload: notificationIndex,
          });
        }}
        className="delete"
      ></button>
    </div>
  );
};

export default Notification;
