import { model, Schema } from "mongoose";
import Producto from "./productos";
import Empresa from "./empresa";

const InventarioSchema = new Schema({
	numeroSerie: {
		type: String,
		index: true,
		unique: true,
	},
	producto: {
		type: Schema.Types.String,
		ref: Producto,
	},
	poseedor: {
		type: Schema.Types.String,
		ref: Empresa,
	},
});
InventarioSchema.pre("save", async function () {
	const { _id: empresa } = await Empresa.findOne({ rut: this.poseedor }).exec();
	const { _id: producto } = await Producto.findOne({
		partnumber: this.producto,
	}).exec();
	this.poseedor = empresa;
	this.producto = producto;
	return;
});

export default model("Inventario", InventarioSchema);
