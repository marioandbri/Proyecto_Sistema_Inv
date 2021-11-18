import React, { useEffect, useRef, useState } from "react";
import {
  Link,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { useDispatch, useInventory } from "./InventoryProvider";
import { type } from "./InventoryReducer";
import InventoryHeader from "./InventoryHeader";

const InventoryMenu = () => {
  const menuIcon = useRef();
  const menuItems = useRef([]);
  const state = useInventory();
  const dispatch = useDispatch();
  const operations = ["Consulta", "Ingreso", "Entrega", "Retiro"];
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const setOperationType = (e) => {
    dispatch({ type: type.setOperationType, payload: e.target.id });
  };

  let { url } = useRouteMatch();

  return (
    <div className="box is-inline-block m-1 p-2">
      <div style={{ display: "inline-block" }} className="menu">
        <a
          className="button is-small is-inverted is-link"
          onClick={() => {
            setIsMenuVisible(!isMenuVisible);
          }}
        >
          <p className="">
            Menú Inventarios{" "}
            <span className="icon ml-1">
              <i
                ref={menuIcon}
                className={`fas ${isMenuVisible ? "fa-times" : "fa-bars"}`}
              ></i>
            </span>
          </p>
        </a>
        <ul className={`menu-list ${isMenuVisible ? "" : "is-hidden"}`}>
          {operations.map((e) => (
            <li
              key={e}
              onClick={(element) => {
                setOperationType(element);
                setIsMenuVisible(false);
              }}
            >
              <Link
                to={`${url}/${e.toLowerCase()}`}
                className={
                  e.toLowerCase() == state.operationType ? "is-active" : ""
                }
                id={e.toLowerCase()}
              >
                {e}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InventoryMenu;
