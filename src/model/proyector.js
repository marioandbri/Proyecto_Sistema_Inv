import { Schema, model } from "mongoose";

export const ProyectorSchema = new Schema({
   maxResolucion: String,
   entradas: String
})

export default model('Proyectores', ProyectorSchema)