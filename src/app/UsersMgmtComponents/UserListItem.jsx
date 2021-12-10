import React, { useState } from "react";
import PropTypes from "prop-types";
import SignupForm from "../SignupComponent/SignupForm";

const UserListItem = (user) => {
  let { username, email } = user;
  const [userFrame, setUserFrame] = useState(null);
  const closeModal = () => {
    setUserFrame(null);
  };
  const editUser = () => {
    setUserFrame(<UserModal user={user} closeModal={closeModal} />);
  };
  return (
    <>
      {userFrame}
      <div className="list-item-content">
        <span className="list-item-title">{username}</span>
        <span className="list-item-description">{email}</span>
      </div>
      <div className="list-item-controls">
        <div className="buttons is-right">
          <button onClick={() => editUser()} className="button is-info">
            <span className="icon">
              <i className="fas fa-edit"></i>
            </span>
            <span>Editar</span>
          </button>
        </div>
      </div>
    </>
  );
};

UserListItem.propTypes = {
  username: PropTypes.string,
  email: PropTypes.string,
};
const UserModal = ({ user, closeModal }) => {
  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content">
        <SignupForm isManagingUsers={true} userData={user} />
        <button
          style={{ position: "absolute", top: "1%", right: "0.5%" }}
          onClick={() => {
            closeModal();
          }}
          className="button delete is-danger"
        ></button>
      </div>
    </div>
  );
};

UserModal.propTypes = {
  user: PropTypes.object,
  closeModal: PropTypes.func,
};

export default UserListItem;
