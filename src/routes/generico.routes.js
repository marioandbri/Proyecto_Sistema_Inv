import { Router } from 'express';
import { createProducto, deleteProducto, getProductoById, getProductoByQuery, updateProducto } from '../controllers/generico.controller';
const router = Router();


// Create
router.post('/producto/generic/', createProducto);

//Read
//By id
router.get('/producto/generic/:productType/:id', getProductoById);
// By Query
router.get('/producto/generic/:productType', getProductoByQuery);

//Update
router.put('/producto/generic/:productType/:id', updateProducto);

//Delete
router.delete('/producto/generic/:productType/:id', deleteProducto);


module.exports = router;
