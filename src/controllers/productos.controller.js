import Productos from "../model/productos";

export async function getProductoById(req, res) {
  const id = req.params.id;
  const productType = req.params.productType;
  const result = await Productos.findById(id);
  console.log(result);
  res.json(result);
}

export async function getAllProducts(req, res) {
  const result = await Productos.find({});
  res.json({
    result: result.map((item) => ({
      item,
      description: item.DescriptionL,
      descriptionS: item.DescriptionS,
    })),
    headers: result[0] ? result[0].headersOf() : ["Not Found"],
  });
}
export async function getProductPN(req, res) {
  const result = await Productos.findOne({ partnumber: req.params.pn });
  console.log(result);
  res.json({
    item: result,
    description: result?.DescriptionL,
    descriptionS: result?.DescriptionS,
    headers: result?.headersOf() || ["Not Found"],
  });
}

export async function getProductoByQuery(req, res) {
  const query = req.query;
  const result = await Productos.find({ tipoProducto: req.params.productType });
  // console.log(result[0].descriptionOf());
  // JSON.stringify(result) == '[]' ? res.json([]) :
  res.json({
    result: result.map((item) => ({
      item,
      description: item.DescriptionL,
      descriptionS: item.DescriptionS,
    })),
    headers: result[0] ? result[0].headersOf() : ["Not Found"],
  });
  // res.json({
  //    result: result,
  //    headers: result[0] ? result[0].headersOf() : ['Not Found'],
  //    description: Boolean(result) ? result.map(e => e.descriptionOf()) : ['Not Found']
  // })
}

export async function createProducto(req, res) {
  const data_in = req.body;
  const data_ot = new Productos(data_in);
  await data_ot.save().then(
    () => res.json({ mensaje: "Producto creado exitosamente" }),
    (error) => {
      res
        .status(400)
        .json(
          error.code == 11000
            ? { mensaje: "PartNumber ya existe", reason: error.keyValue }
            : error
        );
    }
  );
  console.log(data_in);
}

export async function updateProducto(req, res) {
  const id = req.params.id;
  console.log(id);
  console.log(req.body);
  const result = await Productos.updateOne({ _id: id }, req.body);
  console.log(result);
  res.json(result);
}

export async function deleteProducto(req, res) {
  const id = req.params.id;
  await Productos.deleteOne({ _id: id });
  res.json({ status: "OK", message: `Document [${id}] deleted` });
}
