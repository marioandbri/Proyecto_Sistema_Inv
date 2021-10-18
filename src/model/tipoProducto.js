import { Schema, model } from "mongoose";

export const TipoProductoSchema = new Schema({
  option: {
    type: String,
    unique: true,
    required: true,
  },
  form: {
    type: [
      {
        titulo: String,
        tipo: String,
        _id: false,
      },
    ],
  },
});

export default model("TipoProducto", TipoProductoSchema);
