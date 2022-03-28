import { Schema, model } from "mongoose";
import Usuarios from "./Usuario";
import Producto from "./productos";

const MovimientoSchema = new Schema({
	rut: {
		type: String,
		// TODO completar
	},
	tipo: {
		type: String,
		enum: ["ENTREGA", "RETIRO", "CAMBIO"],
	},
	guia: {
		type: String,
		unique: true,
	},
	estado: {
		type: String,
		enum: ["Pendiente", "En Preparacion", "En Procesamiento", "Finalizado"],
	},
	pedido: {
		type: [
			{
				numeroSerie: {
					type: String,
					index: true,
				},
				partnumber: {
					type: String,
					index: true,
				},
				orientacion: {
					type: String,
					enum: ["entrega", "retiro"],
				},
				modificaciones: {},
			},
		],
	},
	fechaMovimiento: {
		type: Date,
	},
	actualizaciones: {
		type: String,
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

MovimientoSchema.virtual("pedido.detalle", {
	ref: "Inventario",
	localField: "pedido.numeroSerie",
	foreignField: "numeroSerie",
	justOne: true,
});
MovimientoSchema.virtual("cliente", {
	ref: "Empresa",
	localField: "rut",
	foreignField: "rut",
	justOne: true,
});

MovimientoSchema.virtual("pedido.equipo", {
	ref: "Producto",
	localField: "pedido.partnumber",
	foreignField: "partnumber",
	justOne: true,
});

MovimientoSchema.set("toJSON", { virtuals: true });
MovimientoSchema.set("toObject", { virtuals: true });

module.exports = model("Movimiento", MovimientoSchema);
