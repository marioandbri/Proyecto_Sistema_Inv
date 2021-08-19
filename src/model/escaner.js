import { Schema, model } from 'mongoose';

export const ScannerSchema = new Schema({
   velocidad: {
      type: String
   }
})

export default model('Scanners', ScannerSchema)