import React from "react";
import { useParams } from "react-router-dom";
import InventoryHeader from "./InventoryHeader";
import ProductsComp from "./ProductsComp";
import InventoryTableData from "./InventoryTableData";
import { useDispatch } from "./InventoryProvider";
import { type } from "./InventoryReducer";

const MainInventorySwitch = () => {
  let { id } = useParams();
  switch (id) {
    case "Consulta":
      return (
        <>
          <InventoryTableData />
        </>
      );
    case "Ingreso":
      return (
        <>
          <InventoryHeader opType={id} />
          <ProductsComp />
        </>
      );
    case "Entrega":
      return (
        <>
          <InventoryHeader opType={id} />
          <ProductsComp />
        </>
      );
    case "Retiro":
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
