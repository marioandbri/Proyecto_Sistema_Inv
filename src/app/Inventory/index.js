import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import InventoryMenu from "./InventoryMenu";
import InventoryProvider from "./InventoryProvider";
import MainInventorySwitch from "./MainInventorySwitch";

const Index = () => {
  let { path } = useRouteMatch();
  
  return (
    <InventoryProvider>
      <div className="container is-fluid box">
        <div className="has-background-info-light box">
          <InventoryMenu />
          <Switch>
            <Route exact path={path}>
              <h1>Seleccione alguna opcion para comenzar</h1>
            </Route>

            <Route exact path={`${path}/:id`}>
              <MainInventorySwitch />
            </Route>
          </Switch>
        </div>
      </div>
    </InventoryProvider>
  );
};

export default Index;
