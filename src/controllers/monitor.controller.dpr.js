import Monitores from '../model/monitor';

export async function getProductoById(req, res) {
   const result = await Monitores.findById(req.params.id);
   //console.log(result);
   res.json(result);
}

export async function getProductoByQuery(req, res) {
   const query = req.query
   const result = await Monitores.find(query);
   let monitor = new Monitores
   // res.json({ data: result, description: result.map(e => e.detProducto.map(e => e.descriptionOf())) });
   res.json({
      result:
         result.map(e => ({ item: e, description: e.descriptionOf() })),
      headers:
         monitor.headersOf()
   })
}

export async function createProducto(req, res) {
   const data_in = req.body;
   const data_ot = new Monitores(data_in);
   await data_ot.save();
   //console.log(data_in);
   // //console.log(data_ot.map(e => e.descriptionOf()))
   res.json('data recieved');
}

export async function updateProducto(req, res) {
   const id = req.params.id;
   //console.log(id);
   //console.log(req.body);
   const result = await Monitores.updateOne({ _id: id }, req.body);
   //console.log(result);
   res.json(result);
}

export async function deleteProducto(req, res) {
   const id = req.params.id;
   await Monitores.deleteOne({ _id: id });
   res.json({ status: "OK", message: `Document [${id}] deleted` });
}