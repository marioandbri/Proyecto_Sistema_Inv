import React from "react";
import { useParams } from "react-router-dom";
import InventoryHeader from "./InventoryHeader";
import ProductsComp from "./ProductsComp";
import InventoryTableData from "./InventoryTableData";

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
          <InventoryHeader />
          <ProductsComp />
        </>
      );
    case "Entrega":
      return (
        <>
          <InventoryHeader />
          <ProductsComp />
        </>
      );
    case "Retiro":
      return (
        <>
          <InventoryHeader />
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
