const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

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

// Rutas CRUD de Usuarios
app.get(`${userApiPrefix}`, UsuarioController.getAllUsers);
app.get(`${userApiPrefix}/:id`, UsuarioController.getUserById);
app.post(`${userApiPrefix}`, UsuarioController.createUser);
app.delete(`${userApiPrefix}/:id`, UsuarioController.deleteUser);
app.put(`${userApiPrefix}/:id`, UsuarioController.updateUser);

// Rutas existentes
app.post(`${userApiPrefix}/login`, UsersController.login);
app.post(`${userApiPrefix}/create`, UsersController.create);
app.get(`${userApiPrefix}/listar`, UsersController.findAll);
app.get(`${userApiPrefix}/findbyid/:id`, UsersController.findById);
app.get(`${userApiPrefix}/findusername/:username`, UsersController.findOneUsuario);
app.delete(`${userApiPrefix}/delete/:id`, UsersController.deleteUserData);
app.put(`${userApiPrefix}/update/:id`, UsersController.updateUserData);

// Exportar
module.exports = app;
