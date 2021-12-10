import React from "react";
// import PropTypes from "prop-types";
import LoadingBar from "../LoadingBar";
import { useFetch } from "../useFetch";
import "../../styles/bulma-list.css";
import UserListItem from "./UserListItem";

const UsersMgmtUI = () => {
  const { loading, data } = useFetch("/uac/mgmt");
  const { users } = data;
  if (!loading) {
    return (
      <>
        <div className="box">
          <div className="title">Ruta administracion de usuarios</div>
          <div className="list has-hoverable-list-items">
            {users.map((user) => (
              <div key={user._id} className="list-item">
                <UserListItem {...user} />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="box">
        <LoadingBar />
      </div>
    );
  }
};

UsersMgmtUI.propTypes = {};

export default UsersMgmtUI;
