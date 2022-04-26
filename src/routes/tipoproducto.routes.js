import { Router } from "express";
import {
	createProducto,
	deleteProducto,
	getProductoById,
	getProductoByQuery,
	updateProducto,
} from "../controllers/tipoproducto.controller";
const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     TipoProducto:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Identificador unico autogenerado
 *         option:
 *           type: string
 *           description: Nombre del tipo de producto
 *         form:
 *           type: array
 *           description: Arreglo de campos que conforman la estructura del tipo de producto
 *           items:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Titulo del campo
 *               tipo:
 *                 type: string
 *                 description: Tipo de dato almacenado en el campo
 *       required:
 *         - option
 *         - form
 *       example:
 *          _id: 61fbe340367f530ffc1754d9
 *          option: Notebook
 *          form: [{titulo: CPU, tipo: text},{titulo: RAM,tipo: text},{titulo: Almacenamiento,tipo: text}]
 *     UpdateResult:
 *       type: object
 *       properties:
 *         n:
 *           type: integer
 *           description: Cantidad de elementos coincidentes
 *         nModified:
 *           type: integer
 *           description: Cantidad de elementos actualizados
 *         ok:
 *           type: integer
 *           description: Cantidad de elementos procesados de forma correcta
 *       required:
 *         - n
 *         - nModified
 *         - ok
 *       example:
 *         n: 2
 *         nModified: 2
 *         ok: 2
 */
/**
 * @swagger
 *  tags:
 *    name: Tipos de Producto
 *    description: Endpoint para operaciones con tipos de productos
 */

// Create

/**
 * @swagger
 * /producto/types:
 *   post:
 *     summary: Creacion de tipos de producto
 *     tags: [Tipos de Producto]
 *     description: Endpoint encargado de la creacion de tipos de productos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TipoProducto'
 *     responses:
 *       200:
 *         description: resultado de la solicitud de creación
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
router.post("/producto/types", createProducto);

//Read
//By id
/**
 * @swagger
 * /producto/types/{id}:
 *   get:
 *     summary: Un tipo de producto que coincida con el id indicado
 *     tags: [Tipos de Producto]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Resultado de la consulta por campo id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/TipoProducto'
 *
 */
router.get("/producto/types/:id", getProductoById);
// By Query
/**
 * @swagger
 * /producto/types:
 *   get:
 *     summary: Consulta de tipos de producto
 *     tags: [Tipos de Producto]
 *     responses:
 *       200:
 *         description: Lista de tipos de productos coincidentes con la con la consulta, (Por defecto, todos).
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TipoProducto'
 *
 */
router.get("/producto/types", getProductoByQuery);

//Update
/**
 * @swagger
 * /producto/types/{id}:
 *   put:
 *     summary: Actualizacion de tipos de producto #NO DISPONIBLE
 *     tags: [Tipos de Producto]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TipoProducto'
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Actualizacion de tipo de producto coincidente con el id indicado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateResult'
 *
 */
router.put("/producto/types/:id", updateProducto);

//Delete
/**
 * @swagger
 * /producto/types/{id}:
 *   delete:
 *     summary: Eliminacion de tipos de producto por id
 *     tags: [Tipos de Producto]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Elimincion de tipo de producto coincidente con id indicado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Estado de la solicitud de eliminacion
 *                 message:
 *                   type: string
 *                   description: mensaje de confirmacion de la solicitud de eliminacion
 *
 */
router.delete("/producto/types/:id", deleteProducto);

export default router;
