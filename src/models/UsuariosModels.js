// UsuarioModel.js
const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombres: String,
  apellidos: String,
  telefono: String,
  email: String,
  edad: String,
  usuario: String,
});

const UsuarioModel = mongoose.model('Usuario', usuarioSchema);

module.exports = UsuarioModel;
