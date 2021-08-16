import { Schema, model } from 'mongoose';
import { DesktopSchema } from './desktop';
import { NotebookSchema } from './notebook';

export const EquipoSchema = new Schema({
   tipoEquipo: {
      type: String,
      required: true
   },
   notebook: NotebookSchema,
   desktop: DesktopSchema,
   procesador: {
      type: String
   },
   genProcesador: {
      type: String
   },
   almacenamiento: {
      tipoAlmacenamiento: {
         type: String
      },
      cantidadAlmacenamiento: {
         type: Number
      }
   },
   socketsMemoria: [
      {
         tipoMemoria: {
            type: String
         },
         memPartnumber: {
            type: String
         }
      }
   ]
})

export default model('Equipos', EquipoSchema);
// module.exports = EquipoSchema;