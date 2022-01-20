import { model, Schema } from "mongoose";
import utf8 from "utf8";

export const EmpresaSchema = new Schema({
	rut: {
		type: String,
		index: true,
		unique: true,
	},
	razon_social: {
		type: String,
		required: true,
	},
	ubicacion: {
		type: String,
	},
	telefono_contacto: {
		type: Number,
	},
	cargo: {
		type: String,
	},
});

EmpresaSchema.set("toJSON", { getters: true });
EmpresaSchema.set("toObject", { getters: true });

export default model("Empresa", EmpresaSchema);
