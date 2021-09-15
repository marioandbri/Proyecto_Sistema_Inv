import { Schema, model } from 'mongoose'

const GenericoSchema = new Schema({
   tipoProducto: {
      type: String,
      required: true,
   },
   PartNumber: { type: String, unique: true, required: true },
   body: {
      type: {}
   }
});

GenericoSchema.methods.headersOf = function () {
   let headers = ['PartNumber']

   // for (let i in this.body) {
   //    headers.push(Object.keys(this.body[i]).toString())
   // }
   Object.keys(this.body).map(e => headers.push(e))

   return headers
}
// GenericoSchema.virtual('headersOf').get(() => {
//    let headers = []
//    for (let i in this.body) {
//       headers.push(Object.keys(this.body[i]).toString())
//    }
//    return headers
// })
export default model('Genericos', GenericoSchema);