import Inventario from "../model/inventario copy";
import mongoose from "mongoose";

export async function getInventarios(req, res) {
	const inventario = await Inventario.find({})
		.populate("producto")
		.populate("poseedor", "razon_social")
		.populate("proveedor", "razon_social");
	res.json(inventario);
}

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
	Inventario.insertMany(data, (err, docs) => {
		if (err) {
			console.error(err);
			return handleError({
				message: "Ha ocurrido un error al intentar ingresar el registro",
				detail: err.message,
			});
		}
		res.json(docs);
	});
	return;
}

export async function updateInventario(req, res) {
	const updateData = req.body;
	const numeroSerie = req.params.sn;
	await Inventario.updateOne(
		{ numeroSerie: numeroSerie },
		updateData,
		(err, doc) => {
			if (err)
				return res
					.status(400)
					.json({ message: "Ha ocurrido un error", detail: err.message });
			return res.json(doc);
		}
	);
	return;
}

export async function deleteInventario(req, res) {
	const numeroSerie = req.params.sn;
	await Inventario.findOneAndRemove(
		{ numeroSerie: numeroSerie },
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
	const { fechaEvento, rutPoseedor, estado } = items[0];

	const result = await Inventario.updateMany(
		{ numeroSerie: { $in: [...serialnumbers] } },
		{ fechaEvento: fechaEvento, rutPoseedor: rutPoseedor, estado: estado }
	);
	res.json(result);
}

//to-do getInventarioBySerialNumber
