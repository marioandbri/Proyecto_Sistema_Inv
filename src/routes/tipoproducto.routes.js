import { Router } from "express";
import {
	createProducto,
	deleteProducto,
	getProductoById,
	getProductoByQuery,
	updateProducto,
} from "../controllers/tipoproducto.controller";
const router = Router();
// Create
router.post("/producto/types", createProducto);

//Read
//By id
router.get("/producto/types/:id", getProductoById);
// By Query
router.get("/producto/types", getProductoByQuery);

//Update
router.put("/producto/types/:id", updateProducto);

//Delete
router.delete("/producto/types/:id", deleteProducto);

export default router;
