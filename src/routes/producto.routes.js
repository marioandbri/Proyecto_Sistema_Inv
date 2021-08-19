import { Router } from 'express';
import { createProducto, deleteProducto, getProductoById, getProductoByQuery, updateProducto } from '../controllers/producto.controller';
const router = Router();
// const fs = require('fs');
// const path = require('path');
router.get('/productos', (req, res) => {
   res.redirect('/')
})
//Create
// router.post('/producto', createProducto);

// //Read
// //By id
// router.get('/producto/:id', getProductoById);
// // By Query
// router.get('/producto', getProductoByQuery);

// //Update
// router.put('/producto/:id', updateProducto);

// //Delete
// router.delete('/producto/:id', deleteProducto);


module.exports = router;
