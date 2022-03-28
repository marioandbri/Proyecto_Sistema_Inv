import { Router } from "express";
import {
	getHistory,
	getMovimientoByID,
	getMovimientos,
	iniciarMovimiento,
} from "../controllers/movimientos.controller";
const router = Router();

router.post("/mov", iniciarMovimiento);
router.get("/mov", getMovimientos);
router.get("/mov/:serialNumber", getHistory);
router.get("/mov/detalle/:id", getMovimientoByID);

module.exports = router;
