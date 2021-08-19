/**
 * @deprecated
 */
import { Schema, model } from 'mongoose';
import { ComputadorSchema } from "./computador";
import { ImpresoraSchema } from "./impresora";

const EquipoSchema = new Schema({}, { discriminatorKey: 'tipoProducto' })
const Equipo = model('Equipo', EquipoSchema)

export const ProductoSchema = new Schema({
   partNumber: {
      type: String,
      unique: true,
      required: true
   },
   marca: {
      type: String
   },
   detProducto: [EquipoSchema]

});

// ProductoSchema.path('detProducto').discriminator('Computador', ComputadorSchema)
// ProductoSchema.path('detProducto').discriminator('Impresora', ImpresoraSchema)


export default model('Producto', ProductoSchema);