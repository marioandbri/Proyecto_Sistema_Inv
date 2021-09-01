import { Schema, model } from 'mongoose';

export const ScannerSchema = new Schema({
   velocidad: Number,
   modoEscaneo: {
      type: [String]
   },
   conexiones: {
      type: [String]
   }

})

export default model('Scanners', ScannerSchema)