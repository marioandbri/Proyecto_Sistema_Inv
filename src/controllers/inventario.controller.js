import Inventario from "../model/inventario";
import Productos from "../model/productos";
import Cliente from "../model/cliente";

export async function createInventario(req, res) {
  const body = req.body;
  await Inventario.bulkCreate(body, { validate: true })
    .then((data) =>
      res.json({ message: "Producto Ingresado correctamente", data })
    )
    .catch((e) =>
      res.status(400).json({ message: "Ha ocurrido un error", data: e })
    );
}
export async function getInventarioByQuery(req, res) {
  const getInventario = Inventario.findAll({}).then((data) => data);
  const getProductos = Productos.find({})
    .exec()
    .then((data) => data);
  const getClientes = Cliente.findAll({}).then((data) => data);
  const results = await Promise.all([getInventario, getProductos, getClientes]);
  let [inventario, productos, clientes] = results;
  inventario.forEach((inventario) => {
    const busquedaProd = productos.filter((producto) => {
      return producto.partnumber == inventario.productPN;
    });
    // inventario.productPN = `${inventario.productPN} - ${busquedaProd[0]?.DescriptionL}`;

    Object.assign(inventario.dataValues, {
      descripcion: busquedaProd[0]?.DescriptionL,
    });
  });
  inventario.forEach((inventario) => {
    const busquedaProv = clientes.filter((cliente) => {
      return cliente.rut == inventario.rutProveedor;
    });

    // console.log(busquedaProv);
    // inventario.rutProveedor = `${inventario.rutProveedor} - ${busquedaProv[0]?.razonsocial}`;

    Object.assign(inventario.dataValues, {
      proveedor: busquedaProv[0]?.razonsocial,
    });
  });
  inventario.forEach((inventario) => {
    const busquedaPose = clientes.filter((cliente) => {
      return cliente.rut == inventario.rutPoseedor;
    });

    // console.log(busquedaPose);
    // inventario.rutPoseedor = `${inventario.rutPoseedor} - ${busquedaPose[0]?.razonsocial}`;

    Object.assign(inventario.dataValues, {
      poseedor: busquedaPose[0]?.razonsocial,
    });
  });
  console.log();
  res.json(inventario);
}
export async function getInventarioBySerialNumber(req, res) {
  const serialnumber = req.params.sn;
  const result = await Inventario.findByPk(serialnumber);
  // console.log(result instanceof Inventario);
  res.json(result instanceof Inventario);
}
export async function updateInventario(req, res) {}
export async function deleteInventario(req, res) {}
