const mongoose = require('mongoose');
const PedidoSchema = require('./pedido');
const {Schema, model} = mongoose;
const objPedido = require('./pedido');
// const EquipoSchema = require('./equipo');
// const ImpresoraSchema = require('./impresora');

const OTSchema = new Schema({

   cliente: {
      type: String
      // TODO completar 
   },
   ubicacion: {
      type: String
   },
   pedidos: [PedidoSchema],
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