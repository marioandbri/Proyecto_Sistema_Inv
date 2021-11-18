import { Router } from "express";
const router = Router();
// const fs = require('fs');
// const path = require('path');
import {
  createInventario,
  getInventarioBySerialNumber,
  getInventarioByQuery,
  updateInventario,
  deleteInventario,
  updateInventarioMovimientos,
} from "../controllers/inventario.controller";

//Create
router.post("/inventario", createInventario);

//Read
//Update Movements
router.put("/inventario/entrega", updateInventarioMovimientos);
router.put("/inventario/retiro", updateInventarioMovimientos);
//By rut
router.get("/inventario/:sn", getInventarioBySerialNumber);
// By Query
router.get("/inventario", getInventarioByQuery);

//Update
router.put("/inventario/:sn", updateInventario);

//Delete
router.delete("/inventario/:sn", deleteInventario);

module.exports = router;
