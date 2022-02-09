import { Schema, model, SchemaTypes } from "mongoose";
import { flattenData } from "../helpers/flattenData";

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

		set: function (v) {
			if (v) {
				const fields = v.match(/detalle\.[\wñÑ\s]+|\w+\.\w+|[A-z\s]+/g); //input:{marca},{modelo} => output:[marca, {modelo}]
				let description = "";
				const docKeys = Object.keys(flattenData(this.toObject()));
				console.log(docKeys);
				console.log(fields);
				for (let field of fields) {
					if (docKeys.includes(field)) {
						description += flattenData(this.toObject())[field] + " ";
					} else {
						description += field + " ";
					} // [tipoProducto, marca, ...]
				}
				// let description = `${this.marca} ${this.modelo} ${v}`;
				return description.trim();
			}
			return v;
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
	shortDescriptionTags: {
		type: String,
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
