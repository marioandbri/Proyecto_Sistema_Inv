import producto from "../model/producto";


export async function getProductoById(req, res) {
   const result = await producto.findById(req.params.id);
   console.log(result);
   res.json(result);
};

export async function getProductoByQuery(req, res) {
   const query = req.query
   const result = await producto.find(query);
   console.log(result);
   res.json(result);
};

export async function createProducto(req, res) {
   const data_in = req.body;
   const data_ot = new producto(data_in);
   await data_ot.save();
   console.log(data_in);
   res.json('data recieved');
};

export async function updateProducto(req, res) {
   const id = req.params.id;
   console.log(id);
   console.log(req.body);
   const result = await producto.updateOne({ _id: id }, req.body);
   console.log(result);
   res.json(result);
};

export async function deleteProducto(req, res) {
   const id = req.params.id;
   await producto.deleteOne({ _id: id });
   res.json({ status: "OK", message: `Document [${id}] deleted` });
};