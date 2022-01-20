import { model, Schema } from "mongoose";
import Producto from "./productos";
import Empresa from "./empresa";

const InventarioSchema = new Schema({
	numeroSerie: {
		type: String,
		index: true,
		unique: true,
	},
	productPN: {
		type: String,
		required: true,
	},
	rutPoseedor: {
		type: String,
		required: true,
	},
	rutProveedor: {
		type: String,
	},
	fechaCompra: {
		type: Date,
	},
	fechaEvento: {
		type: Date,
	},
	nroFactura: {
		type: String,
	},
	estado: {
		type: String,
	},
	nroGuia: {
		type: Number,
	},
});

InventarioSchema.virtual("producto", {
	ref: Producto,
	localField: "productPN",
	foreignField: "partnumber",
	justOne: true,
});
InventarioSchema.virtual("poseedor", {
	ref: Empresa,
	localField: "rutPoseedor",
	foreignField: "rut",
	justOne: true,
});
InventarioSchema.virtual("proveedor", {
	ref: Empresa,
	localField: "rutProveedor",
	foreignField: "rut",
	justOne: true,
});

InventarioSchema.set("toJSON", { virtuals: true });
InventarioSchema.set("toObject", { virtuals: true });

export default model("Inventario", InventarioSchema);
