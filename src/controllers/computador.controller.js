import computadores from "../model/computador";


export async function getProductoById(req, res) {
   const result = await computadores.findById(req.params.id);
   //console.log(result);
   res.json(result);
}
export async function getProductoByPartNumber(req, res) {
   const result = await computadores.findOne({ partNumber: req.params.partnumber });
   //console.log(result);
   res.json(result);
}


export async function getProductoByQuery(req, res) {
   const query = req.query
   const result = await computadores.find(query)
   // //console.log(result.map(e => { Object.defineProperty(e, 'descripcion', { value: "", writable: true }); e.descripcion = e.descriptionOf(); return e }));
   let computador = new computadores
   // res.json({ data: result, description: result.map(e => e.detProducto.map(e => e.descriptionOf())) });

   JSON.stringify(result) == '[]' ? res.json([]) : res.json({
      result: result.map(item => ({ item, description: item.descriptionOf() })),
      headers:
         computador.headersOf()
   })
}

export async function createProducto(req, res) {
   const data_in = req.body;
   const data_ot = new computadores(data_in);
   await data_ot.save().then(() => res.json({ "mensaje": "Producto creado exitosamente" }), (error) => { res.status(400).json(error.code == 11000 ? { "mensaje": "PartNumber ya existe", "reason": error.keyValue } : error) })


}

export async function updateProducto(req, res) {
   const id = req.params.id;
   //console.log(id);
   //console.log(req.body);
   const result = await computadores.updateOne({ _id: id }, req.body);
   //console.log(result);
   res.json(result);
}

export async function deleteProducto(req, res) {
   const id = req.params.id;
   await computadores.deleteOne({ _id: id });
   res.json({ status: "OK", message: `Document [${id}] deleted` });
}