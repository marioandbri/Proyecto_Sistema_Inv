import { Schema, model } from 'mongoose';
import { EquipoSchema } from './equipo';
import { ImpresoraSchema } from './impresora'


export const ProductoSchema = new Schema({
   partNumber: {
      type: String,
      unique: true,
      required: true
   },
   marca: {
      type: String
   },
   tipoProducto: {
      type: String,
      required: true
   },
   impresora: ImpresoraSchema,
   equipo: EquipoSchema
});

export default model('Producto', ProductoSchema);