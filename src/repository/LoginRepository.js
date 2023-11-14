const LoginModel = require("../models/LoginModel");

const FindAllLogin = async () => {
  try {
    const logins = await LoginModel.find();
    return { status: 200, message: "Registros Encontrados", result: logins };
  } catch (error) {
    return { status: 500, message: "Ocurrió un error en el servidor", error };
  }
};

const FindOneLogin = async (loginId) => {
  try {
    const login = await LoginModel.findOne({ _id: loginId });
    if (!login) {
      return { status: 404, message: "Login no encontrado" };
    }
    return { status: 200, message: "Registro Encontrado correctamente", result: login };
  } catch (error) {
    return { status: 500, message: "Ocurrió un error en el servidor", error };
  }
};

const CreateLogin = async (login) => {
  try {
    const newLogin = new LoginModel(login);
    await newLogin.save();
    return { status: 201, message: "Se ha creado el Login Correctamente" };
  } catch (error) {
    return { status: 500, message: "Ocurrió un error en el servidor", error };
  }
};

const deleteLogin = async (loginId) => {
  try {
    const login = await LoginModel.findByIdAndDelete(loginId);
    if (!login) {
      return { status: 404, message: "Login no encontrado" };
    }
    return { status: 200, message: "Registro Eliminado correctamente", result: login };
  } catch (error) {
    return { status: 500, message: "Ocurrió un error en el servidor", error };
  }
};

const updateLogin = async (loginId, updatedLogin) => {
  try {
    const login = await LoginModel.findOneAndUpdate({ _id: loginId }, updatedLogin, { new: true });
    if (!login) {
      return { status: 404, message: "Login no encontrado" };
    }
    return { status: 200, message: "Registro Actualizado correctamente", result: login };
  } catch (error) {
    return { status: 500, message: "Ocurrió un error en el servidor", error };
  }
};

module.exports = { FindAllLogin, FindOneLogin, CreateLogin, deleteLogin, updateLogin };
