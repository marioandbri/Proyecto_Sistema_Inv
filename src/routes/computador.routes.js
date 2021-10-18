import { Router } from 'express';
import { createProducto, deleteProducto, getProductoById, getProductoByPartNumber, getProductoByQuery, updateProducto } from '../controllers/computador.controller';
const router = Router();
// const fs = require('fs');
// const path = require('path');

//Create
router.post('/producto/computadores', createProducto);

//Read
//By id
router.get('/producto/computadores/:id', getProductoById);
//By PartNumber
router.get('/producto/computadores/partnumber/:partnumber', getProductoByPartNumber);
// By Query
router.get('/producto/computadores', getProductoByQuery);

//Update
router.put('/producto/computadores/:id', updateProducto);

//Delete
router.delete('/producto/computadores/:id', deleteProducto);


module.exports = router;
