import { Router } from 'express';
import { createProducto, deleteProducto, getProductoById, getProductoByQuery, updateProducto } from '../controllers/impresora.controller';
const router = Router();
// const fs = require('fs');
// const path = require('path');

//Create
router.post('/producto/impresoras', createProducto);

//Read
//By id
router.get('/producto/impresoras/:id', getProductoById);
// By Query
router.get('/producto/impresoras', getProductoByQuery);

//Update
router.put('/producto/impresoras/:id', updateProducto);

//Delete
router.delete('/producto/impresoras/:id', deleteProducto);


module.exports = router;
