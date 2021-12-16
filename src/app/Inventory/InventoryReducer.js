import { ToastNotification } from "../AppReducer";

export const type = {
  selectClient: "SELECT_CLIENT",
  selectPossesor: "Selecciona la informacion del nuevo poseedor",
  reInitializeData:
    "Restablece los campos relacionados con ingreso, entrega y retiro",
  fechaCompra: "Cambio de Fecha de Compra",
  numeroFactura: "Cambio de Numero de Factura",
  setPN: "set Product Number",
  setProductData: "Sets especified product data partnumber's",
  setOperationType: "Sets the especified type of operation to do",
  prepareIngreso: "Sets Arrienda Rut to rutposeedor",
  setProductsHeader: "Sets the data for the products header",
  addNotification: "Add a notification component",
  removeNotification: "Remove notification for the index parameter",
  LOADING_CLIENTES: "loading",
  EDIT_ROW: "edit a row",
  SET_ROWS: "sets the rows",
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
  editingRows: [],
};

const InventoryReducer = (state, action) => {
  switch (action.type) {
    case type.selectClient:
      return { ...state, rutProveedor: action.payload };
    case type.selectPossesor:
      return { ...state, rutPoseedor: action.payload };
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
    case type.reInitializeData:
      return {
        ...state,
        productsHeader: initialInventory.productsHeader,
        rutProveedor: initialInventory.rutProveedor,
        rutPoseedor: initialInventory.rutPoseedor,
        partNumber: initialInventory.partNumber,
        fechaCompra: initialInventory.fechaCompra,
        fechaEvento: initialInventory.fechaEvento,
        productData:initialInventory.productData
      };
    case type.addNotification: {
      let content = action.payload.content.concat(" ",action.payload?.detail || "")
      ToastNotification(action.payload.notificationType, content )
      return state
      // let actualNotis = [...state.notifications];
      // let newNotification = {
      //   detail: action.payload?.detail,
      //   content: action.payload.content,
      //   notificationType: action.payload.notificationType,
      // };
      // actualNotis.push(newNotification);
      // return { ...state, notifications: actualNotis };
    }
    case type.removeNotification: {
      let notificationIndex = action.payload;
      let arrayRemove = [...state.notifications];
      arrayRemove.splice(notificationIndex, 1);
      return { ...state, notifications: arrayRemove };
    }
    case type.LOADING_CLIENTES: {
      return { ...state, loadingClientes: action.payload };
    }
    case type.EDIT_ROW: {
      let editingArray = [...state.editingRows];
      if (editingArray.includes(action.payload)) {
        editingArray.splice(editingArray.indexOf(action.payload), 1);
      } else {
        editingArray.push(action.payload);
      }
      return { ...state, editingRows: editingArray };
    }
    default:
      return state;
  }
};

export default InventoryReducer;
