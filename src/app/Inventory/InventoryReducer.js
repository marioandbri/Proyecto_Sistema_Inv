import { useFetch } from "../useFetch";

export const type = {
  find: "FIND",
  selectClient: "SELECT_CLIENT",
  fechaCompra: "Cambio de Fecha de Compra",
  numeroFactura: "Cambio de Numero de Factura",
  selectProductType: "Select product type",
  setPN: "set Product Number"
};

export const initialInventory = {
  url: "",
  rutProveedor: "",
  fechaCompra: "",
  numeroFactura: "",
  rutTenedor: "",
  tipoProducto: "",
  partNumber: ""
};

const InventoryReducer = (state, action) => {
  switch (action.type) {
    case type.find:
      const [product, index] = action.payload
      let url = `/producto/${product.tipoEquipo}/partnumber/${product.partNumber}`;
      let products = [...state.productsData]


      return { ...state, productsData: products, url };
    case type.selectClient:
      return { ...state, rutProveedor: action.payload };
    case type.fechaCompra:
      return { ...state, fechaCompra: action.payload };
    case type.numeroFactura:
      return { ...state, numeroFactura: action.payload };
    case type.selectProductType:
      return { ...state, tipoProducto: action.payload };
    case type.setPN:
      return { ...state, partNumber: action.payload };
    default:
      return state;
  }
};

export default InventoryReducer;
