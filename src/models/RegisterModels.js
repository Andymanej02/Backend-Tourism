const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    password: String, // Se recomienda almacenar contraseñas cifradas
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
