import { Router } from "express";
import {
	deleteUser,
	loginUser,
	registerAdmin,
	registerUser,
	updatePassword,
	updateUser,
	userData,
	userLogout,
	usersList,
} from "../controllers/uac.controller";
const router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - username
 *       properties:
 *         _id:
 *           type: string
 *           description: Identificador unico autogenerado
 *         username:
 *           type: string
 *           description: Nombre de usuario
 *         email:
 *           type: string
 *           description: Correo electronico del usuario
 *         hash:
 *           type: string
 *           description: Combinacion de caracteres para encriptar las credenciales de acceso
 *         salt:
 *           type: string
 *           description: Frase de ofuscamiento
 *         isAdmin:
 *           type: string
 *           description: Estado de usuario administrador
 *         accessEmpresas:
 *           type: array
 *           description: Conjunto de permisos en modulo empresa
 *           items:
 *             type: boolean
 *             minItems: 4
 *             maxItems: 4
 *         accessProductos:
 *           type: array
 *           description: Conjunto de permisos en modulo producto
 *           items:
 *             type: boolean
 *             minItems: 4
 *             maxItems: 4
 *         accessInventario:
 *           type: array
 *           description: Conjunto de permisos en modulo inventario
 *           items:
 *             type: boolean
 *             minItems: 4
 *             maxItems: 4
 *       example:
 *         "_id": "61dcaa3c4d69e027f3e241af"
 *         "username": "administrador"
 *         "email": "administrador@asdasd.cl"
 *         "hash": "12345642c13ef3b70fe22cd2be72abd05fac3cf4b1c3f36c49f87c8abb518de7360dac799a5c13762291552b3a49edc863815a733a034271ee998257e3005e"
 *         "salt": "6543216e40e1ec7cffea20c6999750c080d811c0e825717da86b1e2a22c6fb5c"
 *         "isAdmin": true
 *         "accessEmpresas": [false, false, false, false]
 *         "accessProductos": [false, false, false, false]
 *         "accessInventarios": [false, false, false, false]
 *     RegistroUsuario:
 *       allOf:
 *         - $ref: '#/components/schemas/Usuario'
 *         - type: object
 *           properties:
 *             adminKey:
 *               type: boolean
 *               description: Llave para usuario Administrador
 *             password:
 *               type: string
 *               description: Contraseña de usuario
 *           required:
 *             - password
 *     ResponseMessage:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: Estado de la operación
 *         message:
 *           type: string
 *           description: Mensaje de confirmación
 */
/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Endpoint para operaciones con usuarios
 */

/**
 * @swagger
 * /uac/registro/admin:
 *   post:
 *     summary: Registro de usuario Administrador
 *     tags: [Usuarios]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegistroUsuario'
 *     responses:
 *       200:
 *         description: Mensaje resultado de operación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseMessage'
 */
router.post("/uac/registro/admin", registerAdmin);

/**
 * @swagger
 * /uac/registro:
 *   post:
 *     summary: Registro de usuario común
 *     tags: [Usuarios]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegistroUsuario'
 *     responses:
 *       200:
 *         description: Mensaje resultado de operación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseMessage'
 */
router.post("/uac/registro", registerUser);

/**
 * @swagger
 * /uac/login:
 *   post:
 *     summary: Acceso de usuarios
 *     tags: [Usuarios]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegistroUsuario'
 *     responses:
 *       200:
 *         description: Mensaje resultado de operación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schema/ResponseMessage'
 */
router.post("/uac/login", loginUser);

/**
 * @swagger
 * /uac/user:
 *   get:
 *     summary: Datos y permisos del usuario
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Datos y persmisos del usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 */
router.get("/uac/user", userData);

/**
 * @swagger
 * /uac/logout:
 *   get:
 *     summary: Cerrar sesión de usuario previamente identificado
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Cierre de sesion del usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseMessage'
 */
router.get("/uac/logout", userLogout);

/**
 * @swagger
 * /uac/mgmt:
 *   get:
 *     summary: Lista de usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 */
router.get("/uac/mgmt", usersList);

/**
 * @swagger
 * /uac/mgmt/{id}:
 *   put:
 *     summary: Actualizacion de usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador unico del usuario a modificar
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseMessage'
 *
 */
router.put("/uac/mgmt/:id", updateUser);

router.delete("/uac/mgmt/:id", deleteUser);
router.put("/uac/mgmt/pass/:id", updatePassword);

export default router;
// module.exports = router
