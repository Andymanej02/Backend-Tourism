const ServiciosModels = require("../models/ServiciosModels");
const {CreateUser, FindAllUser, FindOneUser, FindOneUsername, deleteUser, updateUser} = require("../repository/UserRepository");
const bcrypt = require("bcrypt-nodejs");

async function create(req, res){
    const params = req.body;

    const service = new ServiciosModels();

    if(params.nombres == "" || params.nombres == undefined){
        res.status(404).send({message: "El nombre es Requerido"});
        return;
    }
/*
    //Encriptar
    bcrypt.hash(params.password, null, null, async function (err, hash){
        if(hash){
            service.nombres =  params.nombres;
            service.apellidos =  params.apellidos;
            service.telefono = params.telefono;
            service.email = params.email;
            service.edad = params.edad;
            service.usuario = params.usuario;
            service.password = hash;

            const response = await CreateUser(service);
            res.status(response.status).send(response);
        }
    });*/
}

async function findAll(req, res){
    const response = await FindAllUser();
    res.status(response.status).send(response);
}

async function findById(req, res){
    const id = req.params["id"];
    const response = await FindOneUser(id);
    res.status(response.status).send(response);
}

async function findOneUsuario(req, res){
    const username = req.params["username"];
    const response = await FindOneUsername(username);
    res.status(response.status).send(response);
}

async function deleteUserData(req, res){
    const id = req.params["id"];
    const response = await deleteUser(id);
    res.status(response.status).send(response);
}

async function updateUserData(req, res){
    const id = req.params["id"];
    const body = req.body;

    let user = new ServiciosModels();
    user.nombres = body.nombres;
    user.apellidos = body.apellidos;

    const response = await updateUser(id, user);
    res.status(response.status).send(response);
}

async function login(req, res){
    const params = req.body;

    const user = await FindOneUsername(params.usuario);
    if(user){
        //Logueo
        bcrypt.compare(params.password, user.result.password, function (err, check) {
            if(check){
                res.status(200).send({message:"el usuario se encuentra logueado"});
            }else{
                res.status(400).send({message:"Usuario o contraseña Invalida 1"});
            }
        });    
    }else{
        res.status(400).send({message:"Usuario o contraseña Invalida"});
    }
}

module.exports = {
    create,
    findAll,
    findById,
    findOneUsuario,
    deleteUserData, 
    updateUserData,
    login
}


