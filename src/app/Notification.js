import React from "react";
import { useDispatch } from "./Inventory/InventoryProvider";
import { type } from "./Inventory/InventoryReducer";
import PropTypes from "prop-types";
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
  const closeNotification = (i) => {
    dispatch({
      type: type.removeNotification,
      payload: i,
    });
  };

  return (
    <div
      style={{
        margin: "1px",
        position: "fixed",
        right: "3%",
        bottom: `${position}%`,
      }}
      id={notificationId}
      className={`notification has-text-weight-semibold ${notificationType}`}
    >
      {content} {detail}
      <button
        onClick={() => {
          closeNotification(notificationIndex);
        }}
        className="delete"
      ></button>
    </div>
  );
};
Notification.propTypes = {
  detail: PropTypes.string,
  content: PropTypes.string,
  notificationType: PropTypes.string,
  notificationIndex: PropTypes.number,
};

export default Notification;
