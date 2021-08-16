import { Schema, model } from 'mongoose';

export const ImpresoraSchema = new Schema({
   modelo: {
      type: String
   },
   consumibles: [
      {
         tipoConsumible: {
            type: String
         },
         numeroParte: {
            type: String
         }
      }
   ]
})

export default model('Impresora', ImpresoraSchema);
// module.exports = ImpresoraSchema;