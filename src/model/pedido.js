const { Schema, model } = require('mongoose');


const PedidoSchema = new Schema({
   tipoEquipo: {
      type: String
   },
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
   consumibles:{
      type: String
   },
   detalle: {
      type: String
   }
});

module.exports = model('Pedido', PedidoSchema);
module.exports = PedidoSchema;