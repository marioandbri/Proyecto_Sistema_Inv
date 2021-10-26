import { useFetch } from "../useFetch";

export const type = {
  find: "FIND",
  selectClient: "SELECT_CLIENT",
  fechaCompra: "Cambio de Fecha de Compra",
  numeroFactura: "Cambio de Numero de Factura",
  setPN: "set Product Number",
  setProductData: "Sets especified product data partnumber's",
  setOperationType: "Sets the especified type of operation to do",
};

export const initialInventory = {
  operationType: "",
  clientesData: [],
  loadingClientes: true,
  url: "",
  rutProveedor: "",
  fechaCompra: "",
  numeroFactura: "",
  rutPoseedor: "",
  partNumber: "",
  productData: "",
  loadingProductData: true,
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
      return { ...state, operationType: action.payload };
    default:
      return state;
  }
};

export default InventoryReducer;
