import { Router } from 'express';
import { createProducto, deleteProducto, getProductoById, getProductoByQuery, updateProducto } from '../controllers/monitor.controller';
const router = Router();
// const fs = require('fs');
// const path = require('path');

//Create
router.post('/producto/monitores', createProducto);

//Read
//By id
router.get('/producto/monitores/:id', getProductoById);
// By Query
router.get('/producto/monitores', getProductoByQuery);

//Update
router.put('/producto/monitores/:id', updateProducto);

//Delete
router.delete('/producto/monitores/:id', deleteProducto);


module.exports = router;