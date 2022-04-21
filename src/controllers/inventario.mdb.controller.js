import Inventario from "../model/inventario";

/**
 * @typedef {import("../types").ExpressRouterRequest} RouteRequest
 * @typedef {import("../types").ExpressRouterFunction} RouterFunction
 * @typedef {import("../types").InventarioModel} Inventario
 */

/**
 * @type {RouterFunction}
 * @param {RouteRequest} req
 * @param {*} res
 */
export async function getInventarios(req, res) {
	/**
	 * @type {Inventario[]}
	 */
	const inventario = await Inventario.find({})
		.populate("producto")
		.populate("poseedor", "razon_social")
		.populate("proveedor", "razon_social");
	res.json(inventario);
}

/**
 * @type {RouterFunction}
 * @param {RouteRequest} req
 * @param {*} res
 */
export async function createInventario(req, res) {
	const data = req.body;
	if (data.length < 1) {
		res.status(400).json({
			message:
				"👀 No se ha ingresado ningún producto, revise los campos antes de enviarlos",
		});
		return;
	}
	let validation = await Inventario.find({});
	validation = validation.map((e) => e.numeroSerie);

	const result = validation
		.map((e) => data.map((e) => e.numeroSerie).includes(e))
		.some((e) => e === true);
	if (result) {
		return res.status(400).json({
			message:
				"No se ingreso ningún registro debido ha que algunos ya existen en el sistema",
		});
	}

	const handleError = (err) => {
		return res.status(400).json(err);
	};
	Inventario.insertMany(data, {}, (err, docs) => {
		if (err) {
			console.error(err);
			return handleError({
				message: "Ha ocurrido un error al intentar ingresar el registro",
				detail: err.message,
			});
		}
		res.json({ message: "Productos ingresados correctamente", data: docs });
	});
	return;
}

/**
 * @type {RouterFunction}
 * @param {RouteRequest} req
 * @param {*} res
 */
export async function updateInventario(req, res) {
	const updateData = req.body;
	/**
	 * @type {Pick<Inventario, "numeroSerie">}
	 */
	const numeroSerie = req.params.sn;
	await Inventario.updateOne(
		{ numeroSerie: numeroSerie },
		updateData,
		{},
		(err, doc) => {
			if (err)
				return res
					.status(400)
					.json({ message: "Ha ocurrido un error", detail: err.message });
			return res.json({ messa: "Actualizado correctamente", data: doc });
		}
	);
	return;
}

/**
 * @type {RouterFunction}
 * @param {RouteRequest} req
 * @param {*} res
 */
export async function deleteInventario(req, res) {
	const numeroSerie = req.params.sn;
	await Inventario.findOneAndRemove(
		{ numeroSerie: numeroSerie },
		{},
		(err, doc) => {
			if (err)
				return res
					.status(400)
					.json({ message: "Ha ocurrido un error", detail: err.message });
			return res.json({
				message: `Numero de serie: ${numeroSerie} borrado correctamente`,
			});
		}
	);
}

/**
 * @type {RouterFunction}
 * @param {RouteRequest} req
 * @param {*} res
 */
export async function updateInventarioMovimientos(req, res) {
	const items = req.body;
	if (items.length < 1) {
		res.status(400).json({
			message:
				"👀 No se ha ingresado ningún producto, revise los campos antes de enviarlos",
		});
		return;
	}
	const serialnumbers = items.map((e) => e.numeroSerie);
	const { fechaEvento, rutPoseedor, estado, nroGuia } = items[0];
	// console.log(items.every((e) => e.esVenta === true));
	if (items.every((e) => e.esVenta === true)) {
		const result = await Inventario.updateMany(
			{ numeroSerie: { $in: [...serialnumbers] } },
			{
				fechaEvento: fechaEvento,
				rutPoseedor: rutPoseedor,
				estado: "Vendido",
				nroGuia: nroGuia,
			}
		);
		res.json({
			message: "Registros actualizados correctamente",
			data: result.nModified,
		});
		return;
	}
	// const result = await Inventario.updateMany(
	// 	{ numeroSerie: { $in: [...serialnumbers] } },
	// 	{
	// 		fechaEvento: fechaEvento,
	// 		rutPoseedor: rutPoseedor,
	// 		estado: estado,
	// 		nroGuia: nroGuia,
	// 	}
	// );
	let bulkWrite = [];
	items.forEach((e) => {
		bulkWrite.push({
			updateOne: { filter: { numeroSerie: e.numeroSerie }, update: { ...e } },
		});
	});
	const result = await Inventario.bulkWrite(bulkWrite);
	console.log(result);
	res.json({
		message: "Registros actualizados correctamente",
		data: result.nModified,
	});
}

/**
 * @type {RouterFunction}
 * @param {RouteRequest} req
 * @param {*} res
 */
export async function getInventarioBySerialNumber(req, res) {
	const inventario = await Inventario.findOne({
		numeroSerie: req.params.sn,
	})
		.populate("poseedor", "razon_social")
		.populate("producto", "modelo");
	res.json(inventario);
}
