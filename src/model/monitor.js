import { Schema, model } from 'mongoose';

export const MonitorSchema = new Schema({
   partNumber: {
      type: String,
      required: true,
      unique: true
   },
   marca: String,
   modelo: String,
   tipoMonitor: {
      type: [String]
   },
   tamañoPantalla: Number,
   conexiones: {
      type: [String]
   },
   maxResolucionX: Number,
   maxResolucionY: Number,
   tags: {
      type: [String]
   }


})

MonitorSchema.methods.descriptionOf = function () {
   return ` ${this.marca} ${this.modelo} ${this.tamañoPantalla + '"'} ${this.tipoMonitor.map(e => e).join(' ')}. ${this.maxResolucionX}x${this.maxResolucionY}. Conexiones: ${this.conexiones.map(e => e)}.`
}

MonitorSchema.methods.headersOf = () => {
   return ['Tipo Monitor', 'Numero de Parte', 'Marca', 'Modelo', 'Pulgadas']
}

export default model('Monitores', MonitorSchema)