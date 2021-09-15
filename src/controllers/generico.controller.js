import generico from "../model/generico";


export async function getProductoById(req, res) {

   const id = req.params.id
   const productType = req.params.productType
   const result = await generico.findById(id);
   console.log(result);
   res.json(result);
};

export async function getProductoByQuery(req, res) {
   const query = req.query
   const result = await generico.find({ tipoProducto: req.params.productType });
   // console.log(result[0].headersOf());
   res.json({
      result: result,
      headers: result[0] ? result[0].headersOf() : ['Not Found']
   })
}

export async function createProducto(req, res) {
   const data_in = req.body;
   const data_ot = new generico(data_in);
   await data_ot.save().then(() => res.json('data recieved'), (error) => { res.status(400).json(error.code == 11000 ? { "mensaje": "PartNumber ya existe", "reason": error.keyValue } : 'error no definido') })
   console.log(data_in);

};

export async function updateProducto(req, res) {
   const id = req.params.id;
   console.log(id);
   console.log(req.body);
   const result = await generico.updateOne({ _id: id }, req.body);
   console.log(result);
   res.json(result);
};

export async function deleteProducto(req, res) {
   const id = req.params.id;
   await generico.deleteOne({ _id: id });
   res.json({ status: "OK", message: `Document [${id}] deleted` });
};