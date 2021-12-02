import { Schema, Model } from "mongoose";

const UsuariosSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  }
})

export default Model('Usuarios', UsuariosSchema) 