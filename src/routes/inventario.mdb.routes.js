import { Router } from "express";
const router = Router();
// const fs = require('fs');
// const path = require('path');
import {
	createInventario,
	getInventarioBySerialNumber,
	updateInventario,
	deleteInventario,
	updateInventarioMovimientos,
	getInventarios,
} from "../controllers/inventario.mdb.controller";

//Create
router.post("/inventario", createInventario);

//Read
//By rut
// router.get("/inventario/:sn", getInventarioBySerialNumber);

// By Query
router.get("/inventario", getInventarios);

//Update Movements
router.put("/inventario/entrega", updateInventarioMovimientos);
router.put("/inventario/retiro", updateInventarioMovimientos);

//Update
router.put("/inventario/:sn", updateInventario);

//Delete
router.delete("/inventario/:sn", deleteInventario);

module.exports = router;
