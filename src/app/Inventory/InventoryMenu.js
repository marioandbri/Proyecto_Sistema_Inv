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
            menuIcon.current.classList.toggle("fa-bars");
            menuIcon.current.classList.toggle("fa-times");
            setIsMenuVisible(!isMenuVisible);
          }}
        >
          <p className="">
            Menú Inventarios{" "}
            <span className="icon ml-1">
              <i ref={menuIcon} className="fas fa-bars"></i>
            </span>
          </p>
        </a>
        <ul className={`menu-list ${isMenuVisible ? "" : "is-hidden"}`}>
          {operations.map((e) => (
            <li
              key={e}
              onClick={(element) => {
                // console.log(element.target);
                setOperationType(element);
              }}
            >
              <Link
                to={`${url}/${e}`}
                className={e == state.operationType ? "is-active" : ""}
                id={e}
              >
                {e}
              </Link>
            </li>
          ))}
          {/* <li>
            <Link>
              <span
                ref={(e) => (menuItems.current["ingreso"] = e)}
                onClick={(e) => {
                  setOperationType(e);
                }}
                name="ingreso"
              >
                Ingreso
              </span>
            </Link>
          </li>
          <li>
            <Link>
              <span
                ref={(e) => (menuItems.current["entrega"] = e)}
                onClick={(e) => {
                  setOperationType(e);
                }}
                name="entrega"
              >
                Entrega
              </span>
            </Link>
          </li>
          <li>
            <Link>
              <span
                ref={(e) => (menuItems.current["retiro"] = e)}
                onClick={(e) => {
                  setOperationType(e);
                }}
                name="retiro"
              >
                Retiro
              </span>
            </Link>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default InventoryMenu;