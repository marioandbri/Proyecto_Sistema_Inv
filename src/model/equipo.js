const { Schema, model } = require('mongoose');

const EquipoSchema = new Schema ({
   serialnumber: {
      type:String,
      unique: true
   },
   partnumber: {
      type:String
   },
   tipoEquipo: {
      type:String
   },
   descripcion: {
      type:String
   },
   almacenamiento: {
      tipoAlmacenamiento: {
         type: String
      },
      cantidadAlmacenamiento: {
         type: Number
      }
   },
   socketsMemoria: [
      {
         tipoMemoria:{
            type: String
         },
         memPartnumber:{
            type: String
         }
      }
   ] 
})

module.exports = model('Equipos', EquipoSchema);
module.exports = EquipoSchema;