import React from "react";
import { useParams } from "react-router-dom";
import InventoryHeader from "./InventoryHeader";
import ProductsComp from "./ProductsComp";
import InventoryTableData from "./InventoryTableData";
import { useDispatch } from "./InventoryProvider";
import { type } from "./InventoryReducer";

const MainInventorySwitch = () => {
  let { id } = useParams();
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
        </>
      );
    case "ingreso":
      document.title = "Ingreso - Proyecto Inventario Arrienda";
      return (
        <>
          <InventoryHeader opType={id} />
          <ProductsComp />
        </>
      );
    case "entrega":
      document.title = "Entrega - Proyecto Inventario Arrienda";
      return (
        <>
          <InventoryHeader opType={id} />
          <ProductsComp />
        </>
      );
    case "retiro":
      document.title = "Retiro - Proyecto Inventario Arrienda";
      return (
        <>
          <InventoryHeader opType={id} />
          <ProductsComp />
        </>
      );

    default:
      return (
        <>
          <h1>Default</h1>
        </>
      );
  }
};

export default MainInventorySwitch;
