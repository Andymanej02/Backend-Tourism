const UserModel = require('../models/RegisterModels');

async function createUser(user) {
    try {
        const existingUser = await UserModel.findOne({
            $or: [{ email: user.email }, { username: user.username }],
        });

        if (existingUser) {
            console.log('Usuario ya existe:', existingUser);
            return null;
        }

        const newUser = await UserModel.create(user);
        console.log('Usuario creado:', newUser);
        return newUser;
    } catch (error) {
        console.error('Error al crear usuario:', error);
        return null;
    }
}

async function findUserByEmail(email) {
    return UserModel.findOne({ email });
}

async function findUserByUsername(username) {
    return UserModel.findOne({ username });
}

module.exports = {
    createUser,
    findUserByEmail,
    findUserByUsername,
};
