import { Router } from "express";
const router = Router();
// const fs = require('fs');
// const path = require('path');
import {
	createInventario,
	getInventarioBySerialNumber,
	updateInventario,
	updateInventarioMovimientos,
	getInventarios,
	deleteInventario,
} from "../controllers/inventario.mdb.controller";

/**
 * @swagger
 * components:
 *   schemas:
 *     Inventario:
 *       type: object
 *       properties:
 *         _id:
 *            type: string
 *            description: Identificador unico autogenerado
 *         numeroSerie:
 *           type: string
 *           description: Serial identificador unico de equipamiento
 *         productPN:
 *           type: string
 *           description: Identificador unico para el modelo de equipo
 *         rutPoseedor:
 *           type: string
 *           description: RUT de la empresa que posee el equipo actualmente
 *         rutProveedor:
 *           type: string
 *           description: RUT de la empresa a la cual se compro el equipo
 *         fechaCompra:
 *           type: string
 *           description: Fecha de compra del equipo
 *         fechaEvento:
 *           type: string
 *           description: Fecha de ultimo movimiento realizado por el equipo
 *         nroFactura:
 *           type: string
 *           description: Número identificador de la factura de compra del equipo
 *         estado:
 *           type: string
 *           description: Estado actual del equipo
 *         nroGuia:
 *           type: integer
 *           description: Número identificador
 *       example:
 *         "_id": "61e86f7191db91525159aa0a"
 *         "numeroSerie": "MXL6371HYW"
 *         "productPN": "N4P96AV"
 *         "rutPoseedor": "78507660-5"
 *         "rutProveedor": "96823020-4"
 *         "fechaCompra": "2016-11-30T03:00:00.000Z"
 *         "fechaEvento": "2022-02-01T00:00:00.000Z"
 *         "nroFactura": "448889"
 *         "estado": "Operativo"
 *         "nroGuia": 123456
 *   parameters:
 *     numeroSerie:
 *       in: path
 *       name: sn
 *       description: Numero de serie del equipo
 *       required: true
 *       schema:
 *         type: string
 * tags:
 *   name: Inventarios
 *   description: Endpoint para operaciones con el modulo Inventario
 */

//Create
/**
 * @swagger
 * /inventario:
 *   post:
 *     summary: Ingreso de equipo al inventario
 *     tags: [Inventarios]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Inventario'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseMessage'
 */
router.post("/inventario", createInventario);

//Read
//By NumeroSerie
/**
 * @swagger
 * /inventario/{sn}:
 *   get:
 *      summary: Equipo de inventario coincidente con el numero de serie indicado
 *      tags: [Inventarios]
 *      parameters:
 *        - $ref: '#/components/parameters/numeroSerie'
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Inventario'
 *
 */
router.get("/inventario/:sn", getInventarioBySerialNumber);

// By Query
/**
 * @swagger
 * /inventario:
 *   get:
 *     summary: Lista de equipos en inventario
 *     tags: [Inventarios]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Inventario'
 */
router.get("/inventario", getInventarios);

//Update
/**
 * @swagger
 * /inventario/{sn}:
 *   put:
 *     summary: Actualizacion de registro de equipamiento en inventario por numero de serie
 *     tags: [Inventarios]
 *     parameters:
 *       - $ref: '#/components/parameters/numeroSerie'
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Inventario'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseMessage'
 */
router.put("/inventario/:sn", updateInventario);

//Update Movements
/**
 * @swagger
 * /inventario/entrega:
 *   put:
 *     summary: Realizar movimiento de entrega de equipamiento
 *     tags: [Inventarios]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Inventario'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseMessage'
 */
router.put("/inventario/entrega", updateInventarioMovimientos);

/**
 * @swagger
 * /inventario/retiro:
 *   put:
 *     summary: Realizar movimientos de retiro de equipamiento
 *     tags: [Inventarios]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Inventario'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseMessage'
 */
router.put("/inventario/retiro", updateInventarioMovimientos);

//Delete

/**
 * @swagger
 * /inventario/{sn}:
 *   delete:
 *     summary: Eliminacíon de equipamiento en inventario por numero de serie
 *     tags: [Inventarios]
 *     parameters:
 *       - $ref: '#/components/parameters/numeroSerie'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseMessage'
 */
router.delete("/inventario/:sn", deleteInventario);

export default router;
// module.exports = router;
