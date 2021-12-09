import { Schema, model } from "mongoose";

const UsuariosSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  hash: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  accessEmpresas: {
    type: Boolean,
    default: false
  },
  accessProductos: {
    type: Boolean,
    default: false
  },
  accessInventarios: {
    type: Boolean,
    default: false
  }

})

export default model('Usuarios', UsuariosSchema) 