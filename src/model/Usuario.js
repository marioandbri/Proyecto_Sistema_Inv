import { Schema, model } from "mongoose";

const UsuariosSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	hash: {
		type: String,
		required: true,
	},
	salt: {
		type: String,
		required: true,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
	accessEmpresas: {
		type: [Boolean],
		default: [false, false, false, false],
	},
	accessProductos: {
		type: [Boolean],
		default: [false, false, false, false],
	},
	accessInventarios: {
		type: [Boolean],
		default: [false, false, false, false],
	},
});

export default model("Usuarios", UsuariosSchema);
