import Inventario from "../model/inventario";
import Productos from "../model/productos";
import Cliente from "../model/cliente";
import { sequelize } from "../sequelize";

export async function createInventario(req, res) {
  const body = req.body;
  console.log(body);
  if (body.length < 1) {
    res.status(400).json({
      message:
        "👀 No se ha ingresado ningún producto, revise los campos antes de enviarlos",
    });
    return;
  }
  await Inventario.bulkCreate(body, { validate: true })
    .then((data) =>
      res.json({ message: "Producto Ingresado correctamente", data })
    )
    .catch((e) => {
      return res
        .status(400)
        .json({ message: "Ha ocurrido un error:", error: e.errors });
    });
}

export async function getInventarioByQuery(req, res) {
  //Creating Promises
  const getInventario = Inventario.findAll({}).then((data) => data);
  const getProductos = Productos.find({})
    .exec()
    .then((data) => data);
  const getClientes = Cliente.findAll({}).then((data) => data);
  //////////////////////////////////
  //Executing Promises in Parallel
  const results = await Promise.all([getInventario, getProductos, getClientes]);
  //////////////////////////////////
  //Desctructuring promises results
  let [inventario, productos, clientes] = results;
  //////////////////////////////////
  //Creating map structure for clients data
  const mapClientes = new Map();
  clientes.forEach((e) => {
    mapClientes.set(e.dataValues.rut, e.dataValues.razonsocial);
  });
  //////////////////////////////////
  //Adding relational info for clients RUT -> clients razonsocial
  inventario.forEach((inventario) => {
    Object.assign(inventario.dataValues, {
      proveedor: mapClientes.get(inventario.rutProveedor),
    });
  });
  inventario.forEach((inventario) => {
    Object.assign(inventario.dataValues, {
      poseedor: mapClientes.get(inventario.rutPoseedor),
    });
  });
  ///////////////////////////////////
  //Creating map structure for products data
  const mapProducts = new Map();
  productos.forEach((e) => {
    mapProducts.set(e.toObject().partnumber, e.toObject().DescriptionL);
  });
  //////////////////////////////////
  //Adding relational info for product partnumber -> product Description
  inventario.forEach((inventario) => {
    Object.assign(inventario.dataValues, {
      descripcion: mapProducts.get(inventario.productPN),
    });
  });
  //////////////////////////////////
  //Sending the results response
  res.json(inventario);
}

export async function getInventarioBySerialNumber(req, res) {
  const serialnumber = req.params.sn;
  const result = await Inventario.findByPk(serialnumber);
  // console.log(result instanceof Inventario);
  console.log(result);
  res.json(result);
}
export async function updateInventario(req, res) {
  const updateItem = req.body;
  const numeroSerie = req.params.sn;
  const result = Inventario.update(updateItem, {
    where: { numeroSerie: numeroSerie },
  })
    .then((data) =>
      res.json({ message: "actualizado correctamente", data: data })
    )
    .catch((e) => console.log(e));
}
export async function deleteInventario(req, res) {
  const serialNumber = req.params.sn;
  const result = await Inventario.destroy({
    where: {
      numeroSerie: serialNumber,
    },
  })
    .then(() =>
      res.json({
        message: `Numero de serie: ${serialNumber} borrado correctamente`,
      })
    )
    .catch((e) =>
      res.status(400).json({ message: "Ha ocurrido un error", data: e })
    );
}

export async function updateInventarioMovimientos(req, res) {
  const t = await sequelize.transaction();
  const items = req.body;
  if (items.length < 1) {
    res.status(400).json({
      message:
        "👀 No se ha ingresado ningún producto, revise los campos antes de enviarlos",
    });
    return;
  }
  let resultData = [];
  try {
    for (const { fechaEvento, rutPoseedor, numeroSerie } of items) {
      await Inventario.update(
        { fechaEvento: fechaEvento, rutPoseedor: rutPoseedor },
        { where: { numeroSerie: numeroSerie }, transaction: t }
      )
        .then((data) => {
          resultData.push(data);
        })
        .catch((e) => {
          throw new Error(e);
        });
    }

    await t.commit();
    res.json({
      message: "Registros actualizados correctamente",
      data: resultData.length,
    });
  } catch (error) {
    await t.rollback();
    res.status(400).json({ message: "Ha ocurrido un error", data: error });
  }
}
