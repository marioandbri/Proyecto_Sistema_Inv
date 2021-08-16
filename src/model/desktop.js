import { Schema, model } from 'mongoose'

export const DesktopSchema = new Schema({
   modelo: {
      type: String
   },
   factorForma: {
      type: String
   }
})

export default model('Desktop', DesktopSchema)