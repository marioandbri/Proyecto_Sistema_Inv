import { Schema, model } from "mongoose";
import Usuarios from "./Usuario";
const ValidaSchema = new Schema({
	cliente: {
		type: String,
		// TODO completar
	},
	pedido: [
		{
			numeroSerie: String,
			detalle: {},
		},
	],
	fechaMovimiento: {
		type: Date,
	},
	fechaCreacion: {
		type: Date,
		default: Date.now,
	},
	tecnico: {
		type: Schema.Types.ObjectId,
		ref: Usuarios,
	},
});

module.exports = model("Valida", ValidaSchema);
