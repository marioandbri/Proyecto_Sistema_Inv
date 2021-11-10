import React from "react";
import { useParams } from "react-router-dom";
import InventoryHeader from "./InventoryHeader";
import ProductsComp from "./ProductsComp";
import InventoryTableData from "./InventoryTableData";
import Notification from "../Notification";
import { useDispatch, useInventory } from "./InventoryProvider";
import { type } from "./InventoryReducer";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const MainInventorySwitch = () => {
  let { id } = useParams();
  const state = useInventory();
  React.useEffect(() => {
    return () => {
      document.title = "Proyecto Sistema Inventario";
    };
  }, []);
  switch (id) {
    case "consulta":
      document.title = "Consulta - Proyecto Inventario Arrienda";
      return (
        <>
          <InventoryTableData />
          {state.notifications.map((e, index) => (
            <Notification key={index} {...e} notificationIndex={index} />
          ))}
        </>
      );
    case "ingreso":
      document.title = "Ingreso - Proyecto Inventario Arrienda";
      return (
        <>
          <InventoryHeader opType={id} />
          <ProductsComp />
          {state.notifications.map((e, index) => (
            <Notification key={index} {...e} notificationIndex={index} />
          ))}
        </>
      );
    case "entrega":
      document.title = "Entrega - Proyecto Inventario Arrienda";
      return (
        <>
          <InventoryHeader opType={id} />
          <ProductsComp />
          {state.notifications.map((e, index) => (
            <Notification key={index} {...e} notificationIndex={index} />
          ))}
        </>
      );
    case "retiro":
      document.title = "Retiro - Proyecto Inventario Arrienda";
      return (
        <>
          <InventoryHeader opType={id} />
          <ProductsComp />
          {state.notifications.map((e, index) => (
            <Notification key={index} {...e} notificationIndex={index} />
          ))}
        </>
      );

    default:
      return (
        <>
          <h1 className="title">
            Ruta: <code>{useLocation().pathname}</code> no encontrada
          </h1>
        </>
      );
  }
};

export default MainInventorySwitch;
