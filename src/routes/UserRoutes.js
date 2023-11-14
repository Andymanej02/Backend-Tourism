const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Importar controlador, modelo y repositorio de Login
const LoginController = require("./src/controllers/LoginController");
const LoginModel = require("./src/models/LoginModel");
const LoginRepository = require("./src/repositories/LoginRepository");

// Importar controlador, modelo y repositorio de Usuarios
const UsuarioController = require("./src/controllers/UsuariosController");
const UsuarioModel = require("./src/models/UsuariosModels");
const UsuarioRepository = require("./src/repository/UserRepository");

const app = express();

// Datos codificados en URL
app.use(bodyParser.urlencoded({ extended: true }));

// Analiza objeto JSON
app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
  }),
);

app.get('/status', (req, res) => {
    res.status(200).send({
      success: 'true',
      message: 'Servidor Corriendo'
    })
});

// Conexion a la base de datos
const MONGODB_URI = `mongodb://${process.env.BD_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.MONGO_DB}?retryWrites=true&authSource=admin`;

mongoose
  .connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Base de Datos Connected");
  })
  .catch((err) => {
    console.log(err);
    throw err;
  });

// Prefijo para las rutas de usuarios
const userApiPrefix = '/api/usuarios';
const loginApiPrefix = '/api/login';

// Rutas CRUD de Usuarios
app.get(`${userApiPrefix}`, UsuarioController.getAllUsers);
app.get(`${userApiPrefix}/:id`, UsuarioController.getUserById);
app.post(`${userApiPrefix}`, UsuarioController.createUser);
app.delete(`${userApiPrefix}/:id`, UsuarioController.deleteUser);
app.put(`${userApiPrefix}/:id`, UsuarioController.updateUser);

// Rutas CRUD de Login
app.get(`${loginApiPrefix}`, LoginController.getAllLogins);
app.get(`${loginApiPrefix}/:id`, LoginController.getLoginById);
app.post(`${loginApiPrefix}`, LoginController.createLogin);
app.delete(`${loginApiPrefix}/:id`, LoginController.deleteLogin);
app.put(`${loginApiPrefix}/:id`, LoginController.updateLogin);

// Rutas existentes
app.post(`${userApiPrefix}/login`, UsuarioController.login);
app.post(`${userApiPrefix}/create`, UsuarioController.create);
app.get(`${userApiPrefix}/listar`, UsuarioController.findAll);
app.get(`${userApiPrefix}/findbyid/:id`, UsuarioController.findById);
app.get(`${userApiPrefix}/findusername/:username`, UsuarioController.findOneUsuario);
app.delete(`${userApiPrefix}/delete/:id`, UsuarioController.deleteUserData);
app.put(`${userApiPrefix}/update/:id`, UsuarioController.updateUserData);

app.post(`${loginApiPrefix}/login`, LoginController.login);
app.post(`${loginApiPrefix}/create`, LoginController.create);
app.get(`${loginApiPrefix}/listar`, LoginController.findAll);
app.get(`${loginApiPrefix}/findbyid/:id`, LoginController.findById);
app.get(`${loginApiPrefix}/findusername/:username`, LoginController.findOneUsuario);
app.delete(`${loginApiPrefix}/delete/:id`, LoginController.deleteUserData);
app.put(`${loginApiPrefix}/update/:id`, LoginController.updateUserData);

// Exportar
module.exports = app;
