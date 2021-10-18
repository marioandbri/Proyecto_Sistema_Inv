import { Schema, model } from "mongoose";

const ProductosSchema = new Schema({
  tipoProducto: {
    type: String,
    required: true,
  },
  partnumber: { type: String, unique: true, required: true },
  detalle: { _id: false, type: {} },
});

ProductosSchema.methods.headersOf = function () {
  let headers = ["PartNumber"];

  // for (let i in this.detalle) {
  //    headers.push(Object.keys(this.detalle[i]).toString())
  // }
  Object.keys(this.detalle).map((e) => headers.push(e));

  return headers;
};
ProductosSchema.methods.descriptionOf = function () {
  let description = `${this.tipoProducto}`;

  // for (let i in this.detalle) {
  //    headers.push(Object.keys(this.detalle[i]).toString())
  // }
  Object.values(this.detalle).map(
    (e) => (description = description.concat(", ", e))
  );

  return description;
};
// GenericoSchema.virtual('headersOf').get(() => {
//    let headers = []
//    for (let i in this.detalle) {
//       headers.push(Object.keys(this.detalle[i]).toString())
//    }
//    return headers
// })
export default model("Productos", ProductosSchema);
