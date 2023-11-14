// UsuarioController.js
const UsuarioRepository = require('../repositories/UsuarioRepository');

async function getAllUsers(req, res) {
  const result = await UsuarioRepository.findAllUsers();
  res.status(result.status).json(result);
}

async function getUserById(req, res) {
  const userId = req.params.id;
  const result = await UsuarioRepository.findOneUser(userId);
  res.status(result.status).json(result);
}

async function createUser(req, res) {
  const userData = req.body;
  const result = await UsuarioRepository.createUser(userData);
  res.status(result.status).json(result);
}

async function deleteUser(req, res) {
  const userId = req.params.id;
  const result = await UsuarioRepository.deleteUser(userId);
  res.status(result.status).json(result);
}

async function updateUser(req, res) {
  const userId = req.params.id;
  const userData = req.body;
  const result = await UsuarioRepository.updateUser(userId, userData);
  res.status(result.status).json(result);
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
