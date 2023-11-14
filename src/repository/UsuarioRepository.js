// UsuarioRepository.js
const UsuarioModel = require('../models/UsuarioModel');

async function findAllUsers() {
  try {
    const users = await UsuarioModel.find();
    return { status: 200, message: 'Registros Encontrados', result: users };
  } catch (error) {
    return { status: 500, message: 'Error en el servidor', result: error };
  }
}

async function findOneUser(userId) {
  try {
    const user = await UsuarioModel.findById(userId);
    return { status: 200, message: 'Registro Encontrado', result: user };
  } catch (error) {
    return { status: 500, message: 'Error en el servidor', result: error };
  }
}

async function createUser(userData) {
  try {
    const newUser = await UsuarioModel.create(userData);
    return { status: 201, message: 'Usuario creado correctamente', result: newUser };
  } catch (error) {
    return { status: 500, message: 'Error en el servidor', result: error };
  }
}

async function deleteUser(userId) {
  try {
    const deletedUser = await UsuarioModel.findByIdAndDelete(userId);
    return { status: 200, message: 'Usuario eliminado correctamente', result: deletedUser };
  } catch (error) {
    return { status: 500, message: 'Error en el servidor', result: error };
  }
}

async function updateUser(userId, userData) {
  try {
    const updatedUser = await UsuarioModel.findByIdAndUpdate(userId, userData, { new: true });
    return { status: 200, message: 'Usuario actualizado correctamente', result: updatedUser };
  } catch (error) {
    return { status: 500, message: 'Error en el servidor', result: error };
  }
}

module.exports = {
  findAllUsers,
  findOneUser,
  createUser,
  deleteUser,
  updateUser,
};
