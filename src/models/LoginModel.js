const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
  nombres: String,
  apellidos: String,
  telefono: String,
  email: String,
  edad: String,
  usuario: String,
});

const LoginModel = mongoose.model("Login", loginSchema);

module.exports = LoginModel;
