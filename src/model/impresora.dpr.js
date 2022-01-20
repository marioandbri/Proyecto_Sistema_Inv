import { Schema, model } from 'mongoose';

export const ImpresoraSchema = new Schema({
   tipoImpresora: {
      type: [String]
   },
   partNumber: {
      type: String,
      required: true,
      unique: true
   },
   marca: {
      type: String
   },
   modelo: {
      type: String
   },
   modoImpresion: {
      type: String
   },
   conexiones: {
      type: [String]
   },
   detImpresora: {
      type: {
         ppmImpresion: Number,
         cuotaMensual: Number,
         maxPapelTam: String,
         ppmScanner: Number
      }
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




ImpresoraSchema.methods.descriptionOf = function () {
   return `Impresora ${this.tipoImpresora.map(e => e).join(' ')} ${this.modoImpresion}, Conectividad: ${this.conexiones.map(e => `${e} `)}`
}
ImpresoraSchema.methods.headersOf = function () {
   return ['Tipo de Impresora', 'Numero de Parte', 'Marca', 'Modelo', 'Modo de Impresion', 'Conexiones']
}
export default model('Impresoras', ImpresoraSchema);
// module.exports = ImpresoraSchema;