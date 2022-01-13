import { model, Schema } from "mongoose";

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

export default model("Empresa", EmpresaSchema);
