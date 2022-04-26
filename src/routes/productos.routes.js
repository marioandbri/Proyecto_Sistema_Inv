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
/**
 * @swagger
 * components:
 *   schemas:
 *     Producto:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Identificador unico autogenerado
 *         tipoProducto:
 *           type: string
 *           description: Categoria del producto
 *         partnumber:
 *           type: string
 *           description: Identificador unico del modelo de producto
 *         marca:
 *           type: string
 *           description: Marca del producto
 *         modelo:
 *           type: string
 *           description: Nombre del modelo del producto
 *         familia:
 *           type: string
 *           description: Sub-categoria del producto
 *         detalle:
 *           description: Estructura especifica del tipo de producto
 *           type: object
 *         shortDescription:
 *           type: string
 *           description: Descripcion corta generada por campos importantes del producto
 *         extraDescription:
 *           type: string
 *           description: Descripcion completa del producto
 *         shortDescriptionTags:
 *           type: string
 *           description: Etiquetas y texto para generar la descripcion corta del producto
 *       required:
 *         - tipoProducto
 *         - partnumber
 *         - marca
 *         - modelo
 *         - familia
 *         - extraDescription
 *         - shortDescriptionTags
 *       example:
 *         "_id": "61b3bcd17c47da0f302839e3"
 *         "tipoProducto": "Notebook"
 *         "partnumber": "1ZR94LT"
 *         "familia": "PROBOOK 450"
 *         "marca": "HP"
 *         "modelo": "PROBOOK 450 G5"
 *         "detalle": {"CPU": "Intel Core i5-8250U @ 1.60GHz - 3.40Ghz","RAM": "8 GB DDR4 (2400 MHz)","Almacenamiento": "HDD 1 TB (5400rpm) 2.5\" SATA"}
 *         "shortDescription": "HP PROBOOK 450 G5 Intel Core i5-8250U @ 1.60GHz - 3.40Ghz"
 *         "extraDescription": "Notebook HP PROBOOK 450 G5. CPU: Intel Core i5-8250U @ 1.60GHz - 3.40Ghz, RAM: 8 GB DDR4 (2400 MHz), Almacenamiento: HDD 1 TB (5400rpm) 2.5\" SATA, Notebook HP PROBOOK 450 G5. CPU: Intel Core i5-8250U @ 1.60GHz - 3.40Ghz, RAM: 8 GB DDR4 (2400 MHz), Almacenamiento: HDD 1 TB (5400rpm) 2.5\" SATA, 4 Core + HT, Smart Cache 8MB, Wi-Fi 5 (802.11 b/g/n/ac), Tarjeta Red 10-100-1000 Mbps, Pantalla Led 15,6\" Antiglare, Tarjeta de Video Integrada UHD Graphics 620, Webcam, Bluetooth 4.2, FingerPrint, Bateria Li-Ion 3 Celdas, Windows 10 Pro x64, Interfaces (HDMI, RJ45, USB 3.0 * 3, USB-C, SD Card, Jack 3.5mm, VGA, sATA, M.2), AC Adapter 45W"
 *         "shortDescriptionTags": "{marca}{modelo}{detalle.CPU}"
 *
 *
 */
/**
 * @swagger
 *  tags:
 *   name: Productos
 *   description: Endpoint para operaciones con productos
 */

// Create
/**
 * @swagger
 * /producto:
 *   post:
 *     summary: Lista de todos los productos
 *     tags: [Productos]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Producto'
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: mensaje de confirmacion de operacion
 */
router.post("/producto/", createProducto);
router.post("/producto/bulk", createBulkProducto);

//Read
//Get by Partnumber
/**
 * @swagger
 * /product/partnumber/{pn}:
 *   get:
 *     summary: Producto coincidente con partnumber
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: pn
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto coincidente con el partnumber indicado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 */
router.get("/producto/partnumber/:pn", getProductPN);
//Get list of Family Types
/**
 * @swagger
 * /producto/{productType}/familyList:
 *   get:
 *     summary: Lista de subcategorias pertenecientes a la categoria indicada
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: productType
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de subcategorias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
router.get("/producto/:productType/familyList", getFamilyList);
//By id
/**
 * @swagger
 * /product/{productType}/{id}:
 *   get:
 *     summary: Producto coincidente con id
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: productType
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto coincidente con el id indicado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 */
router.get("/producto/:productType/:id", getProductoById);
// By Query
/**
 * @swagger
 * /producto/{productType}:
 *   get:
 *     summary: Lista de productos por categoria
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: productType
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de productos por categoria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Producto'
 */
router.get("/producto/:productType", getProductoByQuery);
//All Products
/**
 * @swagger
 * /producto:
 *   get:
 *     summary: Lista de productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Producto'
 */
router.get("/producto", getAllProducts);

//Update
/**
 * @swagger
 * /producto/{productType}/{id}:
 *   put:
 *     summary: Actualizacion de producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: productType
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Producto'
 *     responses:
 *       200:
 *         content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/UpdateResult'
 */
router.put("/producto/:productType/:id", updateProducto);

//Delete
/**
 * @swagger
 * /producto/{productType}/{id}:
 *   delete:
 *     summary: Eliminacion de producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: productType
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Eliminacion de producto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Estado de la operacion
 *                 message:
 *                   type: string
 *                   description: Mensaje de confirmacion de la operación
 */
router.delete("/producto/:productType/:id", deleteProducto);

export default router;
// module.exports = router;
