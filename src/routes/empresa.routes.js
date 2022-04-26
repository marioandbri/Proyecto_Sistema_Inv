import { Router } from "express";
const router = Router();
import {
	deleteEmpresa,
	getEmpresaByRut,
	getEmpresas,
	postEmpresas,
	updateEmpresa,
} from "../controllers/empresa.controller";

/**
 * @swagger
 * components:
 *   schemas:
 *     Empresa:
 *       type: object
 *       properties:
 *         _id:
 *            type: string
 *            description: Identificador autogenerado
 *         rut:
 *           type: string
 *           description: Registro Unico Tributario perteneciente a la empresa
 *         razon_social:
 *           type: string
 *           description: Nombre juridico de la empresa
 *         ubicacion:
 *           type: string
 *           description: Direccion fiscal de la empresa
 *         telefono_contacto:
 *           type: number
 *           description: Numero telefonico de la persona de contacto en la empresa
 *         cargo:
 *           description: Cargo de la persona de contacto
 *       required:
 *         - rut
 *         - razon_social
 *       example:
 *         "_id": "61e86f3b91db91525159a161"
 *         "rut": "12345678-9"
 *         "razon_social": "RAZON SOCIAL"
 *         "ubicacion": "AV. CONTOSO, SANTIAGO"
 *         "telefono_contacto": 123456789
 *         "cargo": "GERENTE TI"
 *
 */
/**
 * @swagger
 * tags:
 *   name: Empresas
 *   description: Endpoint para operaciones con empresas
 */

//Create
/**
 * @swagger
 * /empresa:
 *   post:
 *     summary: Creación de empresas
 *     tags: [Empresas]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Empresa'
 *     responses:
 *       200:
 *         description: Creación de empresas con datos enviados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Empresa'
 */
router.post("/empresa", postEmpresas);
//Read
//By rut
/**
 * @swagger
 * /empresa/{rut}:
 *   get:
 *     summary: Consulta de Empresas por RUT
 *     tags: [Empresas]
 *     parameters:
 *       - in: path
 *         name: rut
 *         type: string
 *         description: Rut de la empresa a consultar
 *     responses:
 *       200:
 *         description: Empresa coincidente con el rut indicado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Empresa'
 */
router.get("/empresa/:rut", getEmpresaByRut);
// By Query
/**
 * @swagger
 * /empresa:
 *   get:
 *     summary: Consulta de empresas
 *     tags: [Empresas]
 *     responses:
 *       200:
 *         description: Lista de Empresas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Empresa'
 */
router.get("/empresa", getEmpresas);

//Update
/**
 * @swagger
 * /empresa/{rut}:
 *   put:
 *     summary: Actualizacion de datos de empresa, de la empresa que coincide con el rut indicado
 *     tags: [Empresas]
 *     parameters:
 *       - in: path
 *         name: rut
 *         type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Empresa'
 *     responses:
 *       200:
 *         description: "Actualizacion de datos a la empresa correspondiente al rut indicado"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateResult'
 */
router.put("/empresa/:rut", updateEmpresa);

//Delete
/**
 * @swagger
 * /empresa/{rut}:
 *   delete:
 *     summary: Eliminacion de empresa
 *     tags: [Empresas]
 *     parameters:
 *       - in: path
 *         name: rut
 *         type: string
 *     responses:
 *       200:
 *         description: Eliminacion de empresa coincidente con rut indicado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: estado de la solicitud
 *                 message:
 *                   type: string
 *                   description: Mensaje de confirmación de la operación
 *
 *
 */
router.delete("/empresa/:rut", deleteEmpresa);

export default router;
// module.exports = router;
