import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import SignupForm from "../SignupComponent/SignupForm";
import PasswordModal from "./PasswordModal";
import { useAppDispatch, useAppState } from "../AppProvider";
import { type } from "../AppReducer";
import { UserMgmtContext } from "./UsersMgmtUI";

const UserListItem = (user) => {
  const { username, email, _id } = user;
  const dispatch = useAppDispatch()
  const {userData} = useAppState()
  const {isAdmin, _id: actualUserId} = userData
  const [userFrame, setUserFrame] = useState(null);
  const closeModal = () => {
    dispatch({ type: type.USER_MANAGEMENT, payload: false });
    setUserFrame(null);
  };
  const editUser = () => {
    dispatch({type: type.USER_MANAGEMENT, payload: true})
    setUserFrame(<UserModal user={user} closeModal={closeModal} />);
  };
  const updatePassword = () => {
    setUserFrame(<PasswordModal id={user._id} closeModal={closeModal} isAdmin={isAdmin}/>);
  };
  const deleteUser = async (id) =>{
    const result = await fetch(`/uac/mgmt/${id}`,{
      method:"DELETE"
    })
    const data = await result.json()
    console.log(data)
  }
  
  return (
    <>
      {userFrame}
      <div className="list-item-content">
        <span className="list-item-title">{username}</span>
        <span className="list-item-description">{email}</span>
      </div>
      <div className="list-item-controls">
        <div className="buttons is-right">
          {!(actualUserId === _id) && <>
          <button onClick={() => editUser()} className="button is-info">
            <span className="icon">
              <i className="fas fa-edit"></i>
            </span>
            <span>Editar</span>
          </button>
          <button onClick={() => updatePassword()} className="button is-primary">
            <span className="icon">
              <i className="fas fa-key"></i>
            </span>
            <span>Cambiar contraseña</span>
          </button>
          <button onClick={() => deleteUser(_id)} className="button is-danger">
            <span className="icon">
              <i className="fas fa-trash"></i>
            </span>
            <span>Remover</span>
          </button>
          </>}
          
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
  const {isManagingUsers} = useAppState()
  const context = useContext(UserMgmtContext);
  useEffect(() => {
    
    return () => {
      context()
      
    };
  }, []);
  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content">
        <SignupForm isManagingUsers={isManagingUsers} userData={user} />
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
