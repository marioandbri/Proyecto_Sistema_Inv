
const express = require ('express');
const router = express.Router()
// const fs = require('fs');
// const path = require('path');
// const example_ot = require('../ot.json');
// const { urlencoded } = require('express');

// const OTModel = require('../model/ot');
// const OTs = OTModel
import { createOt, deleteOt, getOtById, getOtByQuery, updateOt } from '../controllers/ot.controller.js';


//Read
//By ID
router.get('/ot/:id', getOtById);
//By Query
router.get('/ot', getOtByQuery);

//Create
router.post('/ot', createOt);

//Update
router.put('/ot/:id', updateOt);

//Delete
router.delete('/ot/:id', deleteOt);

module.exports = router;
// export default router;
