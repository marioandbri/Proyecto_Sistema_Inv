import Inventario from "../model/inventario copy";
import Producto from "../model/productos";
import Empresa from "../model/empresa";

export async function getInventarios(req, res) {
	const inventario = await Inventario.find({})
		.populate("producto")
		.populate("poseedor");
	res.json(inventario);
}

export async function createInventario(req, res) {
	const data = req.body;
	const { producto, empresa } = data;
	const handleError = (err) => {
		return res.status(400).json(err);
	};
	const inventario = new Inventario({
		...data,
	});
	inventario.save((err) => {
		if (err) {
			return handleError({
				message: "No se pudo crear el registro en el inventario",
				detail: err,
			});
		}
		return res.json({
			message: "Registro ingresado correctamente",
			detail: inventario,
		});
	});
}

// export async function getInventarios(req, res) {}

// export async function getInventarios(req, res) {}

// export async function getInventarios(req, res) {}
