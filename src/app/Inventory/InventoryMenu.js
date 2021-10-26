import React, { useRef, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { useDispatch, useInventory } from "./InventoryProvider";
import { type } from "./InventoryReducer";
import Inventory from "../Inventory";

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
  return (
    <>
      <div style={{ display: "inline-block" }} className="menu ">
        <a
          className="button is-outlined is-link"
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
                console.log(element.target);
                setOperationType(element);
              }}
            >
              <a className={e == state.operationType ? "is-active" : ""} id={e}>
                {e}
              </a>
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
    </>
  );
};

export default InventoryMenu;
