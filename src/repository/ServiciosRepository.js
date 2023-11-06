const {Response} = require("../utils/Response"); 
const ServiciosModels = require("../models/ServiciosModels");

module.exports.CreateServicios = async (user) =>{
    return new Promise((resolve, reject) => {
        user
        .save()
        .then((resp)=>{
            Response.status = 201;
            Response.message = "Se ha creado el Usuario Correctamente";
            Response.result = resp;
            resolve(Response);
        })
        .catch((err) =>{
            console.log("error:", err)
            Response.status = 500;
            Response.message = "Ocurrio un error en el servidor";
            Response.result = err;
            reject(Response);
        })
    });
}

module.exports.FindAllServicios = async (sort) =>{
    return new Promise((resolve, reject) => {
        ServiciosModels
        .find()
        .sort(sort)
        .then((resp)=>{
            Response.status = 200;
            Response.message = "Registros Encontrados";
            Response.result = resp;
            resolve(Response);
        })
        .catch((err) =>{
            console.log("error:", err)
            Response.status = 500;
            Response.message = "Ocurrio un error en el servidor";
            Response.result = err;
            reject(Response);
        })
    });
}

module.exports.FindOneServicios = async (id) =>{
    return new Promise((resolve, reject) => {
        ServiciosModels
        .findById({_id: id})
        .then((resp)=>{
            Response.status = 200;
            Response.message = "Registros Encontrados";
            Response.result = resp;
            resolve(Response);
        })
        .catch((err) =>{
            console.log("error:", err)
            Response.status = 500;
            Response.message = "Ocurrio un error en el servidor";
            Response.result = err;
            reject(Response);
        })
    });
}

module.exports.FindOneUsername = async (usuario) =>{
    return new Promise((resolve, reject) => {
        ServiciosModels
        .findOne({usuario: usuario})
        .then((resp)=>{
            Response.status = 200;
            Response.message = "Registros Encontrados";
            Response.result = resp;
            resolve(Response);
        })
        .catch((err) =>{
            console.log("error:", err)
            Response.status = 500;
            Response.message = "Ocurrio un error en el servidor";
            Response.result = err;
            reject(Response);
        })
    });
}

module.exports.deleteServicios = async (id) =>{
    return new Promise((resolve, reject) => {
        ServiciosModels
        .findByIdAndDelete(id)
        .then((resp)=>{
            Response.status = 200;
            Response.message = "Registro Eliminado correctamente";
            Response.result = resp;
            resolve(Response);
        })
        .catch((err) =>{
            console.log("error:", err)
            Response.status = 500;
            Response.message = "Ocurrio un error en el servidor";
            Response.result = err;
            reject(Response);
        })
    });
}


module.exports.updateServicios = async (id, user) =>{
    return new Promise((resolve, reject) => {
        ServiciosModels
        .findOneAndUpdate({_id : id}, {nombres: user.nombres, apellidos: user.apellidos})
        .then((resp)=>{
            Response.status = 200;
            Response.message = "Registro Actualizado correctamente";
            Response.result = resp;
            resolve(Response);
        })
        .catch((err) =>{
            console.log("error:", err)
            Response.status = 500;
            Response.message = "Ocurrio un error en el servidor";
            Response.result = err;
            reject(Response);
        })
    });
}