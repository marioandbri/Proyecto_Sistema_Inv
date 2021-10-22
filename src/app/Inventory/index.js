import React from "react";
import ClientSelectorComponent from "./ClientSelectorComponent";
import InventoryHeader from "./InventoryHeader";
import InventoryProvider, { InventoryContext } from "./InventoryProvider";
import ProductsComp from "./ProductsComp";

const Index = () => {
  return (
    <InventoryProvider>
      <div className="container is-fluid box">
        <div className="tile is-ancestor">
          <div className="tile is-vertical is-parent">
            <div className="tile is-child box">
              <div className="title">
                Site under Construction...{" "}
                <span>
                  <i className="fas fa-tools"></i>
                </span>
                <InventoryHeader />
              </div>
            </div>
            <ProductsComp />
          </div>
          {/* <ClientSelectorComponent /> */}
        </div>
      </div>
    </InventoryProvider>
  );
};

export default Index;
