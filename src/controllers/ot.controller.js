const OTs = require('../model/ot');


export async function getOtById(req, res){
   const result = await OTs.findById(req.params.id);
   //console.log(result);
   res.json(result);
}

export async function getOtByQuery(req, res){
   const query = req.query
   const result = await OTs.find(query);
   //console.log(result);
   res.json(result);
}

export async function createOt(req, res){
   const data_in = req.body;
   const data_ot = new OTs(data_in);
   await data_ot.save();
   //console.log(data_in);
   res.json('data recieved');
}

export async function updateOt(req, res){
   const id = req.params.id;
   //console.log(id);
   //console.log(req.body);
   const result = await OTs.updateOne({_id: id} , req.body);
   //console.log(result);
   res.json(result);
}

export async function deleteOt(req, res){
   const id = req.params.id;
   await OTs.deleteOne({_id: id});
   res.json({status: "OK", message: `Document [${id}] deleted`});
}