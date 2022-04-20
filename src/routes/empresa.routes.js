import { Router } from "express";
const router = Router();
import {
	deleteEmpresa,
	getEmpresaByRut,
	getEmpresas,
	postEmpresas,
	updateEmpresa,
} from "../controllers/empresa.controller";
//Create
router.post("/empresa", postEmpresas);
//Read
//By rut
router.get("/empresa/:rut", getEmpresaByRut);
// By Query
router.get("/empresa", getEmpresas);

//Update
router.put("/empresa/:rut", updateEmpresa);

//Delete
router.delete("/empresa/:rut", deleteEmpresa);

export default router;
// module.exports = router;
