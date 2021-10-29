import React from "react";
export const notificationType = {
  success: "is-success",
  info: "is-info",
  danger: "is-danger",
  warning: "is-warning",
};

const Notification = ({ content, type, index }) => {
  let notificationId = `notification-${index}`;
  return (
    <>
      <div id={notificationId} className={`notification ${type}`}>
        <button
          onClick={() => {
            document.getElementById(notificationId).remove();
          }}
          className="delete"
        ></button>
        {content}
      </div>
    </>
  );
};

export default Notification;
