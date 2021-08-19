const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const EquipoSchema = require('./equipo');
const ImpresoraSchema = require('./impresora');

const OTSchema = new Schema({

   cliente: {
      type: String
      // TODO completar 
   },
   pedido: [
      {
         partnumber: {
            type: String
         },
         cantidad: {
            type: Number,
            default: 1
         },
         mem_total: {
            type: String
         },
         capacidad_alm: {
            type: String
         },
         consumibles: {
            type: String
         }
      }
   ],
   fechaEntrega: {
      type: Date
   },
   fechaCreacion: {
      type: Date,
      default: Date.now
   },
   tecnico: {
      type: String
   }
})


module.exports = model('OT', OTSchema);