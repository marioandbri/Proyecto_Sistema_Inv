import Movimientos from "../model/movimientos";

/**
 * @typedef {import("../types").ExpressRouterRequest} RouteRequest
 * @typedef {import("../types").ExpressRouterFunction} RouterFunction
 * @typedef {import("../types").MovimientoModel} Movimiento
 */

/**
 * @type {RouterFunction}
 * @param {RouteRequest} req
 * @param {*} res
 */
export async function iniciarMovimiento(req, res) {
	/**
	 * @type {Movimiento}
	 */
	const movimiento = req.body;
	await Movimientos.create(movimiento, (err, doc) => {
		if (err) {
			return res.status(400).json(err);
		}
		return res.json(doc);
	});
	return;
}

/**
 * @type {RouterFunction}
 * @param {RouteRequest} req
 * @param {*} res
 */
export async function getMovimientos(req, res) {
	/**
	 * @type {Movimiento[]}
	 */
	const result = await Movimientos.find({}, (doc, err) => {
		if (err) return err;
		return doc;
	})
		.populate([
			{
				path: "pedido.detalle",
				model: "Inventario",
				select: "estado",
			},
		])
		.populate("cliente", "razon_social")
		.populate("pedido.equipo", "shortDescription detalle");

	res.json(result);
}

/**
 * @type {RouterFunction}
 * @param {RouteRequest} req
 * @param {*} res
 */
export async function getHistory(req, res) {
	const serialNumber = req.params?.serialNumber;
	const result = await Movimientos.find({
		"pedido.numeroSerie": serialNumber,
	});
	res.json(result);
}

/**
 * @type {RouterFunction}
 * @param {RouteRequest} req
 * @param {*} res
 */
export async function getMovimientoByID(req, res) {
	const { id } = null ?? req.params;
	const result = await Movimientos.findById(id)
		.populate([
			{
				path: "pedido.detalle",
				model: "Inventario",
				select: "estado",
			},
		])
		.populate("cliente", "razon_social")
		.populate("pedido.equipo", "shortDescription detalle");

	res.json(result);
}
