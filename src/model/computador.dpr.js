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
      type: String,
      required: true
   },
   modelo: {
      type: String,
      required: true
   },
   factorForma: {
      type: String
   },
   tamañoPantalla: {
      type: Number
   },
   transformador: {
      type: String
   },
   procesador: {
      type: {
         marca: String,
         tier: String,
         modelo: String,
         nucleos: Number,
         hilos: Number,
         minFreq: Number,
         turboFreq: Number

      }
   },

   almacenamiento: {

      type: [{
         tipoAlmacenamiento: {
            type: String
         },
         capacidadGB: {
            type: Number
         }
      }]
   },
   tipoRam: {
      type: String
   },
   socketsMemoria: {
      type: [
         {
            dimm: {
               type: Number

            },
            isInstalled: {
               type: Boolean
            },
            capacidadGB: {
               type: Number
            },
            memPartnumber: {
               type: String
            }
         }
      ]
   },
   tags: {
      type: [String]
   },
   // description: {
   //    type: String,
   //    get: () => `${this.marca} ${this.modelo} ${this.procesador.marca} ${this.procesador.tier}-${this.procesador.modelo} hasta ${this.procesador.turboFreq}Ghz, ${this.tipoRam} desde ${this.socketsMemoria[0].capacidadGB}GB, ${this.almacenamiento.map(e => e.tipoAlmacenamiento + ' ' + e.capacidadGB)}GB`
   // }

})

// ComputadorSchema.statics.descriptionOf = function () {
//    return `${this.marca} ${this.modelo} ${this.procesador.marca} ${this.procesador.tier}-${this.procesador.modelo} hasta ${this.procesador.turboFreq}Ghz, ${this.tipoRam} desde ${this.socketsMemoria[0].capacidadGB}GB, ${this.almacenamiento.map(e => e.tipoAlmacenamiento + ' ' + e.capacidadGB)}GB`
// }
ComputadorSchema.methods.descriptionOf = function () {
   return `${this.marca} ${this.modelo} ${this.procesador.marca} ${this.procesador.tier}-${this.procesador.modelo} hasta ${this.procesador.turboFreq}Ghz, ${this.tipoRam} desde ${this.socketsMemoria[0].capacidadGB}GB, ${this.almacenamiento.map(e => e.tipoAlmacenamiento + ' ' + e.capacidadGB)}GB`
}
ComputadorSchema.methods.headersOf = function () {
   return ['Tipo Computador', 'Numero de Parte', 'Marca', 'Modelo', 'Procesador', 'Almacenamiento', 'Memoria RAM']
}

export default model('Computadores', ComputadorSchema);
// module.exports = EquipoSchema;