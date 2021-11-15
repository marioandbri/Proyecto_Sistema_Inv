import { Schema, model } from "mongoose";

const ProductosSchema = new Schema({
  tipoProducto: {
    type: String,
    required: true,
  },
  partnumber: { type: String, unique: true, required: true },
  marca: { type: String },
  modelo: { type: String },
  familia: { type: String },
  detalle: { _id: false, type: {} },
  shortDescription: { type: String },
  extraDescription: { type: String },
});

ProductosSchema.virtual("DescriptionS").get(function () {
  let description = `${this.tipoProducto}`;

  for (let [key, value] of Object.entries(this.detalle)) {
    description += `, ${key}: ${value}`;
  }
  description += this.shortDescription ? `, ${this.shortDescription}` : ".";

  return description;
});
ProductosSchema.virtual("DescriptionL").get(function () {
  let description = `${this.tipoProducto}: ${this.familia} ${this.marca} ${this.modelo}`;

  for (let [key, value] of Object.entries(this.detalle)) {
    description += `, ${key}: ${value}`;
  }
  description += this.extraDescription ? `, ${this.extraDescription}` : ".";

  return description;
});

ProductosSchema.methods.headersOf = function () {
  let headers = ["PartNumber", "Familia", "Marca", "Modelo"];

  // for (let i in this.detalle) {
  //    headers.push(Object.keys(this.detalle[i]).toString())
  // }
  Object.keys(this.detalle).map((e) => headers.push(e));

  return headers;
};
// ProductosSchema.methods.descriptionOf = function () {
//   let description = `${this.tipoProducto}`;
//   Object.values(this.detalle).map(
//     (e) => (description = description.concat(", ", e))
//   );

//   return description;
// };
// GenericoSchema.virtual('headersOf').get(() => {
//    let headers = []
//    for (let i in this.detalle) {
//       headers.push(Object.keys(this.detalle[i]).toString())
//    }
//    return headers
// })
ProductosSchema.set("toJSON", { virtuals: true });
ProductosSchema.set("toObject", { virtuals: true });

export default model("Productos", ProductosSchema);
