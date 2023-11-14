//Librerias
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

//Routes
const UsuariosRoutes = require("./src/routes/UserRoutes"); 
const UsuarioModel = require("./src/models/UsuarioModel"); // Importar el modelo
const UsuarioRepository = require("./src/repositories/UsuarioRepository"); // Importar el repositorio
const UsuarioController = require("./src/controllers/UsuarioController"); // Importar el controlador

const app = express();

//Datos codificados en URL
app.use(bodyParser.urlencoded({ extended: true }));

//Analiza objeto JSON
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

//Conexion a la base de datos
let MONGODB_URI = `mongodb://${process.env.BD_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.MONGO_DB}?retryWrites=true&authSource=admin`;

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

// Rutas CRUD de Usuarios
app.get('/api/usuarios', UsuarioController.getAllUsers);
app.get('/api/usuarios/:id', UsuarioController.getUserById);
app.post('/api/usuarios', UsuarioController.createUser);
app.delete('/api/usuarios/:id', UsuarioController.deleteUser);
app.put('/api/usuarios/:id', UsuarioController.updateUser);

// Rutas existentes
app.post("/api/usuarios/login", UsersController.login);
app.post("/api/usuarios/create", UsersController.create);
app.get("/api/usuarios/listar", UsersController.findAll);
app.get("/api/usuarios/findbyid/:id", UsersController.findById);
app.get("/api/usuarios/findusername/:username", UsersController.findOneUsuario);
app.delete("/api/usuarios/delete/:id", UsersController.deleteUserData);
app.put("/api/usuarios/update/:id", UsersController.updateUserData);

// Exportar
module.exports = app;
