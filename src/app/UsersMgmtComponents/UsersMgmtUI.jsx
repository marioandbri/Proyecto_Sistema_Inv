import React, { createContext, useEffect, useState } from "react";
// import PropTypes from "prop-types";
import LoadingBar from "../LoadingBar";
// import { useFetch } from "../useFetch";
import "../../styles/bulma-list.css";
import UserListItem from "./UserListItem";

export const UserMgmtContext = createContext()

const UsersMgmtUI = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const fetchUserData = async () =>{
    setLoading(true)
    const result = await fetch("/uac/mgmt")
    const json = await result.json()
    setData(json)
    setLoading(false)
  }
  useEffect(() => {
    fetchUserData()
    return () => {
      
    };
  }, []);
  

  if (!loading) {
    const updateUsersData = (id, newData) =>{
      let newUsers = data.users.map(e=>e._id == id ? newData : e)
      return setData(newUsers)
    }
    const { users } = data;
    return (
      <>
      <UserMgmtContext.Provider value={fetchUserData}>

        <div className="box">
          <div className="title">Ruta administracion de usuarios</div>
          <div className="list has-hoverable-list-items">
            {users.map((user) => (
              <div key={user._id} className="list-item">
                <UserListItem {...user} updateUsersData={updateUsersData}/>
              </div>
            ))}
          </div>
        </div>
            </UserMgmtContext.Provider>
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
