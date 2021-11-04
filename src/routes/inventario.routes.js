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
} from "../controllers/inventario.controller";

//Create
router.post("/inventario", createInventario);

//Read
//By rut
router.get("/inventario/:sn", getInventarioBySerialNumber);
// By Query
router.get("/inventario", getInventarioByQuery);

//Update
router.put("/inventario/:SerialNumber", updateInventario);

//Delete
router.delete("/inventario/:SerialNumber", deleteInventario);

module.exports = router;
