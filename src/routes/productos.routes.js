import { Router } from "express";
import {
	createBulkProducto,
	createProducto,
	deleteProducto,
	getAllProducts,
	getFamilyList,
	getProductoById,
	getProductoByQuery,
	getProductPN,
	updateProducto,
} from "../controllers/productos.controller";
const router = Router();

// Create
router.post("/producto/", createProducto);
router.post("/producto/bulk", createBulkProducto);

//Read
//Get by Partnumber
router.get("/producto/partnumber/:pn", getProductPN);
//Get list of Family Types
router.get("/producto/:productType/familyList", getFamilyList);
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
