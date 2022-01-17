import { Schema, model, SchemaTypes } from "mongoose";

const ProductosSchema = new Schema({
	tipoProducto: {
		type: String,
		required: true,
	},
	partnumber: {
		type: String,
		set: (v) => v.toUpperCase(),
		index: true,
		unique: true,
		required: true,
	},
	marca: { type: String, set: (v) => v.toUpperCase() },
	modelo: { type: String, set: (v) => v.toUpperCase() },
	familia: {
		type: String,
		set: (v) => v.toUpperCase(),
	},
	detalle: { _id: false, type: {} },
	shortDescription: {
		type: String,
		get: function (v) {
			let description = `${this.marca} ${this.modelo} ${v}`;
			return description.trim();
		},
	},
	extraDescription: {
		type: String,

		get: function (v) {
			let description = `${this.tipoProducto} ${this.marca} ${this.modelo}. `;
			for (let key in this.detalle) {
				description += `${key}: ${this.detalle[key]}, `;
			}
			description += v;
			return `${description}`;
		},
	},
});

// ProductosSchema.virtual("DescriptionS").get(function () {
// 	let description = `${this.tipoProducto}`;

// 	for (let [key, value] of Object.entries(this?.detalle)) {
// 		description += `, ${key}: ${value}`;
// 	}
// 	description += this.shortDescription ? `, ${this.shortDescription}` : ".";

// 	return description;
// });
// ProductosSchema.virtual("DescriptionL").get(function () {
// 	let description = `${this.tipoProducto}: ${this.familia} ${this.marca} ${this.modelo}`;

// 	for (let [key, value] of Object.entries(this.detalle)) {
// 		description += `, ${key}: ${value}`;
// 	}
// 	description += this.extraDescription ? `, ${this.extraDescription}` : ".";

// 	return description;
// });

ProductosSchema.methods.headersOf = function () {
	let headers = ["PartNumber", "Familia", "Marca", "Modelo"];
	// }
	Object.keys(this.detalle).map((e) => headers.push(e));

	return headers;
};

ProductosSchema.set("toJSON", { getters: true });
ProductosSchema.set("toObject", { getters: true });

export default model("Producto", ProductosSchema);
