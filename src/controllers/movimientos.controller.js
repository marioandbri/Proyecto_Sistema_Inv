import Movimientos from "../model/movimientos";

export async function iniciarMovimiento(req, res) {
	const movimiento = req.body;
	await Movimientos.create(movimiento, (err, doc) => {
		if (err) {
			return res.status(400).json(err);
		}
		return res.json(doc);
	});
	return;
}

export async function getMovimientos(req, res) {
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

export async function getHistory(req, res) {
	const serialNumber = req.params?.serialNumber;
	const result = await Movimientos.find({
		"pedido.numeroSerie": serialNumber,
	});
	res.json(result);
}

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
