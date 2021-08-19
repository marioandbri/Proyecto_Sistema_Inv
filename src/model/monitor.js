import { Schema, model } from 'mongoose';

export const MonitorSchema = new Schema({
   tamañoPantalla: String,
   entradas: String,
   tipoPanel: String

})

export default model('Monitores', MonitorSchema)