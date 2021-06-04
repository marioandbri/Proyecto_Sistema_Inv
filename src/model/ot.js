const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const OT_Schema = new Schema({

   cliente: {
      type: String
      // TODO completar 
   },
   ubicacion: {
      type: String
   },
   pedido: [
      {
      partnumber: {
         type: String
      },
      cantidad: {
         type: Number
      },
      mem_total: {
         type: String
      },
      capacidad_alm: {
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


module.exports = model('OT', OT_Schema);