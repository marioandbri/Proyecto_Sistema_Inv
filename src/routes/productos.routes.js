import { Router } from "express";
import {
  createProducto,
  deleteProducto,
  getAllProducts,
  getProductoById,
  getProductoByQuery,
  updateProducto,
} from "../controllers/productos.controller";
const router = Router();

// Create
router.post("/producto/", createProducto);

//Read
//By id
router.get("/producto/:productType/:id", getProductoById);
// By Query
router.get("/producto/:productType", getProductoByQuery);
//All Products
router.get("/producto", getAllProducts);

//Update
router.put("/producto/:productType/:id", updateProducto);

//Delete
router.delete("/producto/:productType/:id", deleteProducto);

module.exports = router;
