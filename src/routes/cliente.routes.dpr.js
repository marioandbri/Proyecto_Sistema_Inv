import { Router } from 'express';
const router = Router();
// const fs = require('fs');
// const path = require('path');
import {createCliente, getClienteByRut, getClienteByQuery, updateCliente, deleteCliente} from '../controllers/cliente.controller';

//Create
router.post('/cliente', createCliente);

//Read
//By rut
router.get('/cliente/:rut', getClienteByRut);
// By Query
router.get('/cliente', getClienteByQuery);

//Update
router.put('/cliente/:rut', updateCliente);

//Delete
router.delete('/cliente/:rut', deleteCliente);


module.exports = router;
