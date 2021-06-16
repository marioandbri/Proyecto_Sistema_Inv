const { Schema, model } = require('mongoose');

const ImpresoraSchema = new Schema ({
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
   consumibles:[
      {
         tipoConsumible:{
            type: String
         },
         descripcion:{
            type: String
         }
      }
   ] 
})

module.exports = model('Impresoras', ImpresoraSchema);
module.exports = ImpresoraSchema;