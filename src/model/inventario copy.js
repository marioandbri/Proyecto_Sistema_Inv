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
		get: function (v) {
			return `${v.getUTCFullYear()}-${v.getMonth() + 1}-${v.getUTCDate()}`;
		},
	},
	fechaEvento: {
		type: Date,
		get: function (v) {
			return `${v.getUTCFullYear()}-${v.getMonth() + 1}-${v.getUTCDate()}`;
		},
	},
	nroFactura: {
		type: String,
	},
	estado: {
		type: String,
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

InventarioSchema.set("toJSON", { virtuals: true, getters: true });
InventarioSchema.set("toObject", { virtuals: true, getters: true });

export default model("Inventario", InventarioSchema);
