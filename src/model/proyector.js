import { Schema, model } from "mongoose";

export const ProyectorSchema = new Schema({
   partnumber: {
      type: String,
      required: true,
      unique: true
   },
   marca: String,
   modelo: String,
   lumens: Number,
   conexiones: {
      type: [String]
   },
   maxResolucionX: Number,
   maxResolucionY: Number,


});

export default model('Proyectores', ProyectorSchema);