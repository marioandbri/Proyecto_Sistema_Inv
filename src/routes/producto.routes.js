import { Router } from 'express';
import { createProducto, deleteProducto, getProductoById, getProductoByQuery, updateProducto } from '../controllers/producto.controller';
const router = Router();
// const fs = require('fs');
// const path = require('path');
router.get('/productos', (req, res) => {
   res.redirect('/')
})
// Create
router.post('/producto/option', createProducto);

//Read
//By id
router.get('/producto/option/:id', getProductoById);
// By Query
router.get('/producto/option', getProductoByQuery);

//Update
router.put('/producto/option/:id', updateProducto);

//Delete
router.delete('/producto/option/:id', deleteProducto);


module.exports = router;
