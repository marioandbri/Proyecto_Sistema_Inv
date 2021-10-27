import React, { useRef } from "react";
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import ClientSelectorComponent from "./ClientSelectorComponent";
import InventoryHeader from "./InventoryHeader";
import InventoryMenu from "./InventoryMenu";
import InventoryProvider, {
  InventoryContext,
  useDispatch,
  useInventory,
} from "./InventoryProvider";
import { type } from "./InventoryReducer";
import MainInventorySwitch from "./MainInventorySwitch";
import ProductsComp from "./ProductsComp";

const Index = () => {
  let { path, url } = useRouteMatch();
  return (
    <InventoryProvider>
      <div className="container is-fluid box">
        {/* <div className="tile is-ancestor"> */}
        {/* <div */}
        {/* style={{ minHeight: "92vh" }}
            className="tile is-vertical is-parent"
          > */}
        <div className=" box">
          <InventoryMenu />
          <Switch>
            <Route exact path={path}>
              <h1>Seleccione alguna opcion para comenzar</h1>
            </Route>

            <Route
              exact
              path={`${path}/:id`}
              children={
                <>
                  <MainInventorySwitch />
                </>
              }
            />
          </Switch>

          {/* <InventoryHeader /> */}
        </div>
        {/* </div> */}
        {/* <ClientSelectorComponent /> */}
        {/* </div> */}
      </div>
    </InventoryProvider>
  );
};

export default Index;
