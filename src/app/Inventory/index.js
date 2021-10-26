import React, { useRef } from "react";
import ClientSelectorComponent from "./ClientSelectorComponent";
import InventoryHeader from "./InventoryHeader";
import InventoryMenu from "./InventoryMenu";
import InventoryProvider, {
  InventoryContext,
  useDispatch,
  useInventory,
} from "./InventoryProvider";
import { type } from "./InventoryReducer";
import ProductsComp from "./ProductsComp";

const Index = ({ operationType }) => {
  console.log(operationType);
  return (
    <InventoryProvider>
      <div className="container is-fluid box">
        <div className="tile is-ancestor">
          <div
            style={{ minHeight: "92vh" }}
            className="tile is-vertical is-parent"
          >
            <div className="tile is-child box">
              <InventoryMenu />
              {/* <div className="title">
                <span>
                  <i className="fas fa-tools"></i>
                </span>
              </div> */}
              <InventoryHeader />
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
