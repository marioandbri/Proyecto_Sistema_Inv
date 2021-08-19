import { Schema, model } from 'mongoose';

export const ComputadorSchema = new Schema({
   tipoComputador: {
      type: String
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
   detComputador: {
      type: {
         tamañoPantalla: String,
         tipoTransformador: String,
         factorForma: String
      }
   },
   procesador: {
      type: String
   },
   genProcesador: {
      type: String
   },
   almacenamiento: [{
      tipoAlmacenamiento: {
         type: String
      },
      capacidadGB: {
         type: Number
      }
   }],
   socketsMemoria: [
      {
         dimm: {
            type: String
         },
         tipoMemoria: {
            type: String
         },
         capacidadGB: {
            type: Number
         },
         memPartnumber: {
            type: String
         }
      }
   ]
})

ComputadorSchema.methods.descriptionOf = function () {
   return `${this.modelo} ${this.procesador} ${this.genProcesador} ,${this.socketsMemoria[0].tipoMemoria}, ${this.almacenamiento.map(e => e.tipoAlmacenamiento + ' ' + e.capacidadGB)}GB`
}
ComputadorSchema.methods.headersOf = function () {
   return ['Tipo Computador', 'Numero de Parte', 'Marca', 'Modelo', 'Procesador', 'Almacenamiento', 'Memoria RAM']
}

export default model('Computadores', ComputadorSchema);
// module.exports = EquipoSchema;