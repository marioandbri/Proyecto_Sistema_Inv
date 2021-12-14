import React from "react";
import { useParams } from "react-router-dom";
import InventoryHeader from "./InventoryHeader";
import ProductsComp from "./ProductsComp";
import InventoryTableData from "./InventoryTableData";
import Notification from "../Notification";
import { useInventory } from "./InventoryProvider";
import {  useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useAppState } from "../AppProvider";
import {UnauthorizedComponent} from "../app"

const MainInventorySwitch = () => {
  let { id } = useParams();
  const state = useInventory();
  const {userData} = useAppState()
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
      if(userData.accessInventarios[2]){

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
      }else{
        return <UnauthorizedComponent />
      }
    case "entrega":
      if (userData.accessInventarios[2]) {

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
      } else {
        return <UnauthorizedComponent />
      }

    case "retiro":
      if (userData.accessInventarios[2]) {
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
      } else {
        return <UnauthorizedComponent />
      }


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
