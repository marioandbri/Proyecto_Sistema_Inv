import computadores from "../model/computador";


export async function getProductoById(req, res) {
   const result = await computadores.findById(req.params.id);
   console.log(result);
   res.json(result);
};

export async function getProductoByQuery(req, res) {
   const query = req.query
   const result = await computadores.find(query);
   console.log(result);
   let computador = new computadores
   // res.json({ data: result, description: result.map(e => e.detProducto.map(e => e.descriptionOf())) });

   JSON.stringify(result) == '[]' ? res.json([]) : res.json({
      result:
         result.map(e => ({ item: e, description: e.descriptionOf() })),
      headers:
         computador.headersOf()
   })
}

export async function createProducto(req, res) {
   const data_in = req.body;
   const data_ot = new computadores(data_in);
   try {

      await data_ot.save()
      res.json('data recieved')

   } catch (error) {
      res.json(error)
   }
   // console.log(data_in);
   // console.log(data_ot.map(e => e.descriptionOf()))

};

export async function updateProducto(req, res) {
   const id = req.params.id;
   console.log(id);
   console.log(req.body);
   const result = await computadores.updateOne({ _id: id }, req.body);
   console.log(result);
   res.json(result);
};

export async function deleteProducto(req, res) {
   const id = req.params.id;
   await computadores.deleteOne({ _id: id });
   res.json({ status: "OK", message: `Document [${id}] deleted` });
};