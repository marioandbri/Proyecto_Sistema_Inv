import React from "react";
import { useFetch } from "../useFetch";
import Notification from "../Notification";

export const type = {
  find: "FIND",
  selectClient: "SELECT_CLIENT",
  fechaCompra: "Cambio de Fecha de Compra",
  numeroFactura: "Cambio de Numero de Factura",
  setPN: "set Product Number",
  setProductData: "Sets especified product data partnumber's",
  setOperationType: "Sets the especified type of operation to do",
  prepareIngreso: "Sets Arrienda Rut to rutposeedor",
  setProductsHeader: "Sets the data for the products header",
  addNotification: "Add a notification component",
};

export const initialInventory = {
  operationType: "",
  // clientesData: [],
  loadingClientes: true,
  // url: "",
  rutProveedor: "",
  fechaCompra: "",
  numeroFactura: "",
  rutPoseedor: "",
  partNumber: "",
  productData: "",
  loadingProductData: true,
  productsHeader: "",
  notifications: [],
};

const InventoryReducer = (state, action) => {
  switch (action.type) {
    case type.find:
      const [product, index] = action.payload;
      let url = `/producto/partnumber/${product.partNumber}`;
      let products = [...state.productsData];

      return { ...state, productsData: products, url };
    case type.selectClient:
      return { ...state, rutProveedor: action.payload };
    case type.fechaCompra:
      return { ...state, fechaCompra: action.payload };
    case type.numeroFactura:
      return { ...state, numeroFactura: action.payload };
    case type.setPN:
      return { ...state, partNumber: action.payload };
    case type.setProductData:
      // const { loading, data } = action.payload;
      return { ...state, productData: action.payload };
    case type.setOperationType:
      return {
        ...state,
        operationType: action.payload,
      };
    case type.prepareIngreso:
      return { ...state, rutPoseedor: "78507660-5" };
    case type.setProductsHeader:
      return { ...state, productsHeader: action.payload };
    case type.addNotification:
      let actualNotis = [...state.notifications];
      let newNotification = (
        <Notification {...action.payload} index={actualNotis.length} />
      );
      actualNotis.push(newNotification);
      return { ...state, notifications: actualNotis };

    default:
      return state;
  }
};

export default InventoryReducer;
