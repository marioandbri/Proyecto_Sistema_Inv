import { Schema, model } from 'mongoose'

export const NotebookSchema = new Schema({
   modelo: {
      type: String
   },
   tamañoPantalla: {
      type: String
   },
   tipoTransformador: {
      type: String
   }
})

export default model('Notebook', NotebookSchema)