const { FindAllLogin, FindOneLogin, CreateLogin, deleteLogin, updateLogin } = require("../repository/LoginRepository");

const getAllLogins = async (req, res) => {
  const result = await FindAllLogin();
  res.status(result.status).json(result);
};

const getLoginById = async (req, res) => {
  const loginId = req.params.id;
  const result = await FindOneLogin(loginId);
  res.status(result.status).json(result);
};

const createLogin = async (req, res) => {
  const login = req.body;
  const result = await CreateLogin(login);
  res.status(result.status).json(result);
};

const deleteLogin = async (req, res) => {
  const loginId = req.params.id;
  const result = await deleteLogin(loginId);
  res.status(result.status).json(result);
};

const updateLogin = async (req, res) => {
  const loginId = req.params.id;
  const updatedLogin = req.body;
  const result = await updateLogin(loginId, updatedLogin);
  res.status(result.status).json(result);
};

module.exports = { getAllLogins, getLoginById, createLogin, deleteLogin, updateLogin };
