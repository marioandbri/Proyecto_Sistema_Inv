const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const example_ot = require('../ot.json');

const OTModel = require('../model/ot');

//Read
router.get('/ot', async (req, res) => {
   const query = req.query
   const OTs = await OTModel.find(query);
   console.log(OTs);
   res.json(OTs);
   
});
//Create
router.post('/ot', async (req, res) => {
   const data_in = req.body;
   const data_ot = new OTModel(data_in);
   await data_ot.save();
   console.log(data_in);
   res.json('data recieved');
});

//Update
router.put('/ot', async (req, res) => {
   const query = req.query
   const OTs = await OTModel.findOneAndUpdate(query, );
   console.log(OTs);
   res.json(OTs);
   
});

module.exports = router;
