const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const example_ot = require('../ot.json');

// const OTModel = require('../model/ot');
const OTs = require('../model/ot');
const { urlencoded } = require('express');
// const OTs = OTModel

//Read
//By ID
router.get('/ot/:_id', async (req, res) => {
   const result = await OTs.findById(req.params._id);
   console.log(result);
   res.json(result);

});
//By Query
router.get('/ot', async (req, res) => {
   const query = req.query
   const result = await OTs.find(query);
   console.log(result);
   res.json(result);
   
});
//Create
router.post('/ot', async (req, res) => {
   const data_in = req.body;
   const data_ot = new OTs(data_in);
   await data_ot.save();
   console.log(data_in);
   res.json('data recieved');
});

//Update
router.put('/ot/:_id', async (req, res) => {
   const id = req.params._id;
   console.log(id);
   console.log(req.body);
   const result = await OTs.findByIdAndUpdate(id, req.body);
   console.log(result);
   res.json(result);
   
});

//Delete
router.delete('/ot/:_id', async (req, res) => {
   const id = req.params._id;
   await OTs.findByIdAndDelete(id);
   res.json({status: "OK", message: `Document [${id}] deleted`});
});

module.exports = router;
